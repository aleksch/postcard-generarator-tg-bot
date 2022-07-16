require('dotenv').config()
const { Telegraf, session, Scenes: { Stage } } = require('telegraf')
const { startScene, cityScene, effectScene, textScene } = require('./scenes')

const stage = new Stage([
  startScene,
  cityScene,
  effectScene,
  textScene
])

const BOT_TOKEN = process.env.BOT_TOKEN
const bot = new Telegraf(BOT_TOKEN)

bot.use(session(), stage.middleware())

bot.catch((err, ctx) => {
  console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
})

bot.start(async (ctx) => {
  ctx.scene.enter('start')
})
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.launch()
