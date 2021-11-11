import Mysql from 'sync-mysql'

let connection = new Mysql({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'socialmediapp'
});


export default connection 