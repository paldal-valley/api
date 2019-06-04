import PostPlazaType from '@dao/static_posts_plazas_types'
import PostQuestionType from '@dao/static_posts_questions_types'
import PostReviewType from '@dao/static_posts_reviews_types'
import MajorType from '@dao/static_majors'

const getStatics = async (req, res, next) => {
  try {
    const promises = [
      PostPlazaType.getList(),
      PostQuestionType.getList(),
      PostReviewType.getList(),
      MajorType.getList()
    ]

    const [
      postPlazaTypes,
      postQuestionTypes,
      postReviewTypes,
      majorTypes
    ] = await Promise.all(promises)

    return res.status(200).json({
      postPlazaTypes,
      postQuestionTypes,
      postReviewTypes,
      majorTypes
    })
  } catch (err) {
    return next(err)
  }
}

export {
  getStatics
}
