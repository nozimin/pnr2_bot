const Discord = require('discord.js')
const Webhook = new Discord.WebhookClient({url: process.env.discord_webhook_url})

module.exports = {
  sendLog(message) {
    message.author.displayAvatarURL()
    const contents = message.content.match(/(.|[\r\n]){1,1980}/g)
    if (!contents) return
    contents.forEach(content => {
      var embed = new Discord.MessageEmbed()
                        .setColor(message.author.accentColor || '#2c2f33')
                        .setDescription(content)
                        .setAuthor({
                          name: `${message.author.username}#${message.author.discriminator}`,
                          iconURL: message.author.displayAvatarURL()
                        })
                        .setFooter({text: `${message.guild.name}#${message.channel.name}`})
                        .setURL(message.url)
                        .setTimestamp()
      // 画像があるならそれも追加
      if(message.attachments) { message.attachments.forEach(att => embed.setImage(att.proxyURL)) }
      // 送信
      Webhook.send({embeds: [embed]})
    })
  }
}
