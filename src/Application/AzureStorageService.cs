using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Azure.Storage.Sas;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using SharedKernel.Services;

namespace Application;


public class AzureStorageService : IAzureStorageService
{
    private readonly BlobServiceClient _blobServiceClient;
    private readonly BlobContainerClient _containerClient;
    private readonly ILogger<AzureStorageService> _logger;
    private readonly string _containerName;

    public AzureStorageService(IConfiguration configuration, ILogger<AzureStorageService> logger)
    {
        _logger = logger;

        var connectionString = configuration.GetConnectionString("AzureStorage");
        _containerName = configuration["AzureStorage:ContainerName"] ?? "user-files";

        if (string.IsNullOrEmpty(connectionString))
        {
            throw new InvalidOperationException("Azure Storage connection string is not configured.");
        }

        _blobServiceClient = new BlobServiceClient(connectionString);
        _containerClient = _blobServiceClient.GetBlobContainerClient(_containerName);
    }

    public async Task<Uri> UploadFileAsync(string userId, string fileName, Stream fileStream, string? contentType = null)
    {
        try
        {
            ValidateInputs(userId, fileName);

            await EnsureContainerExistsAsync();

            var blobName = GetBlobName(userId, fileName);
            var blobClient = _containerClient.GetBlobClient(blobName);

            var blobHttpHeaders = new BlobHttpHeaders();
            if (!string.IsNullOrEmpty(contentType))
            {
                blobHttpHeaders.ContentType = contentType;
            }

            var uploadOptions = new BlobUploadOptions
            {
                HttpHeaders = blobHttpHeaders,
                Metadata = new Dictionary<string, string>
                    {
                        { "userId", userId },
                        { "uploadedAt", DateTime.UtcNow.ToString("O") }
                    }
            };

            await blobClient.UploadAsync(fileStream, uploadOptions);

            _logger.LogInformation("File {FileName} uploaded successfully for user {UserId}", fileName, userId);

            return blobClient.Uri;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error uploading file {FileName} for user {UserId}", fileName, userId);
            throw;
        }
    }

    public async Task<Uri> UploadFileAsync(string userId, string fileName, byte[] fileBytes, string? contentType = null)
    {
        using var stream = new MemoryStream(fileBytes);
        return await UploadFileAsync(userId, fileName, stream, contentType);
    }

    public async Task<Stream> DownloadFileAsync(string userId, string fileName)
    {
        try
        {
            ValidateInputs(userId, fileName);

            var blobName = GetBlobName(userId, fileName);
            var blobClient = _containerClient.GetBlobClient(blobName);

            if (!await blobClient.ExistsAsync())
            {
                throw new FileNotFoundException($"File {fileName} not found for user {userId}");
            }

            var response = await blobClient.DownloadStreamingAsync();

            _logger.LogInformation("File {FileName} downloaded successfully for user {UserId}", fileName, userId);

            return response.Value.Content;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error downloading file {FileName} for user {UserId}", fileName, userId);
            throw;
        }
    }

    public async Task<bool> DeleteFileAsync(string userId, string fileName)
    {
        try
        {
            ValidateInputs(userId, fileName);

            var blobName = GetBlobName(userId, fileName);
            var blobClient = _containerClient.GetBlobClient(blobName);

            var response = await blobClient.DeleteIfExistsAsync();

            if (response.Value)
            {
                _logger.LogInformation("File {FileName} deleted successfully for user {UserId}", fileName, userId);
            }
            else
            {
                _logger.LogWarning("File {FileName} not found for deletion for user {UserId}", fileName, userId);
            }

            return response.Value;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting file {FileName} for user {UserId}", fileName, userId);
            throw;
        }
    }

