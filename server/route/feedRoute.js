express = require('express');
const router = express.Router();
const connection = require('../db');
const jwtAuthentication  = require('../jwtAuth');

router.route("/")
    .get(jwtAuthentication, (req, res) => {
        const query = 'SELECT * FROM TBL_FEED';

        connection.query(query, (err, results) => {
            if(err){
                res.status(500).send('서버 오류');
                return;
            }
            res.json({ success: true, result:results });
        })
    })
router.route("/:id")
    .delete((req, res) => {
        const query = 'DELETE FROM TBL_FEED WHERE ID = ?'
    
        connection.query(query, [req.params.id], (err, results) => {
            if(err){
                res.status(500).send('서버 오류');
                return;
            }
            res.json({success: true, message: '삭제되었습니다.'})
        });
        
    })
    .put((req, res) => {
        const query = 'UPDATE TBL_FEED SET FAVORITE = FAVORITE + 1 WHERE ID = ?'
    
        connection.query(query, [req.params.id], (err, results) => {
            if(err){
                res.status(500).send('서버 오류');
                return;
            }
            res.json({success: true, message: 'Be added an One DDabong.'})
        });
        
    })
module.exports = router;