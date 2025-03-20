const pool = require('./database');

async function main() {
    const startTime = Date.now(); // Iniciar medición del tiempo

    const connection = await pool.getConnection(); // Obtener una conexión del pool

    try {
        console.log('Conexión exitosa (usando pool)');

        // Mostrar todos los estudiantes
        const [rows] = await connection.query('SELECT * FROM estudiante');
        console.log('Datos del Estudiante:', rows);

        // Insertar un nuevo Estudiante
        const [resultado] = await connection.query(
            'INSERT INTO estudiante (nomEst, apePatE, apeMatE, generoE, ci, gradoE) VALUES (?, ?, ?, ?, ?, ?)',
            ['Iavn', 'Mercado', 'Loza', 'Masculino', '5252414', '5to']
        );
        console.log('Id del nuevo Registro:', resultado.insertId);

        const endTime = Date.now(); // Finalizar medición del tiempo
        console.log(`Tiempo de ejecución: ${endTime - startTime}ms`);
    } catch (error) {
        console.error('Error en la consulta:', error);
    } finally {
        connection.release(); // Liberar la conexión para que pueda ser reutilizada
    }
}

// Ejecutar la función principal
main();
