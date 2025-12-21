const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// Database File Path
const DB_PATH = path.join(__dirname, '../database/db.json');
const CONTENT_PATH = path.join(__dirname, '../database/content.json');

// Ensure DB exists
if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({ users: {} }, null, 2));
}

// ==========================================
// API ROUTES
// ==========================================

// Get Content (Zones)
app.get('/api/content', (req, res) => {
    const content = fs.readFileSync(CONTENT_PATH);
    res.json(JSON.parse(content));
});

// Save User Progress
app.post('/api/save', (req, res) => {
    const { userId, state } = req.body;
    if (!userId || !state) return res.status(400).send('Missing data');

    const db = JSON.parse(fs.readFileSync(DB_PATH));
    db.users[userId] = state;
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));

    res.json({ success: true, message: 'Saved' });
});

// Load User Progress
app.get('/api/load/:userId', (req, res) => {
    const { userId } = req.params;
    const db = JSON.parse(fs.readFileSync(DB_PATH));

    if (!db.users[userId]) {
        return res.json({ exists: false });
    }

    res.json({ exists: true, state: db.users[userId] });
});

// ==========================================
// PAGE ROUTES (View Controller)
// ==========================================

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

app.get('/zone/:id', (req, res) => {
    // We serve the generic zone template. Client-side JS will fetch the specific content.
    res.sendFile(path.join(__dirname, '../public/views/zone.html'));
});

app.get('/final', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/outcome.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
