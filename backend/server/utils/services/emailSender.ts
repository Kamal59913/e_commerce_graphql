import nodemailer from 'nodemailer';
interface Message {
  to: string[];
  from: string;
  subject: string;
  html: string;
  // reason:string  
}

const EmailSender = async (
  email: string[],
  template: any,
  subject: string,
  // reason?:string
): Promise<string> => {
  try {

  
    const transport = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SENDER_MAIL,
        pass: process.env.SENDER_MAIL_PASSWORD,
      },
    });

  
    const msg: Message = {
      from: process.env.SENDER_MAIL,
      to: email,
      subject: subject,
      html: template,
      // reason:reason
    };

    const emailSend = await transport.sendMail(msg);
    if (emailSend) {
      return `Verification email sent to: ${email}`;
    }
  } catch (e) {
    console.log(e, 'error');
    return 'Technical Issue!, Please click on resend for verify your Email.';
  }
};

export default EmailSender;
