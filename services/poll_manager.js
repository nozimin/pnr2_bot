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

module.exports = {
  async sendPoll() { // 毎週火木土日 PM12:00 に実行
    client.login(process.env.DISCORD_BOT_TOKEN).then(() => {
      client.guilds.fetch(setting.env.poll.guild_id).then(guild => {
        guild.channels.fetch(setting.env.poll.channel_id).then(channel => channel.send(pollMessage()))
      })
    })
  },
  async updatePoll(interaction) { // メッセージボタンで発火
    game_mode = setting.pnr2.game_mode_list.filter(g => g.custom_id === interaction.customId)[0]
    // Embedを更新。ボタンをおしたユーザーを追加
    embed = updateEmbed(interaction.message.embeds[0], interaction.member, game_mode)

    interaction.update({ embeds: [embed] })
  }
}

function pollMessage() {
  return {
    content: `${role_mention(setting.env.poll.mention_role_id)}\nレース希望確認`,
    embeds: [createEmbed(setting.pnr2.game_mode_list)],
    components: createButtonComponents(setting.pnr2.game_mode_list)
  }
}

// ゲームモードボタンを作成
function createButtonComponents(games = []) {
  let game_buttons = games.map(game => {
    return new MessageButton().setCustomId(game.custom_id)
      .setLabel(game.name)
      .setStyle('PRIMARY')
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
function createEmbed(game_mode_list = []) {
  game_mode_fields = game_mode_list.map(game_mode => { return { name: game_mode.name, value: '' } })
  return new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('参加状況')
    .setDescription('↓ゲームごとに参加者が表示されます')
}

function updateEmbed(embed, member, target_game_mode) {
  let joinned_game = embed.fields.filter(f => f.value.includes(user_mention(member.id)))

  // 参加中のゲームから対象メンバーを抜く
  if (joinned_game !== []) {
    embed.fields = embed.fields.map(f => {
      if (f.value.includes(member.id)) {
        mentions = f.value.split('\n')
        f.value = mentions.filter(m => m !== user_mention(member.id)).join('\n')
      }
      if (f.value === '') return null
      return f
    }).filter(v => v)
  }

  // 抜いたゲームと対象ゲームが一致してるなら終了
  if (joinned_game.filter(g => g.name === target_game_mode.name).length !== 0) return new MessageEmbed(embed)

  // 対象ゲームがまだないなら作成
  if (!embed.fields.map(f => f.name).includes(target_game_mode.name)) {
    embed.fields.push({ name: target_game_mode.name, value: '' })
  }

  // 対象ゲームにメンバーを参加
  embed.fields = embed.fields.map(f => {
    if (f.name === target_game_mode.name) {
      mentions = f.value.split('\n')
      mentions.push(user_mention(member.id))
      f.value = mentions.join('\n')
    }
    return f
  })

  return new MessageEmbed(embed)
}

function user_mention(user_id) {
  return `<@${user_id}>`
}

function role_mention(role_id) {
  return `<@&${role_id}>`
}
