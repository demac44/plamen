import mysql from 'mysql'


let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'socialmediapp'
});


connection.connect((error)=>{
    if (error) throw error;
    console.log('DB Connected...'); 
})



export default connection