namespace SharedKernel.Configs;

public class SmtpConfig
{
    public required string SmtpServer { get; set; }
    public required int SmtpPort { get; set; }
    public required string SenderEmail { get; set; }
    public required string SenderName { get; set; }
    public required string Username { get; set; }
    public required string Password { get; set; }
    public required bool UseSSL { get; set; }
    public required bool UseStartTls { get; set; }
}
