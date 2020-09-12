const ytdl = require('ytdl-core-discord');
//queue é o arquivo onde ficará o link dos videos no youtube. queue is the file where the videos link on youtube will be.
const queue = require('../listas.json');
//config para pegar o token da api. config to get the api token.
const config = require('../json/config.json');

const YouTube = require('simple-youtube-api');
const youtube = new YouTube(config.keyYT);

module.exports.run = (client, message) => {

    //Essa permissão abaixo é opcional. This permission is optional.
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Opa... me parece que você não tem permissão para isso.");
    message.channel.send('Iniciado.')
    pesquisa(client, message)
}

const pesquisa = async (client, message) => {
    //será feita a pesquisa para caso a musica tenha saido do ar ou algo do tipo. the search will be done in case the music has gone off the air or something.

    let song = queue.lista
    
    let musicfs = song[client.pagina];
    
    if(musicfs.loop1) {
        client.pagina = 0;
        let musicfs = song[client.pagina];
        var resultado = await youtube.getVideo(musicfs.url);

     return playSong(client, message, resultado)

    } else {
    var resultado = await youtube.getVideo(musicfs.url);

    playSong(client, message, resultado)
    }
}

const playSong = async (client, message, resultado) => {
    
    //Você pode remover isso e adaptar para ser no canal que você escolher, caso contrario vai ser em um canal fixo
    //You can remove this and adapt it to be on the channel you choose, otherwise it will be on a fixed channel
    const canal = message.guild.channels.cache.get(`Channel_ID`);

    if (!canal) return message.channel.send("Verifique se o canal não foi apagado.");
    const conn = await canal.join()

    const song = {
        url: `https://www.youtube.com/watch?v=${resultado.id}`
    };

    const musica = {
        connection: conn,
        dispatcher: null,
        songs: [],
        volume: 10
    };
    musica.songs.push(song);
    let musicnow = musica.songs[0];
    musica.dispatcher = await musica.connection.play(await ytdl(musicnow.url, { highWaterMark: 1 << 25, filter: "audioonly" }), {
        type: "opus",
      });

    musica.dispatcher.on('start', () => {
    });
    
    musica.dispatcher.on('finish', () => {
        client.pagina++;
        pesquisa(client, message)
    });

}