const Niku = require('./Niku.js');
const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'NjExMTg2MjIwNjEzMTA3NzQy.XVQJ0Q.ogL-LpI8glos98FZpo0omA6DT0A';

var yakinikuBoard = [];

client.on('message', message =>{
    if(message.author.bot){
        return;
    }
    if (message.content.startsWith("!烤肉")) {
        var args = message.content.split(" ")
        var reply_text = ""
        if(yakinikuBoard.length === 5){
            message.reply("烤你媽，盤子已經滿了沒看到嗎?")
            return;
        }
        if(args.length === 2){
            switch(args[1]) { 
                case "牛肉":
                    reply_text += "你放了一塊牛肉上烤盤"
                    yakinikuBoard.push(new Niku('牛肉'))
                    break;             
             
                case "豬肉":
                    reply_text += "你放了一塊豬肉上烤盤"
                    yakinikuBoard.push(new Niku('豬肉'))
                    break;                
                case "羊肉":
                    reply_text += "你放了一塊羊肉上烤盤"
                    yakinikuBoard.push(new Niku('羊肉'))
                    break;
            } 
        } else {
            reply_text += "你不知道烤甚麼對吧，我們先烤豬肉好了!"
            yakinikuBoard.push(new Niku('豬肉'))
        }
        message.reply(reply_text)
        return;
   }

   if (message.content.startsWith("!拿")) {
    var args = message.content.split(" ")
    var reply_text = ""
    if(args.length === 2){
        if(!isNaN(args[1])){
            var pos = args[1]
            if(pos > yakinikuBoard.length){
                reply_text += "夾了空氣, 傻逼一個。"
            } else {
                var niku = yakinikuBoard[pos -1]
                niku.addDegree(Date.now())
                reply_text += niku.getPrciseStatus()
                yakinikuBoard.splice(pos - 1, 1);
            }
        } else {
            reply_text += "幹 你要拿三小 你要講清楚啊!"
        }
    } else {
        reply_text += "幹 你要拿三小 你要講清楚啊!"
    }
    message.reply(reply_text)
    return;
}

   if (message.content === "!烤盤") {
    var reply_text = "烤盤上現在有" + yakinikuBoard.length + "塊肉\n"
    var count = 1;
    var currentCheckTime = Date.now();
    console.log("------------------------------")
    yakinikuBoard.forEach(
        function(niku) {            
            niku.addDegree(currentCheckTime)
            reply_text += (count + ".")
            reply_text += niku.isCooked()
            reply_text += '\n'
            count++
            console.log(count + "." + niku.getStatus())
       }
    )
    console.log("------------------------------")    
    message.reply(reply_text);
    count = 0;
    var stoleMessage = "有人偷偷把豬肉吃掉囉, 嘻嘻"
    yakinikuBoard.forEach(
        function(niku) {            
            if(niku.geType() === "豬肉"){
                if(niku.canTake()){
                    var chance = Math.floor( Math.random() * (100) ) +1
                    if(chance >= 90){
                        yakinikuBoard.splice(count, 1)
                        message.channel.send(stoleMessage);
                    }
                }
            }
            count++
       }
    )
    return
   }

   if (message.content === "!指令"){
        var reply_text = "!烤肉 {牛肉, 豬肉, 羊肉} <<< 會放一塊肉上烤盤, 最多5塊肉同時在烤盤上\n" + "!烤盤 <<< 可以看到烤盤上的肉,跟肉看起來的狀況\n" + "!拿 {數字1-5} <<<< 可以拿起烤盤上的肉，拿的時候會知道是否熟了(還沒做)"
        message.channel.send(reply_text)
        return
   }
});

client.login(token);
