import slackWebhook from '@utils/slack-webhook'

describe('TEST SLACK WEBHOOK', function () {
  it('send message to channel', function () {
    slackWebhook({
      channel: '#error_monitoring',
      text: 'hi'
    })
  })
})
