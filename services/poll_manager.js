const {
  Client, Intents, MessageActionRow, MessageButton, MessageEmbed
} = require('discord.js')
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
})

const setting = require('../config/settings')
const button_data = [...setting.myriad_race.buttons, setting.myriad_race.reset]

module.exports = {
  async sendPoll() { // 毎週火木土日 PM12:00 に実行
    client.login(process.env.DISCORD_BOT_TOKEN).then(() => {
      client.guilds.fetch(setting.env.poll.guild_id).then(guild => {
        guild.channels.fetch(setting.env.poll.channel_id).then(channel => channel.send(pollMessage()))
      })
    })
  },
  async updatePoll(interaction) { // メッセージボタンで発火
    let game_mode = button_data.filter(g => g.custom_id === interaction.customId)[0]
    // Embedを更新。ボタンをおしたユーザーを追加
    embed = updateEmbed(interaction.message.embeds[0], interaction.member, game_mode)

    interaction.update({ embeds: [embed] })
  }
}

function pollMessage() {
  return {
    content: `${role_mention(setting.env.poll.mention_role_id)}\nレース希望確認`,
    embeds: [createEmbed()],
    components: createButtonComponents(button_data)
  }
}

// ゲームモードボタンを作成
function createButtonComponents(button_data = []) {
  let game_buttons = button_data.map(game => {
    return new MessageButton().setCustomId(game.custom_id)
      .setLabel(game.name)
      .setStyle(game.style)
      .setDisabled(game.disabled)
  })

  const slice_number = 5
  const length = Math.ceil(game_buttons.length / slice_number)
  return new Array(length).fill().map((_, i) => {
    return new MessageActionRow().addComponents(
      game_buttons.slice(i * slice_number, (i + 1) * slice_number)
    )
  })
}

// Embedを作成
function createEmbed() {
  return new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('参加状況')
    .setDescription('↓ゲームごとに参加者が表示されます')
}

function updateEmbed(embed, member, target_game_mode) {
  // RESET選択時 参加中のゲームから対象メンバーを抜く
  if (target_game_mode.name === setting.myriad_race.reset.name) {
    embed.fields = embed.fields.map(f => {
      if (f.value.includes(member.id)) {
        f.value = f.value.split('\n').filter(m => m !== user_mention(member.id)).join('\n')
      }
      if (f.value === '') return null
      return f
    }).filter(v => v)
    return new MessageEmbed(embed)
  }

  let joinned_game = embed.fields.filter(f => f.value.includes(user_mention(member.id)))
  // 選択したゲームにすでにユーザが参加表明中なら対象メンバーを抜く
  if (joinned_game.filter(f => f.name === target_game_mode.name).length !== 0) {
    embed.fields = embed.fields.map(f => {
      if (f.name === target_game_mode.name) {
        f.value = f.value.split('\n').filter(m => m !== user_mention(member.id)).join('\n')
      }
      if (f.value === '') return null
      return f
    }).filter(v => v)
  } else {
    // 対象ゲームがまだないなら作成
    if (!embed.fields.map(f => f.name).includes(target_game_mode.name)) {
      embed.fields.push({ name: target_game_mode.name, value: '' })
    }
    // 対象ゲームにメンバーを参加
    embed.fields = embed.fields.map(f => {
      if (f.name === target_game_mode.name) {
        let mentions = f.value.split('\n')
        mentions.push(user_mention(member.id))
        f.value = mentions.join('\n')
      }
      return f
    })
  }
  return new MessageEmbed(embed)
}

function user_mention(user_id) {
  return `<@${user_id}>`
}

function role_mention(role_id) {
  return `<@&${role_id}>`
}
