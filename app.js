const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, 'uploadss');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Use the relative path to uploads directory
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Save with the original file name
    }
});

const upload = multer({ storage: storage });

const app = express();

app.get('/', (req, res) => {
    res.send("Hello World");
});

const port = process.env.PORT || 3000;

app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.json(req.file);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
