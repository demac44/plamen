import Mysql from 'sync-mysql'

let connection = new Mysql({
    host: "127.0.0.1",
    port: "3306",
    user: 'root',
    password: '12345',
    database: 'socialmediapp'
});


export default connection 