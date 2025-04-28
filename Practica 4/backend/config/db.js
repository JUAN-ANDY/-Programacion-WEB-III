//const mysql=require('mysql2');
import mysql from 'mysql2';
const pool=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'bd_product'
}).promise();

export default pool;