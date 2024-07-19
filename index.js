const express = require("express")
const app = express()
const { v4: uuidv4 } = require('uuid');
let methodOverride = require('method-override');


const port = 8080;
const path = require('path');
const req = require("express/lib/request");

app.use(express.urlencoded({extended: true})); //middle wires
app.use(express.json()); // middle wires
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


let posts = [
    {
        id: uuidv4(),
        username :"apna college",
        content: "Hi i am doing coding right now"
    },
    {
        id: uuidv4(),
        username :"shraddha",
        content: "Hi i am not doing coding right now"
    },
    {
        id: uuidv4(),
        username :"ayaz",
        content: "Hi i am enjoying right now"
    },
];


app.listen( port, () => {
    console.log(`we r listining you on ${port}`)
});

app.get('/posts', (req, res) => {
    res.render("index.ejs",{posts})
});

app.get('/posts/new', (req, res) => {
    res.render('new.ejs')
});

app.get('/posts/:id', (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render('show.ejs', { post } )
});

app.get('/posts/:id/edit', (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render('edit.ejs', {post});
})

app.post('/posts', (req, res) => {
    let {username, content } = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect('/posts')
});


app.patch('/posts/:id', (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    let newContent =  req.body.content;
    post.content = newContent;
    res.redirect('/posts')
});

app.delete('/posts/:id', (req, res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect('/posts')
});