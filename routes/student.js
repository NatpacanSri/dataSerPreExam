const express = require('express');
const router = express()
const Student = require('../models/Student')


router.get('/',(req,res,next)=>{
    Student.find()
    .then((result)=>{
        // res.send(result)
        res.render('student',{student:result})
    })
    .catch((err)=>{
        console.log(err)
    })
    
})

router.get('/portfolio',(req,res,next)=>{
    const port =  { name:  'Natpacan Sribanhad',
                    contact: { email: 'natpacan.s@kkumail.com', linkedin: 'https://www.linkedin.com/in/natpacan-sri/' } 
    }
    res.render('portfolio',{port})
})

router.get('/resume',(req,res,next)=>{
    const port =  { name:  'Natpacan Sribanhad',
                    contact: { email: 'natpacan.s@kkumail.com', linkedin: 'https://www.linkedin.com/in/natpacan-sri/' } 
    }
    res.render('resume',{port})
})

router.get('/addstdpage',(req,res,next)=>{
    res.render('addStd')
})

router.get('/insert', async (req,res,next)=>{
    const data = new Student({
        stdID: "555",
        name: "john",
        year:"3",
        email:"email@email.com",
    })
    data.save()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    })
})

// router.get('/allStd',(req,res)=>{
//     Student.find()
//     .then((result)=>{
//         res.send(result)
//     })
//     .catch((err)=>{
//         console.log(err)
//     })
// })

router.post('/insertStd',(req, res)=>{
    const data = new Student(req.body)

    data.save()
    .then((result)=>{
        res.redirect('/student')
    })
    .catch((err)=>{
        console.log(err)
    })
})

router.get('/delete', async (req, res) => {
    try {
        const studentId = req.query.id; // Get the student ID from query parameter

        // Find the student by ID and remove it from the database
        const deletedStudent = await Student.findByIdAndRemove(studentId);

        if (!deletedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.redirect('/student')
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({ error: 'Error deleting student' });
    }
})

router.get('/editPage/:id', async (req,res)=>{
    try {
        const id = req.params.id

        const student = await Student.findById(id)
        res.render('editStd',{student})
    } catch (err) {
        console.error(err)
    }
})

router.post('/edit', async (req,res) => {
    try {
        const id = req.query.id
        const edit = await Student.findByIdAndUpdate(id,{
            $set:{
                stdID:req.body.stdID,
                name:req.body.name,
                year:req.body.year,
                email:req.body.email
            }
        })
        if (!edit) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.redirect('/student')
    } catch (err) {
        console.error(err)
    }
})


module.exports = router