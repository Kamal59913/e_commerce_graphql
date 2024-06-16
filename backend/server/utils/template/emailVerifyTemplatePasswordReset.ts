export const emailVerifyTemplate = (url: string) => {
  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: 'Inter', sans-serif;
        background-color: #f4f4f7;
        color: #333;
        line-height: 1.6;
        padding: 0 20px;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        background-color: #1c2434;
        color: #ffffff;
        padding: 10px 0;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }
      .header a {
        font-size: 1.5em;
        color: #ffffff;
        text-decoration: none;
        font-weight: 700;
      }
      .content {
        text-align: center;
        padding: 30px 20px;
      }
      .content h2 {
        margin: 20px 0;
        font-size: 2em;
        color: #1c2434;
      }
      .content p {
        margin: 10px 0;
        font-size: 1.1em;
        color: #4d4d4d;
      }
      .content .otp {
        font-size: 2em;
        margin: 20px 0;
        color: #1c2434;
        font-weight: bold;
      }
      .content a {
        display: inline-block;
        text-decoration: none;
        background-color: #1c2434;
        color: #ffffff;
        padding: 15px 25px;
        border-radius: 5px;
        font-size: 1.1em;
        font-weight: 600;
        margin-top: 20px;
      }
      .content a:hover {
        background-color: #303e5a;
      }
      .footer {
        text-align: center;
        background-color: #1c2434;
        color: #ffffff;
        padding: 10px 0;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
      }
      .footer p {
        font-size: 0.9em;
        font-weight: 300;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <a href="#">Qualhon Informatics</a>
      </div>
      <div class="content">
        <p>Hi,</p>
        <p>Thank you for choosing our brand. Use the following OTP to complete your sign-up procedures. The OTP is valid for only 10 minutes.</p>
        <a href="${url}">Confirm Email</a>
        <p>Regards,<br/> Kamal</p>
      </div>
      <div class="footer">
        <p>Qualhon Informatics</p>
      </div>
    </div>
  </body>
</html>`;
  return html;
};
