import Comment from '@dao/comments'

const addOne = async (req, res, next) => {
  try {
    const { body: payload } = req
    const { refId, refType } = req.params

    payload.refId = refId
    payload.refType = refType
    await Comment.addOne(payload)
    res.status(200).json({ success: true })
  } catch (err) {
    next(err)
  }
}

const updateOne = async (req, res, next) => {
  try {
    const { body: payload } = req
    const { commentId } = req.params

    await Comment.updateOne(commentId, payload)
    res.status(200).json({ success: true })
  } catch (err) {
    next(err)
  }
}

const deleteOne = async (req, res, next) => {
  try {
    const { commentId } = req.params

    await Comment.deleteOne(commentId)
    res.status(200).json({ success: true })
  } catch (err) {
    next(err)
  }
}

export {
  addOne,
  updateOne,
  deleteOne
}
