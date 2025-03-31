const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const productosRoutes = require("d:/Node JS/ferreteria-crud/routes/productosroutes.js");


const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/productos', productosRoutes);

app.listen(3000, () => console.log('Servidor en http://localhost:3000/productos '));
