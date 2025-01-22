const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer'); 

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Python@123',
    database: 'dental_clinic',
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

// Appointment booking route
app.post('/api/appointments', (req, res) => {
    const { name, email, phone, date, time, message } = req.body;

    const sql = 'INSERT INTO appointments (name, email, phone, date, time, message) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, email, phone, date, time, message], async (err, result) => {
    
        if (err) {
            console.error('Error inserting appointment:', err);
            return res.status(500).json({ message: 'Error booking appointment' });
        }

    

        // Configure Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'vickydelhi03@gmail.com', 
                pass: 'jzyy aotg hazo vdzh', 
            },
        });

        // Email content
        const mailOptions = {
            from: 'vickydelhi03@gmail.com', 
            to: email, 
            subject: 'Appointment Confirmation',
            text: `Hello ${name},\n\nYour appointment is confirmed for ${date} at ${time}.\n\nThank you for choosing our clinic!\n\nBest regards,\nDental Clinic Team`,
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log('Confirmation email sent successfully');
            res.status(200).json({ message: 'Appointment booked successfully' });
        } catch (emailError) {
            console.error('Error sending confirmation email:', emailError);
            res.status(500).json({ message: 'Appointment booked, but email failed to send' });
        }
    });
});

// Feedback submission route
app.post('/api/feedback', (req, res) => {
    const { name, email, feedback } = req.body;

    const sql = 'INSERT INTO feedback (name, email, feedback) VALUES (?, ?, ?)';
    db.query(sql, [name, email, feedback], (err, result) => {
        if (err) {
            console.error('Error inserting feedback:', err);
            return res.status(500).json({ message: 'Error submitting feedback' });
        }

        console.log('Feedback submitted successfully:', result);
        res.status(200).json({ message: 'Feedback submitted successfully' });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
