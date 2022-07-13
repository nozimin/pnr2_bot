const Discord = require('discord.js')

module.exports = {
  sendLog(message, webhook_url) {
    if (!message.content && !message.attachments) return

    const regexp = /(.|[\r\n]){1,1980}/g
    const contents = message.content ? message.content.match(regexp) : []

    let contents_embed = contents.map(content => {
      return new Discord.MessageEmbed()
        .setColor(get_color(message.author))
        .setDescription(content)
        .setAuthor({
          name: get_author_name(message.author),
          iconURL: message.author.displayAvatarURL()
        })
        .setFooter({text: get_channel_name(message.channel)})
        .setURL(message.url)
        .setTimestamp()
    })
    let image_embed = message.attachments.map(attachment => {
      return new Discord.MessageEmbed()
        .setColor(get_color(message.author))
        .setAuthor({
          name: get_author_name(message.author),
          iconURL: message.author.displayAvatarURL()
        })
        .setFooter({text: get_channel_name(message.channel)})
        .setImage(attachment.proxyURL)
        .setTimestamp()
    })

    // 送信
    const Webhook = new Discord.WebhookClient({ url: webhook_url })
    Webhook.send({embeds: [...contents_embed, ...image_embed]})
  }
}

function get_color(author) {
  return author.accentColor || '#2c2f33'
}

function get_author_name(author) {
  return `${author.username}#${author.discriminator}`
}

function get_channel_name(channel) {
  return `${channel.guild.name}#${channel.name}`
}
