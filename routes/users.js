const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const collection = 'movies'
const client = require('../database/client')

/* CRUD READ. */
router.get('/users', async function(req, res, next) {
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

  if (User.hasOwnProperty('name') && user.name !== '' && user.name !== null) {
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
router.put('/collection/:movie' , async function(req, res, next) {
  const movie = req.params.movie
  const replacementObject = req.body

  await client.connect()
  const db = client.db(process.env.MONGODB_DB_NAME)

  if (replacementObject.hasOwnProperty('name') && replacementObject.name !== '' && replacementObject.name !== null) {
    const reult = await db.collection(collection). replaceOne({_id: ObjectId.createFromHexString(movies)}, replacementObject)

    if (result.insertedCount === 1) {
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
router.delete("/:collection/", function(request, response) {
  const collection = request.params.collection;
 
  request.db.get('movies').remove({'movies': collection}, function(error, document) {
   if (error) response.send(error);
   return response.send("deleted");
  });
})
module.exports = router
