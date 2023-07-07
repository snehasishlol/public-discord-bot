const express = require('express');
const app = express();

const { Client, Events, GatewayIntentBits, ActivityType } = require('discord.js');
const client = new Client({ intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers ] });

const TOKEN = process.env['DISCORD_TOKEN'];
const PREFIX = "!";

app.get('/', (req, res) => {
	res.send('Hello Express app!')
});

app.listen(3000, () => {
	console.log('server started');
});

client.once(Events.ClientReady, c => {
	client.user.setPresence({
		activities: [{ name: `snehasish`, type: ActivityType.Listening }],
		status: 'idle'
	});
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.MessageCreate, async(message) => {
	if(!message.content) return;
	if(!message.content.startsWith(PREFIX)) return;
	const command = message.content.split(" ")[0];
	const commandName = command.slice(1, command.length);
	const commandArgs = message.content.split(" ").slice(1);
	const commandData = require(`./commands/${commandName}`);
	if(!commandData) return;
	try {
		commandData.exec(message, client, commandArgs);
	} catch(error) {
		message.reply({
			content: `An error occured while executing that command. Please retry!`
		});
		return console.error(error);
	}
})

client.login(TOKEN);
