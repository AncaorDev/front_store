"use strict";
const express = require("express");
const compression = require("compression");
const helmet = require('helmet');
const _port = process.env.PORT || 8080;
const http = require('http');
const _app_folder = 'dist';
const path = require('path');
const app = express();
app.use(compression());

app.use(helmet.frameguard({ action: 'SAMEORIGIN' }));
// ---- SERVE STATIC FILES ---- //
app.use(express.static(path.join(__dirname, _app_folder), { maxAge: '1y' }));
app.disable("x-powered-by");
app.disable("Server");
// ---- SERVE APLICATION PATHS ---- //
app.get('/*', async (req, res) => {
    res.setHeader("Set-Cookie", "Secure");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("Server", "Desconocido");
    res.sendFile(path.resolve(__dirname, _app_folder, 'index.html'));
});

// ---- CREATE SERVER ---- //
const server = http.createServer(app)

// ---- START UP THE NODE SERVER  ----
app.listen(_port, () => {
    console.log("Node Express server for " + app.name + " listening on http://localhost:" + _port);
});

module.exports = app;
