const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];

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

server.post('/posts', (req,res) => {
  const {author, title , contents} = req.body;
  if(author && title && contents){
    const newPost= {
      id: newId(),
      author,
      title,
      contents,
    };
    posts.push(newPost);
    return res.json(newPost);
  }else{
    return res.status(STATUS_USER_ERROR).json({
      error: 'No se recibieron los parámetros necesarios para crear el Post',
    });
  }
});

//2
server.post('/posts/author/:author', (req,res) => {
  const author = req.params.author;
  const {title , contents} = req.body;
  if(author && title && contents){
    const newPost= {
      id: newId(),
      author,
      title,
      contents,
    };
    posts.push(newPost);
    return res.json(newPost);
  }else{
    return res.status(STATUS_USER_ERROR).json({
      error: 'No se recibieron los parámetros necesarios para crear el Post',
    });
  }
});

//3
server.delete('/posts', (req,res) => {
  const {id} = req.body;
  if(id){
    posts.splice(id, 1);
    return res.json({sucess: true});
  }else{
    return res.json({
      error: "Mensaje de error"
    });
  }

});

module.exports = { posts, server };
