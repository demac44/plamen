import {createConnection} from 'mysql2'

// const connection = createConnection({
//     host: "0.0.0.0",
//     port:"3306",
//     user: 'root',
//    database: 'socialmediapp',
// })


const connection = createConnection({
    host: process.env.DB_HOST,
    port:process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
})

// const connection = createConnection({
//     host: "db4free.net",
//     port:3306,
//     user: "demac22",
//     password: "Windowjesubak2000",
//     database: "plamen_main",
// })



export default connection 