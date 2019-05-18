import PostPlaza from '@dao/posts_plazas'

const getPostPlazaList = async (req, res, next) => {
  try {
    const result = await PostPlaza.getList()
    return res.status(200).json(result)
  } catch (err) {
    return next(err)
  }
}

export {
  getPostPlazaList
}
