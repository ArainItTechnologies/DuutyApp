using System.Text;
using System.Text.Json;
using SharedKernel.Services;

namespace Application;

public class MessageService(HttpClient client) : IMessageService
{
    public async Task<bool> SendWhatsAppMessage(string recipientNumber, string authCode)
    {
        try
        {
            string cleanNumber = recipientNumber.Replace("+", "").Replace(" ", "").Replace("-", "");
            var messagePayload = CreateMessagePayload(cleanNumber, authCode);

            var jsonOptions = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                WriteIndented = true
            };

            string jsonPayload = JsonSerializer.Serialize(messagePayload, jsonOptions);

            var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

            var response = await client.PostAsync("/messages", content);
            string responseContent = await response.Content.ReadAsStringAsync();
            if (response.IsSuccessStatusCode)
            {
                var responseObj = JsonSerializer.Deserialize<WhatsAppResponse>(responseContent, jsonOptions);
                if (responseObj?.Messages?.Length > 0)
                {
                    Console.WriteLine($"Message ID: {responseObj.Messages[0].Id}");
                }
                return true;
            }
            else
            {
                Console.WriteLine($"API Error: {response.StatusCode} - {responseContent}");
                return false;
            }
        }
        catch (HttpRequestException ex)
        {
            Console.WriteLine($"HTTP Request Error: {ex.Message}");
            return false;
        }
        catch (JsonException ex)
        {
            Console.WriteLine($"JSON Serialization Error: {ex.Message}");
            return false;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Unexpected Error: {ex.Message}");
            return false;
        }
    }

    private object CreateMessagePayload(string cleanNumber, string authCode)
    {
        return new
        {
            messaging_product = "whatsapp",
            to = cleanNumber,
            type = "template",
            template = new
            {
                name = "auth_otp",
                language = new { code = "en" },
                components = new object[]
                {
                    new
                    {
                        type = "body",
                        parameters = new object[]
                        {
                            new { type = "text", text = authCode }
                        }
                    },
                    new
                    {
                        type = "button",
                        sub_type = "url",
                        index = "0",
                        parameters = new object[]
                        {
                            new { type = "text", text = authCode }
                        }
                    }
                }
            }
        };
    }
}

public record WhatsAppResponse(WhatsAppMessage[] Messages);
public record WhatsAppMessage(string Id);