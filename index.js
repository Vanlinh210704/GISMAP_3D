const express = require("express");
const app = express();
const path = require('path');

var view_cesium_router = require("./routers/view_cesium_router");
var view_panorama_router = require("./routers/view_panorama_router");

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});

app.set("view engine","ejs");
app.set("views","./views");
app.use(express.static("public"));

app.use("/cesium",view_cesium_router);
app.use("/panorama",view_panorama_router);

module.exports = app;