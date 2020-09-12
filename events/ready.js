module.exports = async client => {
    console.log('Bot on');


    let status = [
        {name: 'EletroClub #50K', type: 'WATCHING'},
        {name: `Total de ${client.users.cache.size} users`, type: 'WATCHING'}
    ]
    function setStatus(){
        let randomStatus = status[Math.floor(Math.random()*status.length)]
        client.user.setPresence({activity: randomStatus})
    }
    setStatus();
    setInterval(() => setStatus(), 20000)
}