const db = require('./db');

const getAll = async () => {
    const [rows] = await db.query("SELECT * FROM productos");
    return rows;
};

const getById = async (id) => {
    const [rows] = await db.query("SELECT * FROM productos WHERE id = ?", [id]);
    return rows[0];
};

const create = async (producto) => {
    const { nombre, precio } = producto;
    await db.query("INSERT INTO productos (nombre, precio) VALUES (?, ?)", [nombre, precio]);
};

const update = async (id, producto) => {
    const { nombre, precio } = producto;
    await db.query("UPDATE productos SET nombre = ?, precio = ? WHERE id = ?", [nombre, precio, id]);
};

const remove = async (id) => {
    await db.query("DELETE FROM productos WHERE id = ?", [id]);
};

module.exports = { getAll, getById, create, update, remove };
