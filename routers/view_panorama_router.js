var express = require("express");
const pool = require("../db/connect").pool; 
var view_panorama_router = express.Router();

view_panorama_router.get("/:id", function(req, res) {
    // Lấy id từ URL
    const id = req.params.id;
    
    // Sử dụng id trong câu lệnh SQL
    var query_li = "SELECT * FROM panorama_image_catalog AS pic INNER JOIN building_data AS bd ON pic.building_id = bd.building_id WHERE bd.building_id = $1"; 

    pool.query(query_li, [id], (err, result) => {
        if (err) {
            console.error('Lỗi khi thực thi truy vấn:', err.stack);
            res.status(500).send('Lỗi máy chủ nội bộ');
            return;
        }
        const data_bd = result.rows;
        const imagelinks = result.rows.map(row => row.image_link);
        res.render('viewpanorama', { data_bd , imagelinks}); 
    });
});

module.exports = view_panorama_router;
