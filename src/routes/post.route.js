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
  getPostAnswerList,
  addPostAnswer,
} from '../controllers/post.controller'

import { hasPost } from '@middle/ownable'
import { isLoggedIn } from '@middle/auth'

const router = Router()

// plaza
router.get('/plaza', getPostPlazaList)
router.get('/plaza/:postId', isLoggedIn, getPostPlaza)
router.post('/plaza', isLoggedIn, addPostPlaza)
router.put('/plaza/:postId', isLoggedIn, hasPost, updatePostPlaza)

// Question
router.get('/question', getPostQuestionList)
router.get('/question/:postId', isLoggedIn, getPostQuestion)
router.post('/question', isLoggedIn, addPostQuestion)
router.put('/question/:postId', isLoggedIn, hasPost, updatePostQuestion)

// Answer
router.get('/answer/:postId',isLoggedIn,getPostAnswerList)
//router.post('/answer/:postId',isLoggedIn,addPostAnswer)
router.post('/answer/:postId',isLoggedIn,addPostAnswer)

// reveiw
router.get('/review', getPostReviewList)
router.get('/review/:postId', isLoggedIn, getPostReview)
router.post('/review', isLoggedIn, addPostReview)
router.put('/review/:postId', isLoggedIn, hasPost, updatePostReview)

// post general
router.get('/', getPostList)
router.get('/:postId', isLoggedIn, getPost)
router.post('/', isLoggedIn, addPost)
router.delete('/:postId', isLoggedIn, hasPost, deletePost)
router.put('/:postId', isLoggedIn, hasPost, updatePost)

export default router
