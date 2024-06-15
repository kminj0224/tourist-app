const express = require('express');
const mysql = require('mysql');
const app = express();

// MySQL 데이터베이스 연결 설정
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // MySQL 사용자명
  password: '0000', // MySQL 비밀번호
  database: 'tourist_spots'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected...');
});

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  let sql = 'SELECT * FROM spots';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.render('index', {
      spots: results
    });
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
