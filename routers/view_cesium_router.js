const express = require("express");
const pool = require("../db/connect").pool;
const view_cesium_router = express.Router();

view_cesium_router.get("/", function(req, res) { 

    var query_bd = `SELECT json_build_object( 'type', 'FeatureCollection', 'features', json_agg( json_build_object( 'type', 'Feature', 'geometry', ST_AsGeoJSON(ST_Transform(pdc.geom, 4326))::json, 'properties', json_build_object( 'bd_point_data_id', bd.point_data_id, 'image_gallery_link', bd.image_gallery_link, 'height', bd.height, 'area', bd.area, 'district', bd.district, 'price', bd.price, 'pdc_point_data_id', pdc.point_data_id, 'latitude', pdc.latitude, 'longitude', pdc.longitude, 'confidence', pdc.confidence, 'full_plus', pdc.full_plus_, 'status', pc.status, 'point_data_name', pc.point_data_name ) ) ) ) AS geojson FROM    point_data_class pdc  INNER JOIN   building_data bd ON bd.point_data_id = pdc.point_data_id INNER JOIN  point_data_catalog pc ON pc.point_data_catalog_id = pdc.point_data_catalog_id;`;
    
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
