const { createCanvas, loadImage } = require('canvas')

// type Args = {
//   pathToCityImage: string | null,
//   effectName: 'strict' | 'refined' | 'cool' | null,
//   textPosition: 'top' | 'center' | 'bottom' | null,
// }
const canvas = createCanvas(1920, 1080)
const ctx = canvas.getContext('2d')

async function prepareImage({ pathToCityImage, effectName, textPosition }) {
  ctx.clearRect(0, 0, 1920, 1080)
  const bgImage = await loadImage(pathToCityImage)
  ctx.drawImage(bgImage, 0, 0, 1920, 1080)

  switch (effectName) {
    case 'cool':
      const coolEffect = await loadImage('src/effects/cool/effect.png')
      ctx.drawImage(coolEffect, 52, 0)
      break
    case 'refined':
      const refinedEffect = await loadImage('src/effects/refined/effect.png')
      ctx.drawImage(refinedEffect, 0, 0)
      break
    case 'strict':
      const strictEffect = await loadImage('src/effects/strict/effect.png')
      ctx.drawImage(strictEffect, 0, 0)
      break
    default:
      break
  }

  if (effectName && textPosition) {
    await drawTextByPositionAndEffectName(ctx, effectName, textPosition)
  }

  return canvas.toBuffer()
}

async function drawTextByPositionAndEffectName(ctx, effectName, textPosition) {
  const textImage = await loadImage(`src/effects/${effectName}/text.png`)

  if (textPosition === 'top') {
    ctx.drawImage(textImage, 810 - textImage.width / 2, 0)
  } else if (textPosition === 'center') {
    ctx.drawImage(textImage, 810 - textImage.width / 2, 540 - textImage.height / 2)
  } else if (textPosition === 'bottom') {
    ctx.drawImage(textImage, 810 - textImage.width / 2, 1080 - textImage.height)
  }
}

module.exports = { prepareImage }
