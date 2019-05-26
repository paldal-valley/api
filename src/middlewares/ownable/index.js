import Post from '@dao/posts'

const hasPost = async (req, res, next) => {
  const post = await Post.getOne(req.params.postId)
  if (post.userId !== req.me.id) next(Error('Cannot delete or update post of others'))
  else next()
}

export { hasPost }
