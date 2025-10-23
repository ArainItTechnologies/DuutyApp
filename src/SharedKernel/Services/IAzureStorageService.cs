using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SharedKernel.Services;

public interface IAzureStorageService
{
    /// <summary>
    /// Uploads a file to Azure Storage in a user-specific folder
    /// </summary>
    /// <param name="userId">User identifier for folder structure</param>
    /// <param name="fileName">Name of the file to upload</param>
    /// <param name="fileStream">File content as stream</param>
    /// <param name="contentType">MIME type of the file (optional)</param>
    /// <returns>URI of the uploaded file</returns>
    Task<Uri> UploadFileAsync(string userId, string fileName, Stream fileStream, string? contentType = null);

    /// <summary>
    /// Uploads a file from byte array to Azure Storage in a user-specific folder
    /// </summary>
    /// <param name="userId">User identifier for folder structure</param>
    /// <param name="fileName">Name of the file to upload</param>
    /// <param name="fileBytes">File content as byte array</param>
    /// <param name="contentType">MIME type of the file (optional)</param>
    /// <returns>URI of the uploaded file</returns>
    Task<Uri> UploadFileAsync(string userId, string fileName, byte[] fileBytes, string? contentType = null);

    /// <summary>
    /// Downloads a file from Azure Storage
    /// </summary>
    /// <param name="userId">User identifier for folder structure</param>
    /// <param name="fileName">Name of the file to download</param>
    /// <returns>File content as stream</returns>
    Task<Stream> DownloadFileAsync(string userId, string fileName);

    /// <summary>
    /// Deletes a file from Azure Storage
    /// </summary>
    /// <param name="userId">User identifier for folder structure</param>
    /// <param name="fileName">Name of the file to delete</param>
    /// <returns>True if file was deleted, false if file didn't exist</returns>
    Task<bool> DeleteFileAsync(string userId, string fileName);

    /// <summary>
    /// Lists all files in a user's folder
    /// </summary>
    /// <param name="userId">User identifier for folder structure</param>
    /// <returns>List of file names in the user's folder</returns>
    Task<IEnumerable<string>> ListFilesAsync(string userId);

    /// <summary>
    /// Checks if a file exists in Azure Storage
    /// </summary>
    /// <param name="userId">User identifier for folder structure</param>
    /// <param name="fileName">Name of the file to check</param>
    /// <returns>True if file exists, false otherwise</returns>
    Task<bool> FileExistsAsync(string userId, string fileName);

    /// <summary>
    /// Gets the download URL for a file
    /// </summary>
    /// <param name="userId">User identifier for folder structure</param>
    /// <param name="fileName">Name of the file</param>
    /// <param name="expiryMinutes">URL expiry time in minutes (default: 60)</param>
    /// <returns>Signed URL for downloading the file</returns>
    Task<Uri> GetFileUrlAsync(string userId, string fileName, int expiryMinutes = 60);
}