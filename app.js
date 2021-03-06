let express = require('express');
let knex = require('knex');

let app = express();
app.get('/api/genres', function(request, response){
  let connection = knex({
    client: 'sqlite3',
    connection:{
      filename: 'chinook.db'
    }
  });
  connection.select().from('genres').then((genres)=>{
    response.json(genres);
  });
});

app.get('/api/genres/:id', function(request, response){
  let id = request.params.id; //get request from url :/id
  console.log(id);
  let connection = knex({
    client: 'sqlite3',
    connection:{
      filename: 'chinook.db'
    }
  });
  connection
    .select()
    .from('genres')
    .where('GenreId', id)
    .first()
    .then((genre)=>{
      if(genre){
        response.json(genre)
      }else{
        response.status(404).json({
          error: `Genre ${id} not found`
        });
      }
    //response.json(genre);
  });
});
app.listen(process.env.PORT || 8000);
//
// return new Promise((resolve, reject) =>{
//   resolve(genres)
// })
