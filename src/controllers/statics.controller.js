import PostPlazaType from '@dao/static_posts_plazas_types'
import PostQnaType from '@dao/static_posts_qna_types'
import PostReviewType from '@dao/static_posts_reviews_types'

const getStatics = async (req, res, next) => {
  try {
    const promises = [
      PostPlazaType.getList(),
      PostQnaType.getList(),
      PostReviewType.getList()
    ]

    const [
      postPlazaTypes,
      postQnaTypes,
      postReviewTypes
    ] = await Promise.all(promises)

    return res.status(200).json({
      postPlazaTypes,
      postQnaTypes,
      postReviewTypes
    })
  } catch (err) {
    return next(err)
  }
}

export {
  getStatics
}
