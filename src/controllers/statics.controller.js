import PostPlazaType from '@dao/static_posts_plazas_types'
import PostQnaType from '@dao/static_posts_qna_types'

const getStatics = async (req, res, next) => {
  try {
    const promises = [
      PostPlazaType.getList(),
      PostQnaType.getList()
    ]

    const [ postPlazaTypes, postQnaTypes ] = await Promise.all(promises)

    return res.status(200).json({
      postPlazaTypes,
      postQnaTypes
    })
  } catch (err) {
    return next(err)
  }
}

export {
  getStatics
}
