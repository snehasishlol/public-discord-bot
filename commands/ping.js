module.exports = {
	exec: async(message, client, args) => {
		message.reply({
			content: `Pong! **${client.ws.ping}ms**`
		});
	},
};
