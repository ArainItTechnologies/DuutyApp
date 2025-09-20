namespace SharedKernel.Services;

public interface IMessageService
{
    Task<bool> SendWhatsAppMessage(string recipientNumber, string authCode);
}