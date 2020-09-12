module.exports = (client, message) => {
  if (message.author.bot) return;
  if(message.channel.type === "dm") return;

//execução de comandos e prefixo
  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  const cmd = client.commands.get(command);

  if (message.content.indexOf(client.config.prefix) !== 0) return;
  if (!cmd) return message.channel.send("Opa, parece que o comando foi digitado errado ou não existe")
  cmd.run(client, message, args);
};