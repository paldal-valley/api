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
  getPostAnswer,
  updatePostAnswer,
  selectPostAnswer,
  checkSelected,
  getWriteUser,
  updatePostView,
  likePost
} from '../controllers/post.controller'

import { addOne } from '../controllers/comment.controller'

import refMap from '@middle/referenceMap'
import { hasPost } from '@middle/ownable'
import { isLoggedIn } from '@middle/auth'

const router = Router()

// plaza
router.get('/plaza', isLoggedIn, getPostPlazaList)
router.get('/plaza/:postId', isLoggedIn, getPostPlaza)
router.post('/plaza', isLoggedIn, addPostPlaza)
router.put('/plaza/:postId', isLoggedIn, hasPost, updatePostPlaza)

// Question
router.get('/question', getPostQuestionList)
router.get('/question/:postId', isLoggedIn, getPostQuestion)
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


// comments -> get and add 제외하고 update, delete 할 떄는 comment 라우터에서 처리
// why -> client 측에서 사용하기 편하기 위함
// POST /comment 일 경우 client 측에서 body에
// key를 refId로, value를 postId로 담아 보내야하는 불편함 존재

// POST /post/140/comment
router.post('/:postId/comment', refMap, addOne)

export default router
