const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const fs = require('fs');
const multer = require('multer');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/covers', express.static(path.join(__dirname, '../public/covers')));

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'booksschema',
    port: 3307
});

app.post('/items', (req, res) =>{
    const items = req.body;

    db.query(
        'INSERT INTO items (id, bookname, author, cover, pagenum, publicationdate, genre, description, rating, reviewText, readingStatus, userId) VALUES ?',
        [items.map(item => [item.id, item.bookname, item.author, item.cover, item.pagenum, item.publicationdate, item.genre, item.description, item.rating, item.reviewText, item.readingStatus, item.userId])],
        (err, result) => {
            if (err) {
                console.error('Помилка вставки даних:', err);
                res.status(500).send('Помилка сервера');
            } else {
                res.status(200).send('Дані успішно вставлено');
            }
        }
    );
});

app.delete('/items', (req, res) => {
    db.query('DELETE FROM items', (err, result) => {
        if (err) {
            console.error('Помилка виконання запиту на видалення:', err);
            res.status(500).send('Помилка сервера');
        } else {
            res.status(200).send('Всі записи успішно видалено');
        }
    });
});

app.get('/items', (req, res) => {
    db.query('SELECT * FROM items', (err, results) => {
        if (err) {
            console.error('Помилка виконання запиту:', err);
            res.status(500).send('Помилка сервера');
        } else {
            res.status(200).json(results);
        }
    });
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/covers/'));
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}cover.jpg`);
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('cover'), (req, res) => {
    const coverURL = `http://localhost:3001/covers/${req.file.filename}`;
    res.json({ coverURL: coverURL });
});

app.delete('/delete-cover/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../public/covers/', filename);

    fs.unlink(filePath, (err) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).send('File deleted successfully');
        }
    });
});

app.post('/auth', (req, res) => {
    const { login, password } = req.body;

    db.query('SELECT * FROM users WHERE login = ? AND password = ?', [login, password], (error, results) => {
        if (error) {
            console.error('Error authenticating user:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
            return;
        }
  
        if (results.length > 0) {
            res.json({ success: true, userId: results[0].id, login: results[0].login });
        } else {
            res.json({ success: false });
        }
    });
});

app.post('/register', (req, res) => {
    const { login, password } = req.body;

    db.query('SELECT * FROM users WHERE login = ?', [login], (error, results) => {
        if (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
            return;
        }

        if (results.length > 0) {
            res.status(400).json({ success: false, error: 'User with this login already exists' });
            return;
        }

        db.query('INSERT INTO users (login, password) VALUES (?, ?)', [login, password], (insertError, insertResults) => {
        if (insertError) {
            console.error('Error registering user:', insertError);
            res.status(500).json({ success: false, error: 'Internal server error' });
            return;
        }

        res.status(201).json({ success: true });
        });
    });
});
  

app.listen(3001, () => {
    console.log("Server is running. Port: 3001")
})