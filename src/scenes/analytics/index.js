const MESSAGES = require("./texts.json");
const { Scenes: { BaseScene }, Markup } = require('telegraf')
const {keyboard} = require("./keyboard");
const { buttons } = require('./keyboard-buttons')
const {analytics} = require('../../db')


const ADMIN_USERNAME = process.env.ADMIN_USERNAME

const analyticsScene = new BaseScene('analytics')

analyticsScene.enter(async ctx => {
    if(ctx.message.from.username !== ADMIN_USERNAME){
        return await ctx.scene.enter('start')
    }

    await ctx.reply(
        MESSAGES.welcome,
        Markup.keyboard(keyboard).oneTime()
    )
})

analyticsScene.hears(buttons.showAllUsers, async ctx => {
    analytics.getUsers(async(err, raws)=>{
        await ctx.reply('answer:'+ JSON.stringify(raws))
    })
})


analyticsScene.hears(buttons.addUser, async ctx => {
    analytics.addUser(ctx.message.from,async (err, raws)=>{
        if(err){
            console.log(err)
            return;
        }

        await ctx.reply('answer:'+ JSON.stringify(raws))

    })
})

analyticsScene.hears(buttons.back, async ctx => {
    return await ctx.scene.enter('start')
})
module.exports = { analyticsScene }
