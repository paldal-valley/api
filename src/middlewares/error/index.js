import slackWebhook from '@utils/slack-webhook'

export default (err, req, res, next) => {

  if (process.env.NODE_ENV === 'production') {
    console.error(`Controller Error: ${err}`)

    slackWebhook({
      channel: '#error_monitoring',
      text: err.message
    })
  } else {
    console.error(err)
  }

  return res.status(err.status || 500).json({
    success: false,
    msg: err.message || 'Internal Server Error',
    code: err.code || 0
  })
}
