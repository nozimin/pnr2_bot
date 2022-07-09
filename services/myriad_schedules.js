const { Client, Intents } = require('discord.js')
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
})

const setting = require('../config/settings')

const MYRIAD_RACE = {
  'TUE': '18:00',
  'THU': '20:00',
  'SAT': '20:30',
  'SUN': '21:30'
}

// const MYRIAD_JP_GAME = [
//   '20:00 MON',
//   '21:00 WED',
//   '22:00 FRI',
//   '20:00 SAT',
//   '21:00 SUN'
// ]

module.exports = {
  sendSchedule() {
    const now = new Date()
    const now_of_week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][now.getDay()]
    const myriad_race_started_at = MYRIAD_RACE[now_of_week]

    client.login(process.env.DISCORD_BOT_TOKEN).then(() => {
      client.guilds.fetch(setting.env.poll.guild_id).then(guild => {
        guild.channels.fetch(setting.env.poll.channel_id).then(channel => {
          channel.send(myriadRaceMessage(now_of_week, myriad_race_started_at))
        })
      })
    })
  }
}

function myriadRaceMessage(day_of_week, started_at) {
  return `本日のレース開始時刻は **${started_at}** です。\n開始10分前にはエリアに着席するようにしましょう`
}
