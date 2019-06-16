import Slack from 'slack-node'

const webhookUri = process.env.SLACK_WEBHOOK_URI
const slack = new Slack()

slack.setWebhook(webhookUri)

export default ({ channel, text }) => {
  const hookOptions = {
    username: 'webhookbot',
    channel,
    text
  }

  slack.webhook(hookOptions, (err, res) => {
    if (err) {
      console.error(`SLACK WEBHOOK ERROR: ${err}`)
    } else {
      console.log(`SLACK WEBHOOK LOG`)
      console.log(res)
    }
  })
}
