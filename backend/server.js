// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Serve static files from the landing directory
app.use(express.static(path.join(__dirname, '..')));

// Serve the index.html file at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'landing', 'main2.html'));
});
// Endpoint to save email
app.post('/save-email', (req, res) => {
    const email = req.body.email;
    // Create directory to store emails.txt if it doesn't exist
    const dir = path.join(__dirname, '..', 'landing');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    
    const filePath = path.join(dir, 'emails.txt');
    console.log('Saving to:', filePath);
    
    if (email) {
        // Add timestamp to the saved email
        const timestamp = new Date().toISOString();
        const dataToSave = `${timestamp} - ${email}\n`;
        
        fs.appendFile(filePath, dataToSave, (err) => {
            if (err) {
                console.error('Error saving email:', err);
                return res.status(500).send('Internal Server Error');
            }
            console.log('Email saved successfully.');
            res.status(200).send('Email saved successfully.');
        });
    } else {
        res.status(400).send('Bad Request: Email is required');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

