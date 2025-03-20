const mysql = require('mysql2/promise');

const config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bd_docente',
    waitForConnections: true,
    connectionLimit: 10, // Número máximo de conexiones en el pool
    queueLimit: 0
};

// Crear el pool de conexiones
const pool = mysql.createPool(config);

async function main() {
    const startTime = Date.now(); // Iniciar la medición del tiempo

    const connection = await pool.getConnection(); // Obtener una conexión del pool

    try {
        console.log('Conexión exitosa (usando pool)');

        // Mostrar todos los docentes
        const [rows] = await connection.query('SELECT * FROM docente');
        console.log('Datos del Docente:', rows);

        // Insertar un nuevo docente
        const [resultado] = await connection.query(
            'INSERT INTO docente (nomDoc, apePatD, apeMatD, edadD, generoD, especializacion) VALUES (?, ?, ?, ?, ?, ?)',
            ['Wanda', 'Valdez', 'Fabril', '29', 'Femenina', 'Fisica']
        );
        console.log('Id del nuevo Registro:', resultado.insertId);

        const endTime = Date.now(); // Finalizar la medición del tiempo
        console.log(`Tiempo de ejecución: ${endTime - startTime}ms`);
    } catch (error) {
        console.error('Error en la consulta:', error);
    } finally {
        connection.release(); // Liberar la conexión para que pueda ser reutilizada
    }
}

// Ejecutar la función principal
main();
