const { buttons } = require('./keyboard-buttons')

const keyboard = [
  [buttons.top, buttons.center, buttons.bottom],
  [buttons.back]
]

const completeKeyboard = [[buttons.repeat]]

module.exports = { keyboard, completeKeyboard }
