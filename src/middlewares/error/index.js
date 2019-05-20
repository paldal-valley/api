const Slack = require('slack-node');
 
const webhookUri = "https://hooks.slack.com/services/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";
 
const slack = new Slack()
slack.setWebhook(webhookUri)
const send = async(message) => {
  slack.webhook({
    channel: "#error_monitoring", // 전송될 슬랙 채널
    username: "webhookbot", //슬랙에 표시될 이름
    text: message
  }, function(err, response) {
    console.log(response);
  });
}


export default (err, req, res, next) => {
  if (process.env.NODE_ENV === 'production') { 
    send(err.message)

    console.log('Middleware Error22')
  } else {
    console.error(err)
  }

  return res.status(err.status || 500).json({
    success: false,
    msg: err.message || 'Internal Server Error',
    code: err.code || 0
  })
}
