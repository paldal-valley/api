import { Router } from 'express'
import {
  getPost,
  getPostList,
  addPost,
  updatePost,
  deletePost,
  getPostPlaza,
  getPostPlazaList,
  addPostPlaza,
  updatePostPlaza,
  getPostQuestionList,
  getPostQuestion,
  addPostQuestion,
  updatePostQuestion,
  getPostReviewList,
  getPostReview,
  addPostReview,
  updatePostReview,
} from '../controllers/posts.controller'
import { isLoggedIn, emailDupCheck } from '@middle/auth'

const router = Router()

// plaza
router.get('/plaza', getPostPlazaList)
router.get('/plaza/:postId', isLoggedIn, getPostPlaza)
router.post('/plaza', isLoggedIn, addPostPlaza)
router.put('/plaza/:postId', isLoggedIn, updatePostPlaza)

// Question
router.get('/question', getPostQuestionList)
router.get('/question/:postId', isLoggedIn, getPostQuestion)
router.post('/question', isLoggedIn, addPostQuestion)
router.put('/question/:postId', isLoggedIn, updatePostQuestion)

// reveiw
router.get('/review', getPostReviewList)
router.get('/review/:postId', isLoggedIn, getPostReview)
router.post('/review', isLoggedIn, addPostReview)
router.put('/review/:postId', isLoggedIn, updatePostReview)

// post general
router.get('/', getPostList)
router.get('/:postId', isLoggedIn, getPost)
router.post('/', isLoggedIn, addPost)
router.delete('/:postId', isLoggedIn, deletePost)
router.put('/:postId', isLoggedIn, updatePost)

export default router
