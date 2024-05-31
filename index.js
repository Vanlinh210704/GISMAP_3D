const express = require("express");
const app = express();
const path = require('path');

var view_cesium_router = require("./routers/view_cesium_router");
var view_panorama_router = require("./routers/view_panorama_router");

app.listen(3000);

app.set("view engine","ejs");
app.set("views","./views");
app.use(express.static("public"));

app.use("/cesium",view_cesium_router);
app.use("/panorama",view_panorama_router);

module.exports = app;