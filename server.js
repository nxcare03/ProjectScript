const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// เปิดใช้งาน CORS
app.use(cors({
  origin: 'http://192.168.1.76',  // ใช้ IP Address ของเครื่องที่รันเซิร์ฟเวอร์แทน localhost
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization',
}));
app.use(bodyParser.json());

// เชื่อมต่อฐานข้อมูล
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'project',
});

db.connect(err => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

// ---------------------- ครู (Teacher) ----------------------

// ตรวจสอบการเข้าสู่ระบบครู
app.post('/teachers/login', (req, res) => {
  const { username, password } = req.body;

  console.log('Received login data:', username, password);  // ดีบักข้อมูลที่รับมา

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน' });
  }

  // เช็คชื่อผู้ใช้จากฐานข้อมูล
  db.query('SELECT * FROM teacher WHERE email = ?', [username], (err, results) => {
    if (err) return res.status(500).send(err);

    console.log('Database query result:', results);  // ดีบักผลลัพธ์จากฐานข้อมูล

    if (results.length > 0) {
      const user = results[0];

      // เปรียบเทียบรหัสผ่านที่กรอกกับรหัสผ่านที่เก็บในฐานข้อมูล (โดยไม่ใช้ bcrypt)
      if (user.password === password) {
        res.json({ success: true, user: user });
      } else {
        res.status(401).json({ success: false, message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
      }
    } else {
      res.status(401).json({ success: false, message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
    }
  });
});

// ---------------------- นักเรียน (Student) ----------------------

// ตรวจสอบการเข้าสู่ระบบนักเรียน
app.post('/students/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน' });
  }

  // เช็คชื่อผู้ใช้จากฐานข้อมูล
  db.query('SELECT * FROM student WHERE email = ?', [username], (err, results) => {
    if (err) return res.status(500).send(err);

    // ตรวจสอบว่าพบผู้ใช้หรือไม่
    if (results.length > 0) {
      const user = results[0];

      // เช็คว่ารหัสผ่านตรงกันหรือไม่
      if (user.password === password) {
        res.json({ success: true, user: user });
      } else {
        res.status(401).json({ success: false, message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
      }
    } else {
      res.status(401).json({ success: false, message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
    }
  });
});

// ---------------------- ตั้งค่า Server ----------------------

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:3000`);
});
