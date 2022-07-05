const axios = require('axios')

module.exports = {
  async sendGAS(interaction, command = '', options = {}) {
    const jsonData = {
      command: command,
      options: options,
    }
    return await axios({
      method: "post",
      url: process.env.GAS_URL,
      data: jsonData,
      responseType: "json",
    })
  }
}
