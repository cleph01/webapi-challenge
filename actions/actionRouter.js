const express = require('express');

const router = express.Router();

const db = require('../data/helpers/actionModel.js')



//GET
router.get('/', (req, res) => {
  
  db.get()
      .then(response => {
        res.status(200).json(response)
      })
      .catch(err => {
        res.status(500).json({message: "The list of actions could not be retrieved."})
      })

});


//POST
router.post('/', (req, res) => {

  const { description, notes, project_id } = req.body

  if(!notes || !description || !project_id){
      return res.status(400).json({"error": "Please provide a notes / description / project id for this action"})
  }

  db.insert(req.body)
    .then(response => {
      res.status(201).json(response)
    })
    .catch(err => {
      res.status(500).json({message: "There was an error while saving the action to the database"})
    })


});




//GET by ID
router.get('/:id', (req, res) => {

db.get(req.params.id)
    .then(response => {

      
      if(response != null){
          res.status(200).json(response)
      }else{
          res.status(404).json({message: "The project with the specified ID does not exist." })
      }
      
    })
    .catch(err => {
      res.status(500).json({error: "The project with the specified ID could not be retrieved." })
    })

});



//Update/Patch
router.put('/:id', (req, res) => {

  const id = req.params.id

    const { project_id, description, notes }  = req.body

    
  //   if (!name ){
  //       return res.status(400).json({ errorMessage: "Please provide a name for the user." })
  //     }

    
    db.update(id, req.body)
        .then(response => {

          if(response != null){
              res.status(201).json(response)
          }else{
              res.status(304).json({message: "There was a problem modifying the project." })
          }

        })
        .catch(err => {
            res.status(500).json({err })
        })

});


//Delete
router.delete('/:id', (req, res) => {

const id = req.params.id

      db.remove(id)
      .then(response => {

          if(response == 1){
              res.status(201).json({message: "Action successfully deleted." })
          }else{
              res.status(304).json({message: "There was a problem deleting the project." })
          }
          
      })
      .catch(err => {
          res.status(500).json({error: "There was an error removing the project." })
      })

});

//custom middleware

function validateProjectId(req, res, next) {

  try{

    const projectID = req.body.project_id

    let actions = ''

    db.get()
      .then( response => {

        actions = response

      })
      .catch( err => {

        res.status(500).json({error: "There was an error retrieving the list of actions." })

      })

    let count = 0

      //Loop actions response and find project Id Key
      actions.find( action => {

          if(projectID == action.project_id){
            count++
          }
      })

      //Move on if count is > 0 OR errror
      if(count > 0){

          next()

      }else{

          res.status(400).json({
            
            message: "invalid user project id"

          })
      }

    } catch( err) {

      next(err)

    }
}




module.exports = router;
