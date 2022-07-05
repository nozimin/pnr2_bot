module.exports = {
	data: {
    name: "ping",
    description: "Pong!を返すよ",
    options: [
      {
        type: "STRING",
        name: "language",
        description: "どの言語で挨拶するか指定します。",
        required: true,
        choices: [
          {
            name: "English",
            value: "en"
          },
          {
            name: "Japanese",
            value: "ja"
          }
        ],
      }
    ]
  },
	async execute(interaction) {
    let lang = interaction.options.getString('language')
		await interaction.reply(lang === 'en' ? 'Pong!' : 'ぽ〜ん（笑）');
	}
}
