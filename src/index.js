require('dotenv').config()
const { Telegraf, session, Scenes: { Stage } } = require('telegraf')
const { startScene, cityScene, effectScene, textScene, analyticsScene } = require('./scenes')



const stage = new Stage([
  startScene,
  cityScene,
  effectScene,
  textScene,
  analyticsScene
])

const BOT_TOKEN = process.env.BOT_TOKEN || ""
const bot = new Telegraf(BOT_TOKEN)

bot.use(session(), stage.middleware())

bot.catch((err, ctx) => {
  console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
})

bot.start(async (ctx) => {
  ctx.scene.enter('start')
})

bot.help((ctx) => ctx.reply('Выбори фон, стиль и наконец — расположени надпись.\n\nДля начала напиши /start'))

bot.launch()
