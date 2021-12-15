import {createConnection} from 'mysql2'

const connection = createConnection({
    host: "0.0.0.0",
    port:"3306",
    user: 'root',
    database: 'socialmediapp',
})


// const connection = createConnection({
//     host: "sql11.freemysqlhosting.net",
//     port:"3306",
//     user: 'sql11459015',
//     password:'Sxz1q7F1qQ',
//     database: 'sql11459015',
// })


export default connection 