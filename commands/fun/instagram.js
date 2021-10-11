const { stripIndent } = require('common-tags');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js')
const cookies = 'mid=YUyLugALAAHU-6pB-5qjqaJOc91w; ig_did=CF2B6350-A645-4976-92A7-4426B92840E7; ig_nrcb=1; fbm_124024574287414=base_domain=.instagram.com; shbid="14488\05446944104896\0541665403430:01f7a42fd97f7f2ca2ccbc813649c49adfe6ff844d8b283226b4b6d9d2a9bce54d8886ff"; shbts="1633867430\05446944104896\0541665403430:01f77ef3ecc897d1512c1d872b474d358f8214a4f4c4221e8d30adcf9d9a3a37f2f16c99"; fbsr_124024574287414=L0jko0hMYYFgHPDZNw2mtbh965VdSXoseZRw2l6JJzU.eyJ1c2VyX2lkIjoiMTAwMDY4NzIxMDQwOTgxIiwiY29kZSI6IkFRQ1h5aTNnSlNTTlRXVkhtbE1rdlQwYk9UWHR3Z2hFbWx1UDZkMkkwVzJJdzZab0RLeDk4NzIxc1I5SWVTZEdWR3QzTHk0MzFxODhfMy1kOXhTQ3RKWTlncmNYalo5ZG41NVB2dTV5WWo1STVhSC04T01CYWNhb1FSYVRDQ1Q2ZjdHQVlqU0tjMkdfQzVHTmZrd1VBbmlRci1CbVBSblpRcmNVQjlHU2NvSTFMaHF4Y3pGNWlsTF82X01TZDBXQzViVnRnZ3hramprdzlaa1psX1VrSTI3Nl9uYmZhdktScVJaSWtlaTJPLVYzSzQ3Q3g0Sl9weXhObDJrano2a002NXR6S2c1NnJBcTJ6cWd2X0M3emxnR1k1NkxTM1dJNmFWMlpvR2J1OGJ3UExFLVYwdUNURmFuWnRxVGdsVGVKUlBRb3FsS0t6b2lhcFdaSDJuZDV2cVgxeV9COTBQSW12RWlDV3dObk5Oalc4ZyIsIm9hdXRoX3Rva2VuIjoiRUFBQnd6TGl4bmpZQkFIT3RLU1E2bU1paHBwcjJJZmxQSGczWkJMZ1RTTG51V1lVT0hCOTR6amFQckk2VUtibjV6a0JXMkp4alJGYlhlVTJjQ2ZXcXlFemJFWHpKRkhzZ1Y2ZWlBVUZYQ0VpaDlIT1RaQnU1WkJhZzhHbnBzQXI0SmRDZ3o2SG1rRlB1S0g3U0FLYnU2dm1mSFF1ejdZdUpMVU52amxkQlNyeUtuVEdvcHhQM2tmVkowclhXNkVXb0VPY05FWkNJMGdaRFpEIiwiYWxnb3JpdGhtIjoiSE1BQy1TSEEyNTYiLCJpc3N1ZWRfYXQiOjE2MzM5NjM4MTF9; csrftoken=FNV3hKwFrjqmB5tBK0xio2S8e9XgDHCy; ds_user_id=48925064246; sessionid=48925064246:oJP7e4AJE73UcR:13; fbsr_124024574287414=L0jko0hMYYFgHPDZNw2mtbh965VdSXoseZRw2l6JJzU.eyJ1c2VyX2lkIjoiMTAwMDY4NzIxMDQwOTgxIiwiY29kZSI6IkFRQ1h5aTNnSlNTTlRXVkhtbE1rdlQwYk9UWHR3Z2hFbWx1UDZkMkkwVzJJdzZab0RLeDk4NzIxc1I5SWVTZEdWR3QzTHk0MzFxODhfMy1kOXhTQ3RKWTlncmNYalo5ZG41NVB2dTV5WWo1STVhSC04T01CYWNhb1FSYVRDQ1Q2ZjdHQVlqU0tjMkdfQzVHTmZrd1VBbmlRci1CbVBSblpRcmNVQjlHU2NvSTFMaHF4Y3pGNWlsTF82X01TZDBXQzViVnRnZ3hramprdzlaa1psX1VrSTI3Nl9uYmZhdktScVJaSWtlaTJPLVYzSzQ3Q3g0Sl9weXhObDJrano2a002NXR6S2c1NnJBcTJ6cWd2X0M3emxnR1k1NkxTM1dJNmFWMlpvR2J1OGJ3UExFLVYwdUNURmFuWnRxVGdsVGVKUlBRb3FsS0t6b2lhcFdaSDJuZDV2cVgxeV9COTBQSW12RWlDV3dObk5Oalc4ZyIsIm9hdXRoX3Rva2VuIjoiRUFBQnd6TGl4bmpZQkFIT3RLU1E2bU1paHBwcjJJZmxQSGczWkJMZ1RTTG51V1lVT0hCOTR6amFQckk2VUtibjV6a0JXMkp4alJGYlhlVTJjQ2ZXcXlFemJFWHpKRkhzZ1Y2ZWlBVUZYQ0VpaDlIT1RaQnU1WkJhZzhHbnBzQXI0SmRDZ3o2SG1rRlB1S0g3U0FLYnU2dm1mSFF1ejdZdUpMVU52amxkQlNyeUtuVEdvcHhQM2tmVkowclhXNkVXb0VPY05FWkNJMGdaRFpEIiwiYWxnb3JpdGhtIjoiSE1BQy1TSEEyNTYiLCJpc3N1ZWRfYXQiOjE2MzM5NjM4MTF9; rur="VLL\05448925064246\0541665499847:01f7232a02029fa12944e709a04dde1a51ef8b91093a8c7fa83a2c9e0b52242532abbbbf"'
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
                **- Tài khoản riêng tư:** ${account.is_private ? "Có✅" : "Không❌"}
                **- Tài khoản được xác minh:** ${account.is_verified ? "Có✅" : "Không❌"}`);

        message.reply({ embeds: [embed] })
    }
}