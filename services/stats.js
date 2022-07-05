const axios = require('axios')

module.exports = {
  createStatsMessage(stats, old_stats = {}) {
    return [
      "```md",
      convertBankMaisu(stats.bank_maisu, old_stats.bank_maisu),
      convertPlayTime(stats.play_time, old_stats.play_time),
      convertPPR(stats.ppr_jp_all, old_stats.ppr_jp_all),
      convertPPP(stats.ppp_ajp, old_stats.ppp_ajp),
      convertBJ(stats.black_jack, old_stats.black_jack),
      convertPS(stats.paslot, old_stats.paslot),
      convertRT(stats.loulette, old_stats.loulette),
      convertSD(stats.sky_dream, old_stats.sky_dream),
      convertFC(stats.fluite_chain, old_stats.fluite_chain),
      convertSG2(stats.spheet_garden2, old_stats.spheet_garden2),
      "```",
    ].join("\n")
  }
}

// 全カテゴリ共通の変換処理
function convertDefaultStat(rank, rate, old_stats = {}) {
  if (!rank || !rate) return ['- 未プレイ？']
  let old_rank_msg = old_stats.rank ? ` (${rank_unit(rank, old_stats.rank)} ${old_stats.rank === rank ? rank : Math.abs(rank - old_stats.rank)})` : ''
  let old_rate_msg = old_stats.rate ? ` (${rate_unit(rate, old_stats.rate)}${Math.abs(rate - old_stats.rate)})` : ''
  return [
    `- Rank: ${rank}位${old_rank_msg}`,
    `- Rate: ${rate}pt${old_rate_msg}`,
  ]
}

function rank_unit(rank, old_rank) {
  if (rank === old_rank) return '▷suspend'
  return rank < old_rank ? '▲up' : '▼down' 
}

function rate_unit(rate, old_rate) {
  if (rate === old_rate) return '±'
  return rate - old_rate ? '+' : '-'
}

function convertBankMaisu(bank_maisu, old_bank_maisu = {}) {
  return [
    '# バンク枚数',
    convertDefaultStat(bank_maisu.rank, bank_maisu.rate, old_bank_maisu),
    `- メダル枚数: ${bank_maisu.maisu}枚`,
    `- 拡張に使用: ${bank_maisu.kakucho_maisu}枚`
  ].flat().join('\n')
}

function convertPlayTime(play_time, old_play_time = {}) {
  return [
    '# プレイ時間',
    convertDefaultStat(play_time.rank, play_time.rate, old_play_time),
    `  ${Math.floor(play_time.play_time / 60)}時間 ${play_time.play_time % 60}分`
  ].flat().join('\n')
}

function convertPPR(ppr_jp_all, old_ppr_jp_all = {}) {
  return [
    '# PPR',
    convertDefaultStat(ppr_jp_all.rank, ppr_jp_all.rate, old_ppr_jp_all),
  ].flat().join('\n')
}

function convertPPP(ppp_ajp, old_ppp_ajp = {}) {
  return [
    '# PPP AJP',
    convertDefaultStat(ppp_ajp.rank, ppp_ajp.rate, old_ppp_ajp),
  ].flat().join('\n')
}

function convertBJ(black_jack, old_black_jack = {}) {
  return [
    '# ブラックジャック',
    convertDefaultStat(black_jack.rank, black_jack.rate, old_black_jack),
  ].flat().join('\n')
}

function convertPS(paslot, old_paslot = {}) {
  return [
    '# パスロット',
    convertDefaultStat(paslot.rank, paslot.rate, old_paslot),
  ].flat().join('\n')
}

function convertRT(loulette, old_loulette = {}) {
  return [
    '# ルーレット',
    convertDefaultStat(loulette.rank, loulette.rate, old_loulette),
  ].flat().join('\n')
}

function convertSD(sky_dream, old_sky_dream = {}) {
  return [
    '# スカイドリーム',
    convertDefaultStat(sky_dream.rank, sky_dream.rate, old_sky_dream),
  ].flat().join('\n')
}

function convertFC(fluite_chain, old_fluite_chain = {}) {
  return [
    '# フルーツチェイン',
    convertDefaultStat(fluite_chain.rank, fluite_chain.rate, old_fluite_chain),
  ].flat().join('\n')
}

function convertSG2(spheet_garden2, old_spheet_garden2 = {}) {
  return [
    '# スフィートガーデン2',
    convertDefaultStat(spheet_garden2.rank, spheet_garden2.rate, old_spheet_garden2),
  ].flat().join('\n')
}
