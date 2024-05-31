const express = require("express");
const { client } = require("./db/connect"); 
const app = express();
const path = require('path');
const GeoJSON = require('geojson');

app.listen(3000);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public/views"));
app.use(express.static(path.join(__dirname, "public")));

// Kết nối cơ sở dữ liệu khi ứng dụng khởi động
client.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

app.get('/image', (req, res) => {
    var i = req.params.id
    client.query('SELECT image_link FROM panorama_image_catalog Where building_id = 2' , (err, result) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            res.status(500).send('Internal Server Error');
            return;
        }
        const imagelinks = result.rows.map(row => row.image_link);
        // const imageLink = result.rows[0].image_link; 
        res.render('viewpanorama', { imagelinks }); 
    });
});
app.get('/map', (req, res) => {
    client.query(`SELECT 
    row_to_json(fc) AS geojson
FROM (
    SELECT 
        'FeatureCollection' AS type,
        array_to_json(array_agg(f)) AS features
    FROM (
        SELECT 
            'Feature' AS type,
            ST_AsGeoJSON(ST_Transform(pdc.geom, 3857))::json AS geometry,
            json_build_object(
                'point_data_id', bd.point_data_id,
                'image_gallery_link', bd.image_gallery_link,
                'height', bd.height,
                'point_data_id', pdc.point_data_id,
                'latitude', pdc.latitude,
                'longitude', pdc.longitude,
                'confidence', pdc.confidence,
                'full_plus', pdc.full_plus_,
                'status', pc.status,
                'point_data_name', pc.point_data_name
            ) AS properties
        FROM 
            point_data_class pdc
        INNER JOIN 
            building_data bd ON bd.point_data_id = pdc.point_data_id
        INNER JOIN
            point_data_catalog pc ON pc.point_data_catalog_id = pdc.point_data_catalog_id
    ) AS f
) AS fc;`, (err, result) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            res.status(500).send('Internal Server Error');
            return;
        }
         const geojsonResult = result.rows[0].geojson;
         res.render('cesium', { geojsonResult });
    });
});
