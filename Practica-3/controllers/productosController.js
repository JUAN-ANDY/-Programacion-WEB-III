const Producto = require('../models/productoModel');

exports.list = async (req, res) => {
    try {
        const productos = await Producto.getAll();
        res.render('index', { productos });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).send('Error al obtener productos');
    }
};

exports.form = async (req, res) => {
    try {
        let producto = { id: null, nombre: '', precio: '' };
        if (req.params.id) {
            producto = await Producto.getById(req.params.id);
            if (!producto) {
                return res.status(404).send('Producto no encontrado');
            }
        }
        res.render('form', { producto });
    } catch (error) {
        console.error('Error al obtener el formulario del producto:', error);
        res.status(500).send('Error al cargar el formulario');
    }
};

exports.save = async (req, res) => {
    try {
        if (req.body.id) {
            await Producto.update(req.body.id, req.body);
        } else {
            await Producto.create(req.body);
        }
        res.redirect('/productos');
    } catch (error) {
        console.error('Error al guardar el producto:', error);
        res.status(500).send('Error al guardar el producto');
    }
};

exports.delete = async (req, res) => {
    try {
        const producto = await Producto.getById(req.params.id);
        if (!producto) {
            return res.status(404).send('Producto no encontrado');
        }
        await Producto.remove(req.params.id);
        res.redirect('/productos');
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).send('Error al eliminar el producto');
    }
};

