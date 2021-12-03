import {createConnection} from 'mysql2'

const connection = createConnection({
    host: "0.0.0.0",
    port:"3306",
    user: 'root',
    database: 'socialmediapp',
})


export default connection 