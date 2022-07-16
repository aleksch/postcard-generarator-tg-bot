const { Scenes: { BaseScene }, Markup } = require('telegraf')
const { prepareImage } = require('../../image-service')
const MESSAGES = require('../../texts.json')
const { keyboard } = require('./keyboard')
const { buttons } = require('./keyboard-buttons')

const EFFECTS_REG_EXP = new RegExp(
  `(${Object.values(buttons).filter(name => name !== buttons.back).map(name => name).join('|')})`
)

function getEffectNameByText(text) {
  return Object.keys(buttons).find(key => buttons[key] === text);
}

const effectScene = new BaseScene('effect')

effectScene.enter(async (ctx) => {
  await ctx.reply(
    'Давайте выберем стиль для нашей открытки',
    Markup.keyboard(keyboard).oneTime()
  )
})

effectScene.hears(buttons.back, async ctx => {
  return await ctx.scene.enter('city')
})

effectScene.hears(EFFECTS_REG_EXP, async (ctx) => {
  const { text } = ctx.message
  const effectName = getEffectNameByText(text)
  ctx.session.generateImage.effectName = effectName
  await ctx.reply('Подготавливаем...')
  const data = await prepareImage(ctx.session.generateImage)
  await ctx.replyWithPhoto(
    { source : data },
    {
      caption: "Получилось вот так",
    }
  )

  return await ctx.scene.enter('text')
})

module.exports = { effectScene }
