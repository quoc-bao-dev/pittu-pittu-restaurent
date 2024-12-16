const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { log } = require('console');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'your-secret-key';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static images
app.use('/images', express.static(path.join(__dirname, '/images')));

// Load dữ liệu từ file JSON
let users = JSON.parse(
    fs.readFileSync(__dirname + '/data/users.json', 'utf-8')
);
let dishes = JSON.parse(
    fs.readFileSync(__dirname + '/data/dishes.json', 'utf-8')
);
let categories = JSON.parse(
    fs.readFileSync(__dirname + '/data/categories.json', 'utf-8')
);

// Helper functions
function generateToken(user) {
    return jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });
}

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token)
        return res.status(401).json({ message: 'Access token missing' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
}

// Routes

// Auth routes
app.post('/auth/register', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res
            .status(400)
            .json({ message: 'Username and password are required' });
    }

    if (users.find((user) => user.username === username)) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = { id: users.length + 1, username, password };
    users.push(newUser);
    fs.writeFileSync('data/users.json', JSON.stringify(users, null, 2));
    res.status(201).json({ message: 'User registered successfully' });
});

app.post('/auth/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(
        (u) => u.username === username && u.password === password
    );

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken({ id: user.id, username: user.username });

    res.json({ token });
});

// Dish routes
app.get('/dishes', (req, res) => {
    res.json(dishes);
});

app.get('/dishes/:id', (req, res) => {
    const dishId = parseInt(req.params.id, 10);
    const dish = dishes.find((d) => d.id === dishId);

    if (!dish) {
        return res.status(404).json({ message: 'Dish not found' });
    }

    res.json(dish);
});

// Category routes
app.get('/categories', (req, res) => {
    res.json(categories);
});

app.get('/search', (req, res) => {
    const { query } = req.query;
    const searchResult = dishes.filter(
        (d) =>
            d.name.toLowerCase().includes(query.toLowerCase()) ||
            d.description.toLowerCase().includes(query.toLowerCase())
    );

    res.json(searchResult);
});

// Protected route example
app.get('/profile', authenticateToken, (req, res) => {
    const user = users.find((u) => u.id === req.user.id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