    public async Task<IEnumerable<string>> ListFilesAsync(string userId)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(userId))
            {
                throw new ArgumentException("UserId cannot be null or empty", nameof(userId));
            }

            var prefix = GetUserPrefix(userId);
            var blobs = new List<string>();

            await foreach (var blobItem in _containerClient.GetBlobsAsync(prefix: prefix))
            {
                // Extract just the filename from the full blob path
                var fileName = blobItem.Name[prefix.Length..];
                blobs.Add(fileName);
            }

            _logger.LogInformation("Listed {Count} files for user {UserId}", blobs.Count, userId);

            return blobs;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error listing files for user {UserId}", userId);
            throw;
        }
    }

    public async Task<bool> FileExistsAsync(string userId, string fileName)
    {
        try
        {
            ValidateInputs(userId, fileName);

            var blobName = GetBlobName(userId, fileName);
            var blobClient = _containerClient.GetBlobClient(blobName);

            var response = await blobClient.ExistsAsync();
            return response.Value;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error checking if file {FileName} exists for user {UserId}", fileName, userId);
            throw;
        }
    }

    public async Task<Uri> GetFileUrlAsync(string userId, string fileName, int expiryMinutes = 60)
    {
        try
        {
            ValidateInputs(userId, fileName);

            var blobName = GetBlobName(userId, fileName);
            var blobClient = _containerClient.GetBlobClient(blobName);

            if (!await blobClient.ExistsAsync())
            {
                throw new FileNotFoundException($"File {fileName} not found for user {userId}");
            }

            // Check if the blob service client can generate SAS tokens
            if (!_blobServiceClient.CanGenerateAccountSasUri)
            {
                throw new InvalidOperationException("BlobServiceClient cannot generate SAS tokens. Ensure you're using account key authentication.");
            }

            var sasBuilder = new BlobSasBuilder
            {
                BlobContainerName = _containerName,
                BlobName = blobName,
                Resource = "b", // blob
                ExpiresOn = DateTimeOffset.UtcNow.AddMinutes(expiryMinutes)
            };

            sasBuilder.SetPermissions(BlobSasPermissions.Read);

            var sasUri = blobClient.GenerateSasUri(sasBuilder);

            _logger.LogInformation("Generated SAS URL for file {FileName} for user {UserId}", fileName, userId);

            return sasUri;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error generating SAS URL for file {FileName} for user {UserId}", fileName, userId);
            throw;
        }
    }

    private async Task EnsureContainerExistsAsync()
    {
        try
        {
            await _containerClient.CreateIfNotExistsAsync(PublicAccessType.None);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error ensuring container {ContainerName} exists", _containerName);
            throw;
        }
    }

    private static string GetBlobName(string userId, string fileName)
    {
        // Sanitize userId and fileName to ensure they're valid for blob storage
        var sanitizedUserId = SanitizeForBlobStorage(userId);
        var sanitizedFileName = SanitizeForBlobStorage(fileName);

        return $"{sanitizedUserId}/{sanitizedFileName}";
    }

    private static string GetUserPrefix(string userId)
    {
        var sanitizedUserId = SanitizeForBlobStorage(userId);
        return $"{sanitizedUserId}/";
    }

    private static string SanitizeForBlobStorage(string input)
    {
        if (string.IsNullOrWhiteSpace(input))
        {
            throw new ArgumentException("Input cannot be null or empty");
        }

        // Replace invalid characters with underscores
        var invalidChars = new char[] { '\\', '/', ':', '*', '?', '"', '<', '>', '|' };
        var sanitized = input;

        foreach (var invalidChar in invalidChars)
        {
            sanitized = sanitized.Replace(invalidChar, '_');
        }

        return sanitized.Trim();
    }

    private static void ValidateInputs(string userId, string fileName)
    {
        if (string.IsNullOrWhiteSpace(userId))
        {
            throw new ArgumentException("UserId cannot be null or empty", nameof(userId));
        }

        if (string.IsNullOrWhiteSpace(fileName))
        {
            throw new ArgumentException("FileName cannot be null or empty", nameof(fileName));
        }
    }
}
