const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("message", message => {
  if (message.author.bot) return;

  if (message.content.includes("敗北者")) {
    if (message.isMemberMentioned(client.user) && message.member.voiceChannel) {
      message.member.voiceChannel
        .join()
        .then(connection => {
          const fileNames = fs.readdirSync("./voices", { encoding: "utf-8" });
          const fileName =
            fileNames[Math.floor(Math.random() * fileNames.length)];

          const dispatcher = connection.playFile(`./voices/${fileName}`);
          message.delete(10);
          dispatcher.on("end", () => {
            connection.disconnect();
          });
        })
        .catch(console.error);
    } else {
      const texts = JSON.parse(
        fs.readFileSync("./texts.txt", { encoding: "utf-8" })
      );

      const replyText = texts[Math.floor(Math.random() * texts.length)];
      message.reply(replyText).catch(console.error);
    }
  }
});

const token = fs.readFileSync("./token", "utf-8").trim();
client.login(token);
