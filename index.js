require('dotenv').config()
const http = require('http')
const querystring = require('querystring')

http.createServer(function(req, res) {
  if (req.method == 'POST') {
    let post_data = ''
    req.on('data', (chunk) => {
      post_data += chunk
    }).on('end', () => {
      let params = querystring.parse(post_data)
      // 現在はparamsに対する処理なし
      if (params.target) console.log(params.target)
    })
  }

  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('active')
}).listen(3000)

if (process.env.DISCORD_BOT_TOKEN == undefined) {
  console.error('tokenが設定されていません！')
  process.exit(0)
}

require('./bot.js')
