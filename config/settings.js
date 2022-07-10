const env_config = require(`./${process.env.ENV}`)

module.exports = {
  myriad_race: {
    buttons: [
      { custom_id: 'myriad_race_sg2', name: 'SG', style: 'PRIMARY', disabled: false },
      { custom_id: 'myriad_race_rt', name: 'RT', style: 'PRIMARY', disabled: false },
      { custom_id: 'myriad_race_ps', name: 'PS', style: 'PRIMARY', disabled: false },
      { custom_id: 'myriad_race_ppp', name: 'PPP', style: 'PRIMARY', disabled: false },
      { custom_id: 'myriad_race_fc', name: 'FC', style: 'PRIMARY', disabled: false },
      { custom_id: 'myriad_race_bj', name: 'BJ', style: 'PRIMARY', disabled: false },
      { custom_id: 'myriad_race_ppr', name: 'PPR', style: 'PRIMARY', disabled: false },
      { custom_id: 'myriad_race_sd', name: 'SD', style: 'PRIMARY', disabled: false },
    ],
    reset: { custom_id: 'myriad_race_reset', name: 'りせっと', style: 'DANGER', disabled: false }
  },
  env: env_config
}
