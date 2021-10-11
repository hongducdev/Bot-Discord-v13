const { stripIndent } = require('common-tags');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js')
const cookies = 'mid=YUyLugALAAHU-6pB-5qjqaJOc91w; ig_did=CF2B6350-A645-4976-92A7-4426B92840E7; ig_nrcb=1; fbm_124024574287414=base_domain=.instagram.com; shbid="14488\05446944104896\0541665403430:01f7a42fd97f7f2ca2ccbc813649c49adfe6ff844d8b283226b4b6d9d2a9bce54d8886ff"; shbts="1633867430\05446944104896\0541665403430:01f77ef3ecc897d1512c1d872b474d358f8214a4f4c4221e8d30adcf9d9a3a37f2f16c99"; fbsr_124024574287414=F5ukFaGxzLLJJvhjPA4wtA0-fjPX1PRAwdF4CJMwKts.eyJ1c2VyX2lkIjoiMTAwMDY4NzIxMDQwOTgxIiwiY29kZSI6IkFRQVMxbXRjd0hGMjB6MERRalFqcFAxV2tua2hRWWxONktZeXFZZ21iZEx2MlE1b3h1LUpyek8tQW94WExhWEk0bUJULUFnU0dtYW04cm4zcEtub3dqRjlJZ1RvT0VkMlpvek4zdmNVSVB0WkRwbS0yV0RRMnI4UVJvOWxHTjVJZnFPMmFRSEhCMWsxTGl6OC1idnRVbUlVVXQ5cUM5WXBaaG9XUUNlYUoyVko0YnZIMzdQbUVVVmlJWXd6cDhfbWxiLTYwVlUyd1l0RXV6azg5d25YVjlOWGZ5YTlZc0dRSVdNZWdJT1NHWHhleDdHT2VOLWIzZ1Qtdm9teERpaHdpOGVOY05lWWRMRzFWM2VCcjZwaU44U2dSbTMwWEE3UGtaYmJWNEtyLXVmMlVLS05HLUtMZU1GVnhHRkVLUEdCS0gzZjQtZlI5WTVwWXJzT1FrbFFoU3dkYnNLN2d3Unh5S29tcEZhNHFuVGhNdyIsIm9hdXRoX3Rva2VuIjoiRUFBQnd6TGl4bmpZQkFEeXNxQXN5MmhzQ0xxdnZLSEttb0hwNkRGa0R3eFRDTm5QWkJVWkNaQ1ZndmZjUnV6R0VNUDFXdmpaQzBseDJXMXpjYXJzWkNsTmhaQlpCcWJKYVZ5bGZwNmRFbk9ZTlpDOTlsSW1wbmVNaHJMek5VbW1sSXlMRFpDdDRuQmxDSGhFMGlWSzRuN1BCVTg1REN4Y1pDQlZQeVNOQW1BakF0cHA2WkJTckhRcU1xN1FxdnFRcmNSOHR0ZmlmdUtYeno2R3FRWkRaRCIsImFsZ29yaXRobSI6IkhNQUMtU0hBMjU2IiwiaXNzdWVkX2F0IjoxNjMzOTY2ODcwfQ; ds_user_id=48925064246; csrftoken=fw0W7ZbXgYwucV7nrHPZuCD0ebiyso6B; sessionid=48925064246:lUCx3ukIUyeA6v:0; fbsr_124024574287414=F5ukFaGxzLLJJvhjPA4wtA0-fjPX1PRAwdF4CJMwKts.eyJ1c2VyX2lkIjoiMTAwMDY4NzIxMDQwOTgxIiwiY29kZSI6IkFRQVMxbXRjd0hGMjB6MERRalFqcFAxV2tua2hRWWxONktZeXFZZ21iZEx2MlE1b3h1LUpyek8tQW94WExhWEk0bUJULUFnU0dtYW04cm4zcEtub3dqRjlJZ1RvT0VkMlpvek4zdmNVSVB0WkRwbS0yV0RRMnI4UVJvOWxHTjVJZnFPMmFRSEhCMWsxTGl6OC1idnRVbUlVVXQ5cUM5WXBaaG9XUUNlYUoyVko0YnZIMzdQbUVVVmlJWXd6cDhfbWxiLTYwVlUyd1l0RXV6azg5d25YVjlOWGZ5YTlZc0dRSVdNZWdJT1NHWHhleDdHT2VOLWIzZ1Qtdm9teERpaHdpOGVOY05lWWRMRzFWM2VCcjZwaU44U2dSbTMwWEE3UGtaYmJWNEtyLXVmMlVLS05HLUtMZU1GVnhHRkVLUEdCS0gzZjQtZlI5WTVwWXJzT1FrbFFoU3dkYnNLN2d3Unh5S29tcEZhNHFuVGhNdyIsIm9hdXRoX3Rva2VuIjoiRUFBQnd6TGl4bmpZQkFEeXNxQXN5MmhzQ0xxdnZLSEttb0hwNkRGa0R3eFRDTm5QWkJVWkNaQ1ZndmZjUnV6R0VNUDFXdmpaQzBseDJXMXpjYXJzWkNsTmhaQlpCcWJKYVZ5bGZwNmRFbk9ZTlpDOTlsSW1wbmVNaHJMek5VbW1sSXlMRFpDdDRuQmxDSGhFMGlWSzRuN1BCVTg1REN4Y1pDQlZQeVNOQW1BakF0cHA2WkJTckhRcU1xN1FxdnFRcmNSOHR0ZmlmdUtYeno2R3FRWkRaRCIsImFsZ29yaXRobSI6IkhNQUMtU0hBMjU2IiwiaXNzdWVkX2F0IjoxNjMzOTY2ODcwfQ; rur="VLL\05448925064246\0541665502885:01f73210803fd6e0031530f83de8499877829726228c430ba2c773af865f0cea4f3f33e9"'
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
