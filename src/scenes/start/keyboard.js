const { buttons } = require('./keyboard-buttons')

const keyboard = [[buttons.create, buttons.getReady]]

const adminKeyboard = [...keyboard, [buttons.analytics]]

module.exports = { keyboard,adminKeyboard }
