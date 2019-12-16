const express = require('express');

const router = express.Router();

const db = require('../data/helpers/projectModel.js')


//GET
router.get('/', (req, res) => {
  
    db.get()
        .then(response => {
          res.status(200).json(response)
        })
        .catch(err => {
          res.status(500).json({message: "The list of projects could not be retrieved."})
        })
  
  });


//POST
router.post('/', (req, res) => {
  
    const { name, description } = req.body

    if(!name || !description){
        return res.status(400).json({"error": "Please provide a name / description for the project"})
    }

    db.insert(req.body)
      .then(response => {
        res.status(201).json(response)
      })
      .catch(err => {
        res.status(500).json({message: "There was an error while saving the project to the database"})
      })
  
  
});




//GET Project by ID
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



//GET Actions by Project ID
router.get('/:id/actions', (req, res) => {
  
    db.getProjectActions(req.params.id)
        .then(response => {
  
          
          if(response.length != 0){
              res.status(200).json(response)
          }else{
              res.status(404).json({message: "The actions with the specified project ID does not exist." })
          }
          
        })
        .catch(err => {
          res.status(500).json({error: "The actions with the specified project ID could not be retrieved." })
        })
  
  });


//Update/Patch
router.put('/:id', (req, res) => {
  
    const id = req.params.id
  
      const { name, description, completed }  = req.body
  
      
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
                res.status(201).json(response)
            }else{
                res.status(304).json({message: "There was a problem deleting the project." })
            }
            
        })
        .catch(err => {
            res.status(500).json({error: "There was an error removing the project." })
        })

});



//custom middleware



module.exports = router;
