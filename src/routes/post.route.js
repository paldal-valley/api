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
const router = Router()

import { isLoggedIn } from '@middle/auth'

// plaza
router.get('/plaza', getPostPlazaList)
router.get('/plaza/:postId', getPostPlaza)
router.post('/plaza', addPostPlaza)
router.put('/plaza/:postId', updatePostPlaza)

// Question
router.get('/question', getPostQuestionList)
router.get('/question/:postId',getPostQuestion)
router.post('/question', addPostQuestion)
router.put('/question/:postId', updatePostQuestion)

// reveiw
router.get('/review', getPostReviewList)
router.get('/review/:postId', getPostReview)
router.post('/review', addPostReview)
router.put('/review/:postId', updatePostReview)

// post general
router.get('/', getPostList)
router.get('/:postId', getPost)
router.post('/', addPost)
router.delete('/:postId', deletePost)
router.put('/:postId', updatePost)

export default router
