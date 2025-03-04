const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, '..')));

// Serve the main2.html file from the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'main2.html'));
});

// Endpoint to save email
app.post('/save-email', (req, res) => {
    const email = req.body.email;
    // Define the directory to store emails.txt (in the 'data' folder)
    const dir = path.join(__dirname, '..', 'data');
    // Create the directory if it doesn't exist
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