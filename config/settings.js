const env_config = require(`./${process.env.ENV}`)

module.exports = {
  pnr2: {
    game_mode_list: [
      { custom_id: 'game_mode_sg2', name: 'SG', disabled: false },
      { custom_id: 'game_mode_rt', name: 'RT', disabled: false },
      { custom_id: 'game_mode_ps', name: 'PS', disabled: false },
      { custom_id: 'game_mode_ppp', name: 'PPP', disabled: false },
      { custom_id: 'game_mode_fc', name: 'FC', disabled: false },
      { custom_id: 'game_mode_bj', name: 'BJ', disabled: false },
      { custom_id: 'game_mode_ppr', name: 'PPR', disabled: false },
      { custom_id: 'game_mode_sd', name: 'SD', disabled: false },
    ]
  },
  env: env_config
}
