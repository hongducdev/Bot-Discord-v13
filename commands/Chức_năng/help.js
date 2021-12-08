const { MessageEmbed }= require('discord.js');

module.exports = {
    name: 'help',
    category: 'Chức_năng',
    aliases: ['help','giup','hotro','trogiup'],
    utilisation: '{prefix}help',
    description: 'Hưỡng dẫn cách xài lệnh',
    usage: '%help [Tên lệnh]',

    async run (client, message, args) {
        const embed = new MessageEmbed()
            .setColor('GREEN')
            .setAuthor('Thông tin Bao-Chan Bot', client.user.displayAvatarURL({ size: 1024, dynamic: true }))
            .setThumbnail(client.user.displayAvatarURL({ size: 1024, dynamic: true }))
            .setDescription('**Sử dụng Bao Chan Bot**\n`% + [Tên lệnh/bí danh(aliases) được gắn kèm với tên lệnh dưới đây]`')
            .addField('**Chức năng: **','Lệnh cơ bản', 'string')
            .addField('**+ping**','Hiển thị ra ping của bản thân', true)
            .addField('**+avatar(ava)**','Hiển thị avatar của bạn hoặc người khác', true)
            .addField('**+botinfo(bot)**','Hiển thị ra thông tin của bot', true)
            .addField('**+color + mã màu**','Hiển thị ra thông tin màu dựa theo mã màu', true)
            .addField('**+donate(dnt, ungho)**','Hiển thị ra thông tin donate cho server', true)
            .addField('**+emoji(emo) + emoji**','Hiển thị ra hình ảnh phóng to của emoji', true)
            .addField('**+instagram(insta) + tên instagram**','Hiển thị ra thông tin của tài khoản instagram', true)
            .addField('**+invite(add)**','Hiển thị ra đường dẫn tham gia của bot', true)
            .addField('**+say + chữ**','Bot sẽ hiển thị câu nói của bạn', true)
            .addField('**+speak + chữ**','Chuyển tin nhắn của bạn thành âm thanh trong kênh thoại', true)
            .addField('**+weather(we, thoitiet) + địa điểm**','Hiển thị ra thông tin thời tiết theo địa điểm', true)
            .addField('**+chat + chữ**','Nói chuyện với Bot', true)
            .addField('**+serverinfo(server)**','Hiển thị ra thông tin của server', true)
            .addField('**+userinfo(user)**','Hiển thị ra thông tin của người dùng', true)

            .addField('**Giải trí cùng nhau**', 'Chỉ hoạt động trong kênh thoại trên desktop')
            .addField('**+betrayal(betra)**', 'Chơi game cùng mọi người trong kênh thoại',true)
            .addField('**+chess(co)**', 'Chơi cờ vua cùng mọi người trong kênh thoại',true)
            .addField('**+doodle(ve)**', 'Chơi vẽ đoán từ cùng mọi người trong kênh thoại',true)
            .addField('**+fish(cauca,ca)**', 'Chơi câu cá cùng mọi người trong kênh thoại',true)
            .addField('**+letter**', 'Chơi game cùng mọi người trong kênh thoại',true)
            .addField('**+poker**', 'Chơi Poker cùng mọi người trong kênh thoại',true)
            .addField('**+word(gheptu)**', 'Chơi ghép từ cùng mọi người trong kênh thoại',true)
            .addField('**+youtube(yt)**', 'Xem Youtube cùng mọi người trong kênh thoại',true)
        
            const ImgEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setDescription('**Sử dụng Bao Chan Bot**\n`% + [Tên lệnh/bí danh(aliases) được gắn kèm với tên lệnh dưới đây]`')
            .addField('Hình ảnh', 'In ra hình ảnh theo lệnh')
            .addField('**+boy(trai,zai)**', 'In ra hình ảnh về trai', true)
            .addField('**+car(xe)**', 'In ra hình ảnh về xe hơi', true)
            .addField('**+cat(meo)**', 'In ra hình ảnh về mèo', true)
            .addField('**+dog(cho)**', 'In ra hình ảnh về chó', true)
            .addField('**+food(doan)**', 'In ra hình ảnh về đồ ăn', true)
            .addField('**+girl(gai)**', 'In ra hình ảnh về gái', true)
            .addField('**+panda(gautruc)**', 'In ra hình ảnh về gấu trúc', true)
            .addField('**+redpanda(gautrucdo)**', 'In ra hình ảnh về gấu trúc đỏ', true)
            .addField('**+setup**', 'In ra hình ảnh về góc setup đẹp', true)
            .addField('**+shiba**', 'In ra hình ảnh về shiba', true)
            .addField('**+wallpaper(anhnen)**', 'In ra hình ảnh về wallpaper đẹp', true)

            const MusicEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setDescription('**Sử dụng Bao Chan Bot**\n`% + [Tên lệnh/bí danh(aliases) được gắn kèm với tên lệnh dưới đây]`')
            .addField('Nhạc','Chức năng nghe nhạc trong kênh thoại')
            .addField('**+back**', 'Chơi lại bài hát trước đó', true)
            .addField('**+clear**', 'Xóa hết danh sách phát', true)
            .addField('**+filter**', 'Thêm filter cho nhạc', true)
            .addField('**+loop(repeat)**', 'Tắt/bật lặp lại danh sách phát', true)
            .addField('**+lyrics + tên bài hát**', 'Hiện thị lời bài hát', true)
            .addField('**+play(p) +tên bài hát(URL)**', 'Phát nhạc theo theo tên bài hát hoặc theo link bài hát', true)
            .addField('**+progress(pbar)**', 'Hiện thị thanh bar phát nhạc', true)
            .addField('**+queue(q)**', 'Hiện thị danh sách phát', true)
            .addField('**+search(sh)**', 'Tìm kiếm nhạc để phát', true)
            .addField('**+shuffle(sl)**', 'Xáo trộn nhạc trong danh sách phát', true)
            .addField('**+stop(leave)**', 'Ngắt kết nốt bot trong kênh thoại', true)
            .addField('**+skip(s)**', 'Phát bài nhạc tiếp theo trong danh sách phát', true)
            .addField('**+volume(vol) + số âm lượng**', 'Điều chỉnh âm lượng của bot', true)
            .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            
        message.channel.send({ embeds: [embed]});
        message.channel.send({ embeds: [ImgEmbed]});
        message.channel.send({ embeds: [MusicEmbed]});
    }
}