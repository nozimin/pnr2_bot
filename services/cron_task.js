const cron = require('node-cron')
const { sendPoll } = require('./poll_manager')
const { sendSchedule } = require('./myriad_schedules')

const PER_NOON = '0 0 3 * * SUN,TUE,THU,SAT' // 12:00 UTC+09:00
const PER_THREE_PM = '0 0 6 * * SUN,TUE,THU,SAT' // 15:00 UTC+09:00
const PER_TMP = '*/10  * * * * SUN,TUE,THU,SAT'

module.exports = {
  cronTask() {
    cron.schedule(PER_NOON, () => sendPoll())
    cron.schedule(PER_THREE_PM, () => sendSchedule())
    // cron.schedule(PER_TMP, () => console.log(new Date()))
  }
}
