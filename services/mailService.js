const nodemailer = require('nodemailer');

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST, // Replace with your SMTP server
            port: process.env.MAIL_PORT,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.MAIL_USERNAME, // Replace with your SMTP username
                pass: process.env.MAIL_PASSWORD // Replace with your SMTP password
            }
        });
    }

    async sendMail(from, to, subject, html) {
        const mailOptions = {
            from, // Replace with your sender address
            to,
            subject,
            html
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`Email sent to ${to}`);
        } catch (error) {
            console.error(`Error sending email: ${error.message}`);
        }
    }

    async sendOtpToEmail(email, otp) {
        try {
            const subject = "Verify Your Email with One-Time Password (OTP)";

            const html = `<!DOCTYPE html>
            <html lang="en">
            
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>OTP Email</title>
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        line-height: 1.6;
                        color: #333;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
            
                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        padding: 20px;
                        background-color: #fff;
                        border-radius: 5px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
            
                    h1 {
                        color: #333;
                    }
            
                    p {
                        margin-bottom: 20px;
                    }
            
                    .otp-container {
                        padding: 20px;
                        background-color: #e0e0e0;
                        border-radius: 5px;
                    }
            
                    .otp {
                        font-size: 24px;
                        font-weight: bold;
                        color: #333;
                    }
            
                    .disclaimer {
                        margin-top: 20px;
                        font-size: 12px;
                        color: #777;
                    }
            
                    .help-center {
                        margin-top: 20px;
                        font-size: 14px;
                    }
            
                    .signature {
                        margin-top: 20px;
                        font-size: 14px;
                        color: #777;
                    }
                </style>
            </head>
            
            <body>
                <div class="container">
                    <h1>One Time Password (OTP) for Authentication</h1>
                    <p>Dear User,</p>
            
                    <div class="otp-container">
                        <p>Use <span class="otp">${otp}</span> as One Time Password (OTP) for authentication. Do not share this OTP to anyone for security reasons. Valid for 15 minutes.</p>
                    </div>
            
                    <p>For any further assistance, checkout our Help Center</p>
            
                    <div class="disclaimer">
                        <p>* This is an automatically generated email, please do not reply to this email *</p>
                    </div>
            
                   
                    <div class="signature">
                        <p>Warm Regards,<br>   <p>{{$yourName}}<br>{{$yourTitle}}<br>HealthOptions.ai<br>
                    </div>
                </div>
            </body>
            
            </html>
            `;

            const mailOptions = {
                from: process.env.MAIL_FROM, // Replace with your sender address
                to :email ,
                subject,
                html
            };

            const transporter = nodemailer.createTransport({
                host: process.env.MAIL_HOST, // Replace with your SMTP server
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: process.env.MAIL_USERNAME, // Replace with your SMTP username
                    pass: process.env.MAIL_PASSWORD // Replace with your SMTP password
                }
            });

            try {
            const response = await transporter.sendMail(mailOptions);
                     //await this.sendMail(process.env.MAIL_FROM, email, subject, html)
            console.log(response,"response")
            } catch (error) {
                console.log(error,'error')
            }
            
       
        } catch (error) {
            throw new Error(`Error sending otp: ${error.message}`);
        }
    };
}

module.exports = new MailService();
