const crypto = require("crypto");
const nodemailer = require("nodemailer");
export function generateRandomString(length: number) {
  // Generate random bytes
  const randomBytes = crypto.randomBytes(Math.ceil(length / 2));

  // Convert bytes to a hexadecimal string
  const randomString = randomBytes.toString("hex").slice(0, length);

  return randomString;
}

export function mailer(
  name: string,
  email: string,
  password: string
): Promise<any> {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "fitzonegym930@gmail.com",
      pass: "luwu eqbn ysfm uscv",
    },
  });
  const mail_option = {
    to: email,
    subject: "Fit Zone Login Credentials",
    html: genarateHtmlContent(name, email, password),
    priority: "high",
  };
  return new Promise((resolve, reject) => {
    transporter.sendMail(mail_option, (error: Error, info: any) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
}

function genarateHtmlContent(
  name: string,
  email: string,
  password: string
): string {
  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Your New User Account</title>
</head>
<body>
    <h1>Welcome to Our System</h1>
    <p>Dear ${name},</p>

    <p>Your new user account has been created in our system. Below are your login credentials:</p>

    <ul>
        <li><strong>Username:</strong> ${email}</li>
        <li><strong>Password:</strong> ${password}</li>
    </ul>

    <p>Please keep your credentials secure. You can change your password once you log in for the first time.</p>

    <p>Here's the link to access our system: http://localhost:5173</p>

    <p>Thank you for joining us! If you have any questions or need assistance, please feel free to contact our support team.</p>

    <p>Best regards,<br>
    Fit Zone</p>
</body>
</html>`;
}
