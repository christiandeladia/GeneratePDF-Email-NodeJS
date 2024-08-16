const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Set up Multer for handling file uploads
const upload = multer({ dest: 'uploads/' });

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
    secure: true,
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: 'tiangaming000@gmail.com',
        pass: 'kherygiscrolaxxq'
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/send-email', upload.single('pdf'), (req, res) => {
    const pdfPath = req.file.path;

    // Send email with attachment
    transporter.sendMail({
        to: 'tiangaming000@gmail.com',
        subject: 'Solar Panel System Report',
        text: 'Good day, Please find the attached pdf of Solar Panel System Report.',
        attachments: [
            {
                filename: req.file.originalname,
                path: pdfPath
            }
        ]
    }, (error, info) => {
        fs.unlinkSync(pdfPath); // Remove the file after sending
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Error sending email.');
        }
        console.log('Email sent:', info.response);
        res.send('Email sent successfully!');
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
