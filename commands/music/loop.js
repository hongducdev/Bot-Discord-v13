const  { checkSameRoom } = require('../../utils')
const { SlashCommand, CommandOptionType } = require('slash-create');
const { QueueRepeatMode } = require('discord-player');

module.exports = {
    name: 'loop',
    category: 'music',
    aliases: ['repeat'],
    description: 'Chơi nhạc từ youtube, spotify, soundcloud',
    options: [
        {
            name: 'mode',
            type: CommandOptionType.INTEGER,
            description: 'Loop type',
            required: true,
            choices: [
                {
                    name: 'Off',
                    value: QueueRepeatMode.OFF
                },
                {
                    name: 'track',
                    value: QueueRepeatMode.TRACK
                },
                {
                    name: 'queue',
                    value: QueueRepeatMode.QUEUE
                },
                {
                    name: 'autoplay',
                    value: QueueRepeatMode.AUTOPLAY
                }
            ]
        }
    ],
    run: async(client, message, args) => {
        if (checkSameRoom(message)) return;
        const query = args.join(' ');
        const queue = client.player.createQueue(message.guild, {
            metadata: message,
        });
        if (!queue || !queue.playing) return void message.reply({ content: '❌ | No music is being played!' });
        const loopMode =  queue.options.mode;
        const success = queue.setRepeatMode(loopMode);
        const mode = loopMode === QueueRepeatMode.TRACK ? '🔂' : loopMode === QueueRepeatMode.QUEUE ? '🔁' : '▶';
        return void message.reply({ content: success ? `${mode} | Updated loop mode!` : '❌ | Could not update loop mode!' });
    }
}