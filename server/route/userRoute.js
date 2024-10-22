const express = require('express')
const router = express.Router();
const connection = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_KEY = 'private-key-its-mine'
const saltRounds = 10;

router.route("/")
    .get((req, res)=>{
        const query = 'SELECT * FROM TBL_USER';
        connection.query(query, (err, results) => {
            if (err) {
                console.error('쿼리 실행 실패:', err);
                // res.status(500).send('서버 오류');
                return;
            }
            res.render('user', { list : results }); 
        });
    })
    .post(async (req, res)=>{
        const { email, password } = req.body;
        // const query = 'SELECT * FROM TBL_USER WHERE id = ? AND pwd = ?';
        const query = 'SELECT * FROM TBL_USER WHERE id = ?';
        let pwdHash = await bcrypt.hash(password, saltRounds);
        console.log(pwdHash)
        connection.query(query, [email], async (err, results) => {
          if (err) throw err;
          if (results.length > 0) {
            const user = results[0];
            const token = jwt.sign({userId: user.id, name: user.name}, JWT_KEY, {expiresIn: '1h'})

            const hash = await bcrypt.compare(password, user.pwd);
            console.log(hash);
            

            res.json({ success: true, token:token });
          } else {
            // 로그인 실패
            res.json({ success: false, message: '실패!' });
          }
        });
        // connection.query(query, [email, pwdHash], (err, results) => {
        //   if (err) throw err;
        //   if (results.length > 0) {
            
        //     const user = results[0];
        //     const token = jwt.sign({userId: user.id, name: user.name}, JWT_KEY, {expiresIn: '1h'})

        //     res.json({ success: true, token:token });
        //   } else {
        //     // 로그인 실패
        //     res.json({ success: false, message: '실패!' });
        //   }
        // });
    })
    .put(async (req, res) => {
      const {email, pwd, name, gender} = req.body;
      const query = 'INSERT INTO TBL_USER VALUES (?, ?, ?, ?)'
      let pwdHash = await bcrypt.hash(pwd,saltRounds)
      console.log(pwdHash)

      try{
        connection.query(query, [email, pwdHash, name, gender], (err, results) => {
          if(err) throw(err);
          res.json({success: true, message: '회원가입에 성공했습니다.'})
        })
      } catch(err){
        res.json({success: false, message: err})
      }    
    });

  
module.exports = router;