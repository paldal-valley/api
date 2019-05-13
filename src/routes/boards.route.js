import { Router } from 'express'
import { add, index } from '../controllers/boards.controller'
import { connection } from '../models/connection'

const router = Router()

router.post('/', add)

router.get('/', index)

// router.post('/qna',function(req,res){
//     res.send("Hello")
//     console.log("hello")
// });
const sql = 'SELECT * FROM sandbox.static_majors'
router.post('/qna',function(req,res){
    res.send("Hello2")
    console.log("hello22")
})

router.get('/boards',function(req,res){
    //res.send('Get request')
})


export default router
