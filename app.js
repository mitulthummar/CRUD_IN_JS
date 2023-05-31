const mysql = require('mysql2');
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin@123',
    database:'test',
    port: 3306,
})  

connection.connect(function(err) {
    if (err) {
        console.log(err);
    }else
    {console.log("DB is Connected!");}
});


app.post('/create',(req,res)=>{
    const {id,name,blood_group,city} = req.body;
    const client = {
        id,
        name,
        blood_group,
        city
        }

    connection.query('insert into student set ?', client,(err, data) => {
        if (err) {
                    console.log(err);
                }
                res.json(data);
    })
})

app.get('/',(req,res)=>{
    connection.query('SELECT * FROM student', (err, data) => {
        if (err) {
                    console.log(err);
                }
                res.json(data);
    })
})
app.get('/:id',(req,res)=>{
    connection.query('SELECT * FROM student where name =' + req.params.id, (err, data) => {
        if (err) {
                    console.log(err);
                }
                res.json(data);
    })
})

app.listen(9000,(err)=>{
    if (err) {
            console.log(err);
        }else{
        console.log("Server is running");
        }
})
