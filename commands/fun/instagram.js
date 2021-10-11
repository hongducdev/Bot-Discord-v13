const { stripIndent } = require('common-tags');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js')
const cookies = 'mid=YUyLugALAAHU-6pB-5qjqaJOc91w; ig_did=CF2B6350-A645-4976-92A7-4426B92840E7; ig_nrcb=1; fbm_124024574287414=base_domain=.instagram.com; shbid="14488\05446944104896\0541665403430:01f7a42fd97f7f2ca2ccbc813649c49adfe6ff844d8b283226b4b6d9d2a9bce54d8886ff"; shbts="1633867430\05446944104896\0541665403430:01f77ef3ecc897d1512c1d872b474d358f8214a4f4c4221e8d30adcf9d9a3a37f2f16c99"; fbsr_124024574287414=ohcFR6YyNcy0DUDiQlahTspsnOegditbkhL6U9iGDqY.eyJ1c2VyX2lkIjoiMTAwMDY4NzIxMDQwOTgxIiwiY29kZSI6IkFRQjM0YndIOUpDVlhvNE5IWWhfcW9VS2hZZjg3a2J1QVNSSTBqU3pkUFNTSkZaRUNWQmYzZ0gyNHpfQ0o2SXprX0RTdWQ5UFd3OGduLVl1Zk5kZ1NURUJKc0RuSDljUFlIcWp0bGs4QURiMXpYVzRDLUN4WFY5WkMxSzhLYXRVLWJhU2JNQ1R1TGFWMWpnYXJ4eW9rNV9Qc0UwODZENXdyMXREYlRxNU5VSUZPZ21OZUZkUTRGckdPSXBEWDNKR3RjSVdTeWNwaU9JeWJGeVowTzQ2US1MUEhZOVpYXzNNejdiLUk2TE5hZHpIVTB5dmpwUXlJcFhaUll3Qm5KY1MwRmUxczRsRG1JeGo0c09fSEJZR3JRTElPeUcwSms2dFNvaU1yMkNfRmNSdUhoTm9jdWdSUGpLSG9YNlg4aWY1a0ZqT010aGJBUGtCV05RaVk1MUp3WVRqQzRMWlhLTmN4UmdPSnRndVZ0cE5KUSIsIm9hdXRoX3Rva2VuIjoiRUFBQnd6TGl4bmpZQkFPVmtaQzlTQ01NQnpGU1FHYlpCNFdLcHJ3WkMydEE3RnVaQkFOUHl4eFZOaElrTFhJYVc2cG9rVjNxem5tUWlkNTNBNGZiUlFZS2VHalFDWkJZc2FxSGd2YzRxYm5JemVaQkZtT1pCN3BxQjhmNGFGRURMMno1SlZSaW1peUUxRnNwWGwxYk5wWkNRcElidTV2dTg0ZmVlUUg2VDROaU1DMkFaQnFMS1hJYmtaQ0hMS0VTa1l5emhTSXA4d1hqbHF3WWdaRFpEIiwiYWxnb3JpdGhtIjoiSE1BQy1TSEEyNTYiLCJpc3N1ZWRfYXQiOjE2MzM5NjU4NTd9; ds_user_id=48925064246; csrftoken=AuUOtOJ3kzsD8UnoqoBt9nJ4xvN2yxST; sessionid=48925064246:Rb8nRMe8etbSJa:4; fbsr_124024574287414=ohcFR6YyNcy0DUDiQlahTspsnOegditbkhL6U9iGDqY.eyJ1c2VyX2lkIjoiMTAwMDY4NzIxMDQwOTgxIiwiY29kZSI6IkFRQjM0YndIOUpDVlhvNE5IWWhfcW9VS2hZZjg3a2J1QVNSSTBqU3pkUFNTSkZaRUNWQmYzZ0gyNHpfQ0o2SXprX0RTdWQ5UFd3OGduLVl1Zk5kZ1NURUJKc0RuSDljUFlIcWp0bGs4QURiMXpYVzRDLUN4WFY5WkMxSzhLYXRVLWJhU2JNQ1R1TGFWMWpnYXJ4eW9rNV9Qc0UwODZENXdyMXREYlRxNU5VSUZPZ21OZUZkUTRGckdPSXBEWDNKR3RjSVdTeWNwaU9JeWJGeVowTzQ2US1MUEhZOVpYXzNNejdiLUk2TE5hZHpIVTB5dmpwUXlJcFhaUll3Qm5KY1MwRmUxczRsRG1JeGo0c09fSEJZR3JRTElPeUcwSms2dFNvaU1yMkNfRmNSdUhoTm9jdWdSUGpLSG9YNlg4aWY1a0ZqT010aGJBUGtCV05RaVk1MUp3WVRqQzRMWlhLTmN4UmdPSnRndVZ0cE5KUSIsIm9hdXRoX3Rva2VuIjoiRUFBQnd6TGl4bmpZQkFPVmtaQzlTQ01NQnpGU1FHYlpCNFdLcHJ3WkMydEE3RnVaQkFOUHl4eFZOaElrTFhJYVc2cG9rVjNxem5tUWlkNTNBNGZiUlFZS2VHalFDWkJZc2FxSGd2YzRxYm5JemVaQkZtT1pCN3BxQjhmNGFGRURMMno1SlZSaW1peUUxRnNwWGwxYk5wWkNRcElidTV2dTg0ZmVlUUg2VDROaU1DMkFaQnFMS1hJYmtaQ0hMS0VTa1l5emhTSXA4d1hqbHF3WWdaRFpEIiwiYWxnb3JpdGhtIjoiSE1BQy1TSEEyNTYiLCJpc3N1ZWRfYXQiOjE2MzM5NjU4NTd9; rur="VLL\05448925064246\0541665502268:01f74c8d9dc2535a28ab8f4c9695a476d4c93570b00aea3272059b8724e4491c88beb0c2"'
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
