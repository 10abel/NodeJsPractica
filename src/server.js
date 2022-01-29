const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

function idUnico() {
  // function closure
  let id = 0;
  return function () {
    id = id + 1;
    return id;
  };
}

const newId = idUnico(); // instancio la closure

// 1 POST

server.post('/posts', (req, res) => {
  const { author, title, contents } = req.body;
  if (author && title && contents) {
    const newPost = {
      id: newId(),
      author,
      title,
      contents,
    };
    posts.push(newPost);
    return res.json(newPost);
  } else {
    return res.status(STATUS_USER_ERROR).json({
      error: 'No se recibieron los parámetros necesarios para crear el Post',
    });
  }
});

//2 POST
server.post('/posts/author/:author', (req, res) => {

  const author = req.params.author;
  const { title, contents } = req.body;
  if (author && title && contents) {
    const newPost = {
      id: newId(),
      author,
      title,
      contents,
    };
    posts.push(newPost);
    return res.json(newPost);
  } else {
    return res.status(STATUS_USER_ERROR).json({
      error: 'No se recibieron los parámetros necesarios para crear el Post',
    });
  }
});

//3 GET

server.get('/posts', (req, res) => {
  const term = req.query.term;
  if (term) {
    const result = posts.filter(post => post.title.includes(term) || post.contents.includes(term));
    return res.json(result);
  } else {
    return res.json(posts);
  }
});
//4 GET

server.get('/posts/:author', (req, res) => {
  const author = req.params.author;
  const result = posts.filter(post => post.author === author);
    
  if(result.length > 0){
    res.json(result);
  }else{
    res.status(STATUS_USER_ERROR).json({ error: "No existe ningun post del autor indicado" });
  }
  
});

//5 GET
server.get('/posts/:author/:title', (req, res) => {
  const author = req.params.author;
  const title = req.params.title;
  const result = posts.filter(post => post.author === author && post.title === title);
    
  if(result.length > 0){
    res.json(result);
  }else{
    res.status(STATUS_USER_ERROR).json({error: "No existe ningun post con dicho titulo y autor indicado"});
  }
  
});

//6 PUT

//7 DELETE

server.delete('/posts', (req, res) => {
  let id = req.body.id;

  if(id !== posts.id){
    res.status(STATUS_USER_ERROR).json({error: "Mensaje de error"});
  }
  
  if(id){
    const pos = posts.indexOf(id);
    let nuevoArray = posts.splice(pos,1);
    posts = nuevoArray;
    return res.json({success : true});
  }else{
      return res.status(STATUS_USER_ERROR).json({error: "Mensaje de error"});
  }
});


//8 DELETE





module.exports = { posts, server };
