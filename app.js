var express = require('express');
var mysql = require('mysql');
var path = require('path');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');

// create connection
const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password: "",
    database: "nodesql"
})

db.connect(err => {
    if(err) throw err;
    console.log('database connected...');
});

var app = express();



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req,res) => {
//     res.render('index')
// })

// app.get('/users/login', (req,res) => {
//     res.render('login');
// })

// app.post('/users/login', (req,res) => {
//     console.log(req.body, "user login data...............................");
//     res.status(200).send({data: req.body, msg: "login res..."});
// })

app.get('/users/register', (req,res) => {
    res.render('register');
})

// console.log(
    app.get("/check", (req,res, next) => {
        console.log(req, "res", "next", "..............")
    } );
// , "app.........");


// app.post('/users/register', (req,res) => {
//     console.log(req.body, "user register data.............................");
//     res.status(200).send({data: req.body, msg: "register res..."});
// })

//create table
// app.get('/createposttable', (req, res) => {
//     var sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';

//     db.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log(result);
//         res.status(200).send({ data: result, "msg": "msg created..." });
//     })
// })

//insert post / add data
// app.post('/addpost ', (req, res) => {
//     let post = { title: "Post one", body: 'this is post number one' };
//     var sql = 'INSERT INTO posts set ?';

//     let query = db.query(sql, post, (err, result) => {
//         if (err) throw err;
//         console.log(result);
//         res.status(200).send({ data: result, "msg": "post created..." });
//     })
// })


//insert post1 / add data in table
app.get('/addpost1', (req, res) => {
    console.log("add post one....................................");
    let post = { title: "Post one", body: 'this is post number one' };
    var sql = 'INSERT INTO posts set ?';

    db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.status(200).send({ data: result, "msg": "post 1 created..." });
    })
})

// insert post2 / add data in table
app.get('/addpost2', (req, res) => {
    console.log("add post two....................................");

    let post = { title: "Post two", body: 'this is post number two' };
    var sql = 'INSERT INTO posts set ?';

    db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.status(200).send({ data: result, "msg": "post 2 created..." });
    })
})

//get all posts
app.get('/getposts', (req, res) => {
    console.log("get posts..........................................");

    var sql = 'SELECT * FROM posts';
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.status(200).send({ data: result, "msg": "post fetched..." });
    })
})

app.get('/get-data', (req, res) => {
    console.log("get posts..........................................");

    var sql = 'SELECT id json_extract(names) FROM names_array';
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.status(200).json(result);

        // res.status(200).send({ data: result, "msg": "post fetched..." });
    })
})

//create table
// app.get('/users/create-table', (req, res) => {
//     var sql = 'CREATE TABLE users(id int AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255), age int, country VARCHAR(255), city VARCHAR(255), profession VARCHAR(255),gender VARCHAR(255), marital-status VARCHAR(255), language VARCHAR(255), PRIMARY KEY(id))';

//     db.query(sql, (err, result) => {
//         if(err) throw err;
//         console.log(result, "user table result...");
//         res.status(200).send({result , msg: "users table created ..."});
//     })
// })

// create user
app.post('/users/register', (req, res) => {
    console.log(req.body, "user post req.body....");

    var sql = 'CREATE TABLE users(id int AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255), age int, country VARCHAR(255), city VARCHAR(255), profession VARCHAR(255), gender VARCHAR(255), maritalStatus VARCHAR(255), language VARCHAR(255), PRIMARY KEY(id))';

    let data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        age: Number(req.body.age),
        country: req.body.country,
        city: req.body.city,
        profession: req.body.profession,
        gender: req.body.gender,
        maritalStatus: req.body.maritalStatus,
        language: req.body.language
    };

    // let data = { name : "sajan", email: "sajan@gmail.com", password: "qwerty", age:22, country: "india", city: "d/shala", profession: "developer"};

    console.log(data, "user register data....");

    var sql = 'INSERT INTO users set ?';

    db.query(sql, data, (err, result) => {
        if(err) {
            console.log(err, "err .....");
            return;
        }
        console.log(result, "user table result...");
        res.status(200).send({data: result, msg: "user registered ..."});
    });
});

/*
    to select specific recordes
    select id, name, email, age from users;

    from a particular record
    select id, name, email, age from users where id= "document id";
*/

//get single user
app.get('/users/:id', (req, res) => {
    console.log("get posts..........................................");

    var sql = `SELECT * FROM posts WHERE id=${req.params.id}`;
    let query = db.query(sql, (err, user) => {
        if (err) throw err;
        console.log(user);
        res.status(200).send({ user, "msg": "single user fetched..." });
    })
})

//select specific fiels from table
// app.get('/users/get/:id', (req, res) => {
//     console.log("get posts..........................................");

//     var sql = `SELECT name, email, password, FROM posts WHERE id=${req.params.id}`;
//     let query = db.query(sql, (err, user) => {
//         if (err) throw err;
//         console.log(user);
//         res.status(200).send({ user, "msg": "single user fetched..." });
//     })
// })

//update user
app.get('/users/update/:id', (req, res) => {
    console.log("inside update user....");

    var newName = "Ravi";

    var sql = `UPDATE users SET name = '${newName}' WHERE id=${req.params.id}`;

    let query = db.query(sql, (err, user) => {
        if (err) throw err;
        console.log(user);
        res.status(200).send({ user, "msg": "user updated..." });
    })
})

//delete user
app.get('/users/delete/:id', (req, res) => {
    console.log("inside delete user....");

    var sql = `DELETE FROM users WHERE id=${req.params.id}`;

    let query = db.query(sql, (err, user) => {
        if (err) throw err;
        // console.log(user);
        res.status(200).send({ user, "msg": "user deleted..." });
    })
})


// app.get('/createdb', (req,res) => {
//     let sql = 'CREATE DATABASE nodesql';
//     db.query(sql, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.status(200).send({ msg: 'database connected...', result });
//     })
// })



app.listen(3000, (err) => {
    if(err) {
        console.log(err);
        return;
    } else {
        console.log("server started at port 3000..................");
    }
})


var names = ['sam', 'jack', 'jhon', 'mike'];

'CREATE TABLE names_array (id int AUTO_INCREMENT, names JSON, PRIMARY KEY(id))';

`INSERT INTO names_array (names) values ('["sam", "jack", "jhon", "mike"]')`;

'INSERT INTO users ( name , email, password, age, country, city, profession, gender, maritalStatus, language) values ("sam db test", "samdb@.com", "qwer1231",22, "india", "kangra", "dev", "male", "single", "hindiiii")';

//drop table;

'DROP TABLE table_name';