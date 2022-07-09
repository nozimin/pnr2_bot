const cron = require('node-cron')

const PER_MINUTES = '0 * * * * *' // 毎分
const PER_NOON = '0 12 * * * *' // 毎分
const PER_TMP = '25 14 * * * *' // 毎分

module.exports = {
  cronTask() {
    console.log('hey')
    cron.schedule(PER_MINUTES, () => console.log('毎分実行'))
    cron.schedule(PER_NOON, () => sendPollMessage())
  }
}

function sendPollMessage() {
  console.log('PM 12:00に実行')
}
