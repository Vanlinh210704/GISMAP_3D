const express = require("express");
const pool = require("../db/connect").pool; 
const GeoJSON = require('geojson');
var view_cesium_router = express.Router();

view_cesium_router.get("/", function(req ,res){
    var query_bd = "SELECT row_to_json(fc) AS geojson FROM (SELECT 'FeatureCollection' AS type,array_to_json(array_agg(f)) AS features FROM (SELECT 'Feature' AS type, ST_AsGeoJSON(ST_Transform(pdc.geom, 3857))::json AS geometry, json_build_object( 'point_data_id', bd.point_data_id, 'image_gallery_link', bd.image_gallery_link, 'height', bd.height, 'point_data_id', pdc.point_data_id, 'latitude', pdc.latitude, 'longitude', pdc.longitude, 'confidence', pdc.confidence, 'full_plus', pdc.full_plus_, 'status', pc.status, 'point_data_name', pc.point_data_name ) AS properties FROM  point_data_class pdc INNER JOIN  building_data bd ON bd.point_data_id = pdc.point_data_id INNER JOIN point_data_catalog pc ON pc.point_data_catalog_id = pdc.point_data_catalog_id ) AS f ) AS fc;"

    pool.query(query_bd, (err, result) => {
    if (err) {
        console.error('Error executing query:', err.stack);
        res.status(500).send('Internal Server Error');
        return;
    }
    const geojsonResult = result.rows[0].geojson;
    res.render('cesium', { geojsonResult });
    }); 

});

module.exports = view_cesium_router;
