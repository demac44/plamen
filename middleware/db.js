import {createConnection} from 'mysql2'

// const connection = createConnection({
//     host: "0.0.0.0",
//     port:"3306",
//     user: 'root',
//     database: 'socialmediapp',
// })


const connection = createConnection({
    host: "db4free.net",
    port:"3306",
    user: 'demac22',
    password:'Windowjesubak2000',
    database: 'plamen_main',
})


export default connection 