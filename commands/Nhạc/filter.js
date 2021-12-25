module.exports = {
    name: 'filter',
    aliases: [],
    category: 'Nhạc',
    utilisation: '{prefix}filter [filter name]',
    usage: '%filter [tên filter]',
    descriptions: 'Sử dụng filter cho bài hát',
    voiceChannel: true,

    async run(client, message, args) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.reply(`Danh sách nhạc đang trống...`);

        const actualFilter = queue.getFiltersEnabled()[0];

        if (!args[0]) return message.reply(`Vui lòng nhập đúng filter để tắt hoặc bật!\n${actualFilter ? `Filter đang được kích hoạt ${actualFilter} (${client.config.app.px} filter ${actualFilter} để vô hiệu nó).\n` : ''}`);

        const filters = [];

        queue.getFiltersEnabled().map(x => filters.push(x));
        queue.getFiltersDisabled().map(x => filters.push(x));

        const filter = filters.find((x) => x.toLowerCase() === args[0].toLowerCase());

        if (!filter) return message.reply(`Filter này không mở được, bạn thử lại nhá!\n${actualFilter ? `Filter đang được kích hoạt ${actualFilter}.\n` : ''}Danh sách Filter có sẵn ${filters.map(x => `**${x}**`).join(', ')}.`);

        const filtersUpdated = {};

        filtersUpdated[filter] = queue.getFiltersEnabled().includes(filter) ? false : true;

        await queue.setFilters(filtersUpdated);

        message.reply(`${filter} đã được kích hoạt ngay bây giờ **${queue.getFiltersEnabled().includes(filter) ? 'kích hoạt' : 'không kích hoạt'}** ✅\n*Thời lựong nhạc càng dài thì sẽ phải đợi thêm thời gian dài hơn.*`);
    },
};