const { Scenes: { BaseScene }, Markup } = require('telegraf')
const { prepareImage } = require('../../image-service')
const MESSAGES = require('../../texts.json')
const { keyboard, completeKeyboard } = require('./keyboard')
const { buttons } = require('./keyboard-buttons')

const textScene = new BaseScene('text')

function getTextPositionNameByText(text) {
  return Object.keys(buttons).find(key => buttons[key] === text);
}

const TEXT_POSITION_REG_EXP = new RegExp(
  `(${Object.values(buttons)
    .filter(name => name !== buttons.back && name !== buttons.repeat)
    .map(name => name).join('|')})`
)

textScene.enter(async (ctx) => {
  await ctx.reply(
    'Можно разместить текст! Где бы вы хотели его видеть?',
    Markup.keyboard(keyboard).oneTime()
  )
})

textScene.hears(buttons.back, async ctx => {
  return await ctx.scene.enter('effect')
})

textScene.hears(TEXT_POSITION_REG_EXP, async (ctx) => {
  const { text } = ctx.message
  const textPosition = getTextPositionNameByText(text)
  ctx.session.generateImage.textPosition = textPosition
  await ctx.reply('Подготавливаем...')
  const data = await prepareImage(ctx.session.generateImage)
  await ctx.replyWithPhoto(
    { source : data },
    {
      caption: "Готово!",
      reply_markup: {
        keyboard: completeKeyboard,
        one_time_keyboard: true,
      }
    }
  )
})

textScene.hears(buttons.repeat, async (ctx) => {
  return await ctx.scene.enter('start')
})

module.exports = { textScene }
