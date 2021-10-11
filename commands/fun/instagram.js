const { stripIndent } = require('common-tags');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js')
const cookies = 'mid=YUyLugALAAHU-6pB-5qjqaJOc91w; ig_did=CF2B6350-A645-4976-92A7-4426B92840E7; ig_nrcb=1; fbm_124024574287414=base_domain=.instagram.com; shbid="14488\05446944104896\0541665403430:01f7a42fd97f7f2ca2ccbc813649c49adfe6ff844d8b283226b4b6d9d2a9bce54d8886ff"; shbts="1633867430\05446944104896\0541665403430:01f77ef3ecc897d1512c1d872b474d358f8214a4f4c4221e8d30adcf9d9a3a37f2f16c99"; ds_user_id=48925064246; csrftoken=fw0W7ZbXgYwucV7nrHPZuCD0ebiyso6B; sessionid=48925064246:lUCx3ukIUyeA6v:0; fbsr_124024574287414=FahOqGRKrucjdPqbTQaqsP9Z-Lj7eZGbe6U4yrZ9VdA.eyJ1c2VyX2lkIjoiMTAwMDY4NzIxMDQwOTgxIiwiY29kZSI6IkFRQU1oZWxhdjlqOGt4MzNOWUdVTVRsWF9YcTVPNV9VY1FSNXBDOEVENzBxZnhqR3B6dW5kdkhxa3c2YUsyNTlaSHZtR3BjckhPQkZYZm9kYzMxNFBnclM5RC1zMDBZTzZwMzItalZGSHlkcVNPYldMY0xiR3B4VzFnSW1CM1pTd2VJa3c1TTI3bnp4YWFfS3pmbFVZYzV5Sks2R29rTDRzWUhZNmxubVY5VjI3X3lXVjhsVFRScUNfNzRYN3VFREMyOWdVN2E5cDZUdDhib0xtQm5jVHN6R3R3NUYzcnR0QTVUY0ZEb01oZ2pRbnNocnNKZ2JqdGJJeVliZ01TUUV5cmx1WEhZV3U3QkxLSDdkR2VTWXcwWmRvSFg2RjdfdnlYS0I4c0hjODg1OGp0SUk2YlBZQ1V6VEpHTFNzd0RwcDgyNDVNeUJObGZqSkVjZEx2ZldCNnRSaXhxVG9xb3ZNU09RTzlGbVgwbGxXUSIsIm9hdXRoX3Rva2VuIjoiRUFBQnd6TGl4bmpZQkFITnpybFI4ajc4NG1tY0E5aWxQQ3pVRjU2SFdod3V5Vnd1OW9qc3NyTTBZRkNpVVlSMUcxdkxaQVpCbU5jQjZqTWJudnc1SjJuM0JIbXVBWEZENk05d1hvNFRtUmRwRnBMc1V0YnpxOUhoWkN5THJUMkJMU2duZ3haQXBRMUlaQ3FvZ0szTFpDNDZLb1VrRDlraHI4WkNGMXhXWEhhWThDNTdRak1XNVJFV21DQTZkcWl6QlpDQkUwTEwxc21NYnhRWkRaRCIsImFsZ29yaXRobSI6IkhNQUMtU0hBMjU2IiwiaXNzdWVkX2F0IjoxNjMzOTY3MDMwfQ; rur="VLL\05448925064246\0541665503047:01f710638e6e210c392adccf51e3014d93d1b73308f5223fb940f9435ad775ce3a88b0d2"'
module.exports = {
    name: 'insta',
    category: 'fun',
    async run(client, message, args) {
        if (!args[0]) return message.channel.send('Please enter a username');
        const instagram_id = args.join(' ');
        const url = encodeURI(`https://www.instagram.com/${instagram_id}/?__a=1`)
        const res = await fetch(url, {
            headers: {
                cookie: cookies
            }
        }).then(url => url.json())
        if (!res.graphql) {
            return message.reply('Cant find this account')
        }
        const account = res.graphql.user;
        const embed = new MessageEmbed()
            .setColor('GREEN')
            .setTitle(account.full_name)
            .setURL(`https://www.instagram.com/${instagram_id}/`)
            .setThumbnail(account.profile_pic_url_hd)
            .addField("Thông tin tài khoản", stripIndent `**- Tên người dùng:** ${account.username}
                **- Tên đầy đủ: ** ${account.full_name}
                **- Bio:** ${account.biography.length == 0 ? "Do not have" : account.biography}
                **- Số lượng bài viết:** ${account.edge_owner_to_timeline_media.count}
                **- Người theo dõi:** ${account.edge_followed_by.count}
                **- Đang theo dõi:** ${account.edge_follow.count}
                **- Tài khoản riêng tư?:** ${account.is_private ? "Có✅" : "Không❌"}
                **- Tài khoản được xác minh?:** ${account.is_verified ? "Có✅" : "Không❌"}`);

        message.reply({ embeds: [embed] })
    }
}
