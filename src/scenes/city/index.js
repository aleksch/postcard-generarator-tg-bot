const { Scenes: { BaseScene }, Markup } = require('telegraf')
const MESSAGES = require('../../texts.json')
const { keyboard } = require('./keyboard')
const { buttons } = require('./keyboard-buttons')

const CITIES_REG_EXP = new RegExp(
  `(${Object.values(buttons).filter(name => name !== buttons.back).map(name => name).join('|')})`
)

const cityScene = new BaseScene('city')

function getImageByCityName(cityName) {
  const imageName = Object.keys(buttons).find(key => buttons[key] === cityName);
  return `src/photos/${imageName}.jpeg`
}

cityScene.enter(async ctx => {
  await ctx.reply(
    MESSAGES.chooseCity,
    Markup.keyboard(keyboard).oneTime()
  )
})

cityScene.hears(buttons.back, async ctx => {
  return await ctx.scene.enter('start')
})

cityScene.hears(CITIES_REG_EXP, async ctx => {
  const { text: cityName } = ctx.message
  const pathToCityImage = getImageByCityName(cityName)
  await ctx.reply('Ищем обложку...')
  await ctx.replyWithPhoto(
    { source : pathToCityImage },
    {
      caption: "Это будет обложка для нашей открытки",
    }
  )
  ctx.session.generateImage = {
    pathToCityImage,
    effectName: null,
    textPosition: null,
  }

  return await ctx.scene.enter('effect')
})

module.exports = { cityScene }
