-- Creamos la base de datos llamada 'ferreteria_db'
CREATE DATABASE ferreteria_db;

-- Seleccionar la base de datos 'ferreteria_db' para usarla
USE ferreteria_db;

-- Crear la tabla 'productos' para almacenar los datos de los productos
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Columna 'id': identificador único para cada producto, se incrementa automáticamente
    nombre VARCHAR(100) NOT NULL,      -- Columna 'nombre': almacena el nombre del producto, máximo 100 caracteres, no puede ser nulo
    precio DECIMAL(10,2) NOT NULL      -- Columna 'precio': almacena el precio del producto con hasta 10 dígitos y 2 decimales, no puede ser nulo
);