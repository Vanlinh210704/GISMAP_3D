var express = require("express");
const pool = require("../db/connect").pool; 
var view_panorama_router = express.Router();

view_panorama_router.get("/", function(req, res) {
    var query_li = "SELECT image_link FROM panorama_image_catalog WHERE building_id = 2";
    
    pool.query(query_li, (err, result) => {
        if (err) {
            console.error('Lỗi khi thực thi truy vấn:', err.stack);
            res.status(500).send('Lỗi máy chủ nội bộ');
            return;
        }
        const imagelinks = result.rows.map(row => row.image_link);
        res.render('viewpanorama', { imagelinks }); 
    });
});

module.exports = view_panorama_router;