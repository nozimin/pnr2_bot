const axios = require('axios')
const { MessageEmbed } = require('discord.js');
const gas = require('../services/gas.js')
const stats = require('../services/stats.js')

module.exports = {
  data: {
    name: 'rating',
    description: 'PNRユーザのレーティングを返すよ',
    options: [
      {
        type: 'STRING',
        name: 'pnr_user_id',
        description: 'PNRユーザーID',
        required: true
      }
    ],
  },
  async execute(interaction) {
    const gas_command = 'get_user_rating'
    const options = {
      pnr_name: interaction.options.getString('pnr_user_id'),
    }
    // 3秒以上遅れることを考慮
    await interaction.deferReply({ ephemeral: true })
    // GASにデータ送信・結果をdiscordに返却
    await gas.sendGAS(interaction, gas_command, options).then(async (response) => {
      const data = response.data

      // resultがfalseならエラーレスポンスを返す
      if (data.result === false) {
        let content = `エラー: ${data.message}`
        return await interaction.editReply({ content: content, ephemeral: true })
      }

      const message = stats.createStatsMessage(data.latest.stats, data.one_week_ago.stats)

      const embed = new MessageEmbed()
        .setColor('#ffffff')
        .setTitle(`${data.latest.user_name} のレーティング`)
        .setDescription(message)
        .setTimestamp()

      await interaction.editReply({ embeds: [embed], ephemeral: true })
    })
  },
}
