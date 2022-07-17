const { Scenes: { BaseScene }, Markup } = require('telegraf')
const MESSAGES = require('../../texts.json')
const { keyboard } = require('./keyboard')
const { buttons } = require('./keyboard-buttons')

const startScene = new BaseScene('start')

startScene.enter(async (ctx) => {
  await ctx.replyWithHTML(
`Привет! Если ты попал сюда — значит, ищешь, чем бы таким удивить всех родственников и знакомых в вотсапе на <s>очередной ДеНьДнЯ</s> день их маленького города и праздник всех металлургов.

Три шага, которые отделяют тебя от НЕЁ — самой нетривиальной, завораживающей и исключительно твоей собственной пикчи:

Выбери фон, определись со стилем и наконец — расположи надпись.`,
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

module.exports = { startScene }
