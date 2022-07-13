const fs = require('fs')
const { Client, Intents } = require('discord.js')
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
})

const setting = require('./config/settings')
const button_data = [...setting.myriad_race.buttons, setting.myriad_race.reset]
const discord_notifer = require('./services/discord_notifer')
const { cronTask } = require('./services/cron_task')
const { updatePoll } = require('./services/poll_manager')

client.on('messageCreate', async message => {
  if(message.author.bot) return

  discord_notifer.sendLog(message,  process.env.DISCORD_WEBHOOK_URL)
})

const commandFiles = fs
  .readdirSync('./commands')
  .filter(file => file.endsWith('.js'))
const commands = {}
for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  commands[command.data.name] = command
}

client.once('ready', async () => {
  const data = []
  for (const commandName in commands) {
    data.push(commands[commandName].data)
  }
  const DEV_SERVER_ID = '963806755538739290'
  await client.application.commands.set(data)
  console.log(`${client.user.tag} I'm in`)

  // 定期実行
  cronTask()
})

client.on('interactionCreate', async interaction => {
  // slash command
  if (interaction.isCommand()) {
    const command = commands[interaction.commandName]
    try {
      await command.execute(interaction)
    } catch (error) {
      console.error(error)
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      })
    }
  }

  // button
  if (interaction.isButton()) {
    if (button_data.map(game_mode => game_mode.custom_id).includes(interaction.customId)) {
      await updatePoll(interaction)
    }
  }
})

client.login(process.env.DISCORD_BOT_TOKEN)
