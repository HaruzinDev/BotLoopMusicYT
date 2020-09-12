module.exports.run = (client, message) => {
    const queue = require('../listas.json');
    //Esse comando mostra a musica que está tocando no momento. This command shows the song that is currently playing.

    //obs: se esse comando for feito com o bot fora do canal de voz, mostrará mesmo assim a musica que era pra está tocando. É possivel fazer modificação para bloquear o uso do comando com o bot fora do canal de voz.
    //Note: if this command is done with the bot outside the voice channel, it will still show the music that was supposed to be playing. Modification is possible to block the use of the command with the bot outside the voice channel.
    const Discord = require('discord.js');

    let song = queue.lista
    
    let musicfs = song[client.pagina];

    const botA = client.user.displayAvatarURL();

        const embed = new Discord.MessageEmbed()
        .setAuthor(`Modifique do seu agrado`, `${botA}`)
        .addField('Tocando agora:', `${musicfs.title}`, false)
        .setTimestamp()
        .setFooter(`Modifique do seu agrado`, `${botA}`)
        message.channel.send(embed)
}