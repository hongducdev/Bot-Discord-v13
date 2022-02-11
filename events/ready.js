// const client = require("../index");

// client.on("ready", () =>
//     console.log(`${client.user.tag} is up and ready to go!`)
// );

// const activities = [
// { name: 'bởi PinkDuwc._#2428', type: 'PLAYING' }, 
// { name: '%help', type: 'PLAYING' }
// ];

// client.on("ready", () => {
//     console.log (`${client.user.username} đã sẵn sàng hoạt động`);
//     let mcount = 0; 
//     client.guilds.cache.forEach((guild) => {
//         mcount += guild.memberCount 
//     })

//     client.user.setPresence({ type:'STREAMING', activity: activities[0]});
//     let activity = 1;
//     setInterval(() => {
//         activities[2] = { name: `${client.guilds.cache.size} Máy chủ`, type: 'WATCHING' };
//         activities[3] = { name: `${mcount} Người dùng`, type: 'WATCHING' };
//         if (activity > 3) activity = 0;
//         client.user.setActivity(activities[activity]);
//         activity++;
//     }, 5000);
//     client.user.setActivity('Bởi PinkDuwc._#0510', {
//         type: 'STREAMING',
//         url: 'https://www.twitch.tv/hongduccodedao',
//     });
// });


const client = require("../index");

client.on("ready", () =>
    console.log(`${client.user.tag} is up and ready to go!`)
);
    
    let mcount = 0; 
    client.guilds.cache.forEach((guild) => {
        mcount += guild.memberCount 
    })

function presence(){
	client.user.setPresence({
		status: "online",
		activities: [
			{
                name: "Bởi PinkDuwc._#0510",
				type: "STREAMING",
				url: "https://www.twitch.tv/hongduccodedao"
			},
		],
	});
}

   const array = [
     {
       name: `${client.guilds.cache.size} Máy chủ`,
       type: "STREAMING",
       url: "https://www.twitch.tv/hongduccodedao",
     },
     {
       name: `${mcount} Người dùng`,
       type: "STREAMING",
       url: "https://www.twitch.tv/hongduccodedao",
     },
     {
       name: "%help || Slash Commands",
       type: "COMPETING",
     },
     {
       name: "Bởi PinkDuwc._#0510",
       type: "STREAMING",
       url: "https://www.twitch.tv/hongduccodedao",
     },
   ];

setInterval(() => {
 function presence() {
   client.user.setPresence({
     status: "online",//dnd, idle, invisible, online
     activities: [array[Math.floor(Math.random() * array.length)]],
   });
 }
}, 1000)


client.on("ready", () => {
    console.log(`${client.user.username} đã sẵn sàng hoạt động`);
    presence();
 });
