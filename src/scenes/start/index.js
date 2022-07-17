const { Scenes: { BaseScene }, Markup } = require('telegraf')
const MESSAGES = require('../../texts.json')
const { keyboard, adminKeyboard } = require('./keyboard')
const { buttons } = require('./keyboard-buttons')

const ADMIN_USERNAME = process.env.ADMIN_USERNAME

const startScene = new BaseScene('start')

startScene.enter(async (ctx) => {
  if(ctx.message.from.username === ADMIN_USERNAME){
    return await ctx.reply(
        MESSAGES.welcome,
        Markup.keyboard(adminKeyboard).oneTime()
    )
  }

  await ctx.reply(
    MESSAGES.welcome,
    Markup.keyboard(keyboard).oneTime()
  )
})

startScene.hears(buttons.create, async (ctx) => {
  ctx.session.generateImage = {
    imageCityName: null,
    effectName: null,
    textPosition: null,
  }
  return ctx.scene.enter('city')
})

startScene.hears(buttons.getReady, async (ctx) => {
  await ctx.reply('Подготавливаем...')
  await ctx.replyWithPhoto(
    { source : 'src/photos/exclusive.png' },
    {
      caption: 'Ваш эксклюзивный дизайн\nМожете попробовать создать сами',
      reply_markup: {
        keyboard: keyboard,
        one_time_keyboard: true,
      }
    },
  )
})

startScene.hears(buttons.analytics, async (ctx)=>{
  if(ctx.message.from.username === ADMIN_USERNAME){
    return ctx.scene.enter('analytics')
  }
})

module.exports = { startScene }
