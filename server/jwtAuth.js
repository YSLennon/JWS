const jwt = require('jsonwebtoken');

const jwtAuthentication = (req, res, next)=> {
const token = req.headers.token;
const JWT_KEY = 'private-key-its-mine'

    ///jwt.verify
    if(!token){
        return res.json({success: false, message: '로그인 후 이용해주세요'})
    }
    jwt.verify(token, JWT_KEY, (err, payload) => {
        if(err){
            return res.json({success: false, message: '토큰이 유효하지않습니다.'});
        }
        console.error(payload)
    })
    
    next();
}

module.exports = jwtAuthentication;