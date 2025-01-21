const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;


app.use(cors());
app.use(bodyParser.json());


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'Python@123', 
    database: 'dental_clinic'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});


app.post('/api/appointments', (req, res) => {
    const { name, email, phone, date, time, message } = req.body;

    const sql = 'INSERT INTO appointments (name, email, phone, date, time, message) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, email, phone, date, time, message], (err, result) => {
        if (err) {
            console.error('Error inserting appointment:', err);
            return res.status(500).json({ message: 'Error booking appointment' });
        }
        console.log('Appointment booked successfully:', result);
        res.status(200).json({ message: 'Appointment booked successfully' });
    });
});


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


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
