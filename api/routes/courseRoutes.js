'use strict';

const express = require('express');
const { authenticateUser } = require('../middleware/auth-user');
const { User, Course } = require('../models');

// Construct a router instance.
const router = express.Router();

function asyncHandler (cb) {
    return async (req, res, next) => {
      try {
        await cb(req, res, next);
      } catch (error) {
        next(error);
      }
    }
}
//router.use((req,res) => {return res.status(500).json({});} ) 

// Route that returns a list of courses.
router.get('/', asyncHandler(async(req,res)=>{
    const courses = await Course.findAll({
        include:[{
            model:User,
            attributes:{
                exclude:["createdAt","updatedAt","password"]
            }
        }],
        attributes:{
            exclude:["createdAt","updatedAt"]
        }
    });
    res.status(200).json(courses)
}))
  

//GET specific course
router.get('/:id', asyncHandler(async(req, res, next) => {
    const course = await Course.findByPk(
        req.params.id, 
        {include:[{
            model:User,
            attributes:{
                exclude:["createdAt","updatedAt","password"]
            }
        }],
        attributes:{
            exclude:["createdAt","updatedAt"]
        }}
    );
    if (course){
        res.status(200).json(course);
    } else {
        const error= new Error();
        error.message="Not Found";
        error.status=404;
        throw error
    }
}));

// Route that creates a new course.
router.post('/', authenticateUser,asyncHandler(async (req, res) => {
   
try { 
    const course = await Course.create(req.body);
    if(course.userId == req.currentUser.id) {
        res.status(201).location('/api/courses/'+ course.id ).end();
    } else{
        res.status(401).end();
    }
} catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        const errors = error.errors.map(err => err.message);
        res.status(400).json({ errors });   
    } else {
        throw error;
    }
}
}));


//Update specific course
router.put('/:id', authenticateUser, asyncHandler(async (req, res) => {
    let course;
    let body;
    let userId=req.currentUser.id
    try {
        body = req.body;
        console.log(body)
        course= await Course.findByPk(req.params.id);
        if(course && body) {
            if(userId ==course.userId){
                if(course.userId === body.userId){
                   await Course.update(body, {where:{id: req.params.id}});
                res.status(204).end(); 
                } else{
                    console.log('Course ownership cannot be passed to another user.')
                    res.status(403).end();
                }
            } else {
                res.status(403).end();
            }
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        if(error.name === "SequelizeValidationError") {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({ errors }); 
        } else {
            throw error;
        }
    }
}));

//Delete specific course
router.delete('/:id', authenticateUser, asyncHandler(async (req, res) => {
    let course;
    let userId = req.currentUser.id;
    try {
        course = await Course.findByPk(req.params.id);
        if(course) {
            if(userId == course.userId){
                await course.destroy();
                res.status(204).end(); 
            } else {
                res.status(403).end()
            }
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        if(error.name === "SequelizeValidationError") {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({ errors }); 
        } else {
            throw error;
        }
    }
}));
  
module.exports = router;