const mysql = require('mysql2/promise');

const config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bd_colegio'
};

async function main() {
    const startTime = Date.now(); // Iniciar la medición del tiempo

    try {
        const connection = await mysql.createConnection(config);
        console.log('Conexión exitosa');

        // Mostrar todos los colegios
        const [rows] = await connection.query('SELECT * FROM colegio');
        console.log('Datos del Colegio:', rows);

        // Insertar un nuevo colegio
        const [resultado] = await connection.query(
            'INSERT INTO colegio (nomCol, ubi, telefono, correoC, nivelEdu, modalidad) VALUES (?, ?, ?, ?, ?, ?)',
            ['Schmidt', 'Avaroa', '1234353', 'Schmidt@gmail.com', 'inicial', 'presencial']
        );
        console.log('Id del nuevo Registro:', resultado.insertId);

        await connection.end();

        const endTime = Date.now(); // Finalizar la medición del tiempo
        console.log(`Tiempo de ejecución: ${endTime - startTime}ms`);
    } catch (error) {
        console.error('Error en la consulta:', error);
    }
}
main();



