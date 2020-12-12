const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const collection = 'movie-info'
const client = require('../database/client')

/* CRUD READ. */
router.get('/movies', async function(req, res, next) {
  await client.connect()
  const db = client.db(process.env.MONGODB_DB_NAME)

  const results = await db.collection(collection).find({}).toArray()
  res.json(results)
});
//CRUD create
router.post('/new' , async function(req, res, next) {
  await client.connect()
  const db = client.db(process.env.MONGODB_DB_NAME)

  const movie = req.body

  if (movie.hasOwnProperty('name') && movie.name !== '' && movie.name !== null) {
    const result = await db.collection(collection).insertOne(movie)
    if (result.insertedCount === 1) {
      res.status(202)
      res.send('successfully inserted user object into movies collection')
      
      return
    }
    res.status(500)
    res.send('Unable to insert movie object in to movie collection')

    return
  }
  res.status(400)
  res.send('Validation failed, bad request. Check request body and try again')
})

//CRUD Update
router.put('/movies/:movieId' , async function(req, res, next) {
  const movieId = req.params.movieId
  const replacementObject = req.body

  await client.connect()
  const db = client.db(process.env.MONGODB_DB_NAME)

  if (replacementObject.hasOwnProperty('name') && replacementObject.name !== '' && replacementObject.name !== null) {
    const result = await db.collection(collection). replaceOne({_id: ObjectId.createFromHexString(movieId)}, replacementObject)

    if (result.modifiedCount === 1) {
      res.status(202)
      res.send('Successfully replaced user object with updated movie')

      return
    }

    res.status(500)
    res.send('Unable to replace movie object into Movie collection')
    
    return
  }

  res.status(400)
  res.send('Validation failed, bad request. Check request body and try again.')

})
//CRUD delete
router.delete('/movies/delete/:movieId',async function(req, response) {
  const movieId = req.params.movieId
  await client.connect()
  const db = client.db(process.env.MONGODB_DB_NAME)

  db.collection(collection).deleteOne({_id: ObjectId.createFromHexString(movieId)}, function(error, document) {
   if (error) response.send(error);
   return response.send(document);
  });
})
// router.delete('/movies/delete/:movieId' , async function(req, res, next) {
//   const movieId = req.params.movieId
  
//   await client.connect()
//   const db = client.db(process.env.MONGODB_DB_NAME)

//  // if (replacementObject.hasOwnProperty('name') && replacementObject.name !== '' && replacementObject.name !== null) {
//     const result = await db.collection(collection). replaceOne({_id: ObjectId.createFromHexString(movieId)}, replacementObject)

//     if (result.modifiedCount === 1) {
//       res.status(202)
//       res.send('Successfully replaced user object with updated movie')

//       return
//     }

//     res.status(500)
//     res.send('Unable to replace movie object into Movie collection')
    
//     return
//   }

//   res.status(400)
//   res.send('Validation failed, bad request. Check request body and try again.')

// })
module.exports = router
