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
  getPostUnselectedQuestionList,
  getPostQuestion,
  addPostQuestion,
  updatePostQuestion,
  getPostReviewList,
  getPostReview,
  addPostReview,
  updatePostReview,
  getPostAnswerList,
  addPostAnswer,
  getPostAnswer,
  updatePostAnswer,
  selectPostAnswer,
  checkSelected,
  getWriteUser,
  getPostSelected,
  updatePostView,
  likePost
} from '../controllers/post.controller'

import { addOne } from '../controllers/comment.controller'

import refMap from '@middle/referenceMap'
import { hasPost } from '@middle/ownable'
import { isLoggedIn } from '@middle/auth'

const router = Router()

// plaza
router.get('/plaza', getPostPlazaList)
router.get('/plaza/:postId', isLoggedIn, getPostPlaza)
router.post('/plaza', isLoggedIn, addPostPlaza)
router.put('/plaza/:postId', isLoggedIn, hasPost, updatePostPlaza)

// Question
router.get('/question/unselected', getPostUnselectedQuestionList)
router.get('/question', getPostQuestionList)
router.get('/question/:postId', isLoggedIn, getPostQuestion)
router.get('/question/getSelected/:postId_Q', isLoggedIn, getPostSelected)
router.post('/question', isLoggedIn, addPostQuestion)
router.put('/question/:postId', isLoggedIn, hasPost, updatePostQuestion)
router.put('/question/:postId', isLoggedIn, updatePostQuestion)

// Answer
router.get('/answer/:postId',isLoggedIn,getPostAnswer)
router.get('/answer',isLoggedIn,getPostAnswerList)
router.get('/answer/isSelected/:postId_Q', isLoggedIn, checkSelected)
router.post('/answer/:postId',isLoggedIn,addPostAnswer)
router.put('/answer/:postId',isLoggedIn, hasPost, updatePostAnswer)
router.put('/answer/select/:postId',isLoggedIn, selectPostAnswer)


// reveiw
router.get('/review', getPostReviewList)
router.get('/review/:postId', isLoggedIn, getPostReview)
router.post('/review', isLoggedIn, addPostReview)
router.put('/review/:postId', isLoggedIn, hasPost, updatePostReview)

// post general
router.get('/', getPostList)
router.get('/:postId', isLoggedIn, getPost)
router.get('/getUser/:postId', isLoggedIn, getWriteUser)
router.post('/', isLoggedIn, addPost)
router.post('/like/:postId', likePost)
router.delete('/:postId', isLoggedIn, hasPost, deletePost)
router.put('/:postId', isLoggedIn, hasPost, updatePost)
router.put('/view/:postId', isLoggedIn, updatePostView)

// POST /post/140/comment
router.post('/:postId/comment', refMap, addOne)

export default router
