require(`../connection/settings.js`)
const { baileys, proto, generateWAMessage, generateWAMessageFromContent, getContentType, prepareWAMessageMedia } = require("@whiskeysockets/baileys")
const { getGroupAdmins, fetchJson, reSize, generateProfilePicture, sleep, runtime, tanggal } = require("../lib/functions.js")
const { exec, spawn, execSync } = require("child_process")
const cheerio = require("cheerio")
const chalk = require("chalk")
const crypto = require("crypto")
const util = require("util")
const axios = require("axios")
const fs = require("fs")
const syntaxerror = require("syntax-error")
const Jimp = require("jimp")
const path = require("path")
const PhoneNumber = require("awesome-phonenumber")
const speed = require("performance-now")
const moment = require("moment-timezone")
const owner = JSON.parse(fs.readFileSync("./src/database/owner.json"))
const datuser = JSON.parse(fs.readFileSync("./src/database/user.json"))

module.exports = hyuuxyz = async (hyuuxyz, msg, chatUpdate, store) => {
try {
const type = getContentType(msg.message)
const content = JSON.stringify(msg.message)
const from = msg.key.remoteJid
const quoted = msg.quoted ? msg.quoted : msg
const mime = (quoted.msg || quoted).mimetype || ''
const body = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type == 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type == 'documentMessage') && msg.message.documentMessage.caption ? msg.message.documentMessage.caption : (type == 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type == 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type == 'buttonsResponseMessage' && msg.message.buttonsResponseMessage.selectedButtonId) ? msg.message.buttonsResponseMessage.selectedButtonId : (type == 'templateButtonReplyMessage') && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : ''
const budy = (typeof msg.text == 'string' ? msg.text : '')
const prefix = "."
const isCmd = body.startsWith(prefix)
const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const text = q = args.join(" ")
const isGroup = from.endsWith('@g.us')
const groupMetadata = isGroup? await hyuuxyz.groupMetadata(msg.chat).catch(e => {}) : ""
const groupOwner = isGroup? groupMetadata.owner : ""
const participants = isGroup? await groupMetadata.participants : ""
const groupAdmins = isGroup? await participants.filter(v => v.admin !== null).map(v => v.id) : ""
const groupMembers = isGroup? groupMetadata.participants : ""
const isGroupAdmins = isGroup? groupAdmins.includes(msg.sender) : false
const botNumber = await hyuuxyz.decodeJid(hyuuxyz.user.id)
const isBotGroupAdmins = isGroup ? groupAdmins.includes(botNumber) : false
const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false
const isAdmins = isGroup ? groupAdmins.includes(msg.sender) : false
const sender = msg.key.fromMe ? (hyuuxyz.user.id.split(':')[0]+'@s.whatsapp.net' || hyuuxyz.user.id) : (msg.key.participant || msg.key.remoteJid)
const senderNumber = sender.split('@')[0]
const pushname = msg.pushName || "No Name";
const isBot = botNumber.includes(senderNumber)
const ItsMeHyuu = owner.includes(senderNumber) || isBot
const jamwib = await moment.tz('Asia/Jakarta').format('HH')
const menitwib = await moment.tz('Asia/Jakarta').format('mm')
const detikwib = await moment.tz('Asia/Jakarta').format('ss')
const dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
const kays = (`${jamwib}:${menitwib}:${detikwib}`)

const time2 = moment().tz("Asia/Jakarta").format("HH:mm:ss");
    if (time2 < "23:59:00") {
      var ucapanWaktu = "Selamat Malam 🌌";
    }
    if (time2 < "19:00:00") {
      var ucapanWaktu = "Selamat Sore 🌃";
    }
    if (time2 < "18:00:00") {
      var ucapanWaktu = "Selamat Sore 🌅";
    }
    if (time2 < "15:00:00") {
      var ucapanWaktu = "Selamat Siang 🏙";
    }
    if (time2 < "11:00:00") {
      var ucapanWaktu = "Selamat Pagi 🌄";
    }
    if (time2 < "05:00:00") {
      var ucapanWaktu = "Selamat Pagi 🌉";
    }
    const tahunBaru = new Date("January 1, 2024 00:00:00");
    const sekarang = new Date().getTime();
    const Selisih = tahunBaru - sekarang;
    const jhari = Math.floor(Selisih / (1000 * 60 * 60 * 24));
    const jjam = Math.floor(
      (Selisih % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const jmenit = Math.floor((Selisih % (1000 * 60 * 60)) / (1000 * 60));
    const jdetik = Math.floor((Selisih % (1000 * 60)) / 1000);
    const ulngthn = new Date("October 31, 2023 00:00:00");
    const ayeuna = new Date().getTime();
    const ceIroh = ulngthn - ayeuna;
    const hahari = Math.floor(ceIroh / (1000 * 60 * 60 * 24));
    const hajam = Math.floor(
      (ceIroh % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const hamenit = Math.floor((ceIroh % (1000 * 60 * 60)) / (1000 * 60));
    const hadetik = Math.floor((ceIroh % (1000 * 60)) / 1000);
    const idulAdha = new Date("Juni 29, 2023 00:00:00");
    const nembe = new Date().getTime();
    const ceDadah = idulAdha - nembe;
    const hihari = Math.floor(ceDadah / (1000 * 60 * 60 * 24));
    const hijam = Math.floor(
      (ceDadah % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const himenit = Math.floor((ceDadah % (1000 * 60 * 60)) / (1000 * 60));
    const hidetik = Math.floor((ceDadah % (1000 * 60)) / 1000);

const getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (err) {
		return err
	}
}

// Database
const contacts = JSON.parse(fs.readFileSync("./src/database/contacts.json"))
const isContacts = contacts.includes(sender)

const parseMention = (text = '') => {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}

const isUrl = (url) => {
return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'))
}

const createSerial = (size) => {
return crypto.randomBytes(size).toString('hex').slice(0, size)
}

const color = (text, color) => { return !color ? chalk.green(text) : chalk.keyword(color)(text) }

const makeid = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
    charactersLength));
    }
    return result
}

if (isCmd && msg.isGroup) { 
console.log(chalk.bold.rgb(255, 178, 102)('\x1b[1;31m~\x1b[1;37m> [\x1b[1;32mCMD\x1b[1;37m]'), chalk.bold.rgb(153, 255, 153)(command), chalk.bold.rgb(204, 204, 0)("from"), chalk.bold.rgb(153, 255, 204)(pushname), chalk.bold.rgb(204, 204, 0)("in"), chalk.bold.rgb(255, 178, 102)("Group Chat"), chalk.bold('[' + args.length + ']')); 
}

if (isCmd && !msg.isGroup) { 
console.log(chalk.bold.rgb(255, 178, 102)('\x1b[1;31m~\x1b[1;37m> [\x1b[1;32mCMD\x1b[1;37m]'), chalk.bold.rgb(153, 255, 153)(command), chalk.bold.rgb(204, 204, 0)("from"), chalk.bold.rgb(153, 255, 204)(pushname), chalk.bold.rgb(204, 204, 0)("in"), chalk.bold.rgb(255, 178, 102)("Private Chat"), chalk.bold('[' + args.length + ']')); 
}

try {
ppuser = await hyuuxyz.profilePictureUrl(sender, 'image')
} catch (err) {
ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}
let list = []
for (let i of owner) {
list.push({
displayName: await hyuuxyz.getName(i + '@s.whatsapp.net'),
vcard: `BEGIN:VCARD\n
VERSION:3.0\n
N:${await hyuuxyz.getName(i + '@s.whatsapp.net')}\n
FN:${await hyuuxyz.getName(i + '@s.whatsapp.net')}\n
item1.TEL;waid=${i}:${i}\n
item1.X-ABLabel:Ponsel\n
item2.EMAIL;type=INTERNET:tesheroku123@gmail.com\n
item2.X-ABLabel:Email\n
item3.URL:https://bit.ly/39Ivus6\n
item3.X-ABLabel:YouTube\n
item4.ADR:;;Indonesia;;;;\n
item4.X-ABLabel:Region\n
END:VCARD`
})
}

const fkontak = { key: {fromMe: false,participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { 'contactMessage': { 'displayName': `𝐇𝐲𝐮𝐮𝐃𝐞𝐯`, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;𝐇𝐲𝐮𝐮-𝐁𝐨𝐭𝐳,;;;\nFN:${pushname},\nitem1.TEL;waid=${sender.split('@')[0]}:${sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 'jpegThumbnail': { url: 'https://telegra.ph/file/2df85f799cddaed71413c.jpg' }}}}

const reply = (teks) => {
return hyuuxyz.sendMessage(from, { text: teks, contextInfo:{"externalAdReply": {"title": `${BotName}`,"body": `${ucapanWaktu} Kak ${pushname}`, "previewType": "PHOTO","thumbnailUrl": 'https://telegra.ph/file/2df85f799cddaed71413c.jpg',"thumbnail": thumb,"sourceUrl": `https://youtube.com/c/HwModsWa857`}}}, { quoted:msg})}

const meki = await getBuffer(ppuser)

switch (command) {
case "menu": {
owned = `${nomerOwner}@s.whatsapp.net`
menuu = `
「 *BOT INFO* 」
»⟩ Bot Name : *${global.BotName}*
»⟩ Owner Name : *${global.OwnerName}*
»⟩ Owner Number : @${global.nomerOwner}
»⟩ Runtime : *${runtime(process.uptime())}*

┌❐   *「 DEVELOPER 」*
│ ◦ .pushid
│ ◦ .push
│ ◦ .pushv2
│ ◦ .cekidgc
│ ◦ .jpm
│ ◦ .pushidv2
│ ◦ .savekonv1
│ ◦ .savekonv2
│ ◦ .jpm
│ ◦ .jpm2
│ ◦ .jpm3
└──>

┌❐   *「 CPANEL 」*
│ ◦ .createadmin
│ ◦ .listadmi
│ ◦ .listusr
│ ◦ .listsrv
│ ◦ .1gb user,628xx
│ ◦ .2gb user,628xx
│ ◦ .3gb user,628xx
│ ◦ .4gb user,628xx
│ ◦ .5gb user,628xx
│ ◦ .6gb user,628xx
│ ◦ .7gb user,628xx
│ ◦ .8gb user,628xx
│ ◦ .unli user,628xx
└────────┈ꕥ

┌❐   *「 OTHERS 」*
│ ◦ .informasi
│ ◦ .owner
│ ◦ .subdomain
└────────┈ꕥ

– ɴᴏᴛᴇ :
_sᴄʀɪᴘᴛ ᴍᴀsɪʜ ᴅᴀʟᴀᴍ ᴘᴇɴɢᴇᴍʙᴀɴɢᴀɴ_

*ꜱɪᴍᴘʟᴇ ʙᴏᴛ ʙʏ ʜʏᴜᴜ ᴏғғᴄ*
▬▭▬▭▬▭▬▭▬▭▬▭▬`
let msg = require('@whiskeysockets/baileys').generateWAMessageFromContent(
    m.chat,
    {     
      interactiveMessage: {          
        body: {         
          text: "I Am An Automated System (Whatsap Bot) That Can Help To Do Something, Search And Get Data / Information Only Through Whatsapp."
        },     
        footer: {
          text: menuu
        },     
        header: {   
          title: `${ucapanWaktu}`,
          hasMediaAttachment: false,
...(await require ('@whiskeysockets/baileys').prepareWAMessageMedia({ video: fs.readFileSync('./src/photo/menu.mp4')}, { upload: hyuuxyz.waUploadToServer }))
        },    
        nativeFlowMessage: {
          buttons: []    
        }   
      }  
    }, 
    {}
  )
  await hyuuxyz.relayMessage(m.chat, msg.message, {quoted:m})
}
break

//=================================================//
case "tess": case "informasi":
owned = `${global.nomerOwner}@s.whatsapp.net`
if (!q) return reply(mess.inf)
break
//=================================================//
case "owner":{
const repf = await hyuuxyz.sendMessage(from, { 
contacts: { 
displayName: `${list.length} Kontak`, 
contacts: list }}, { quoted: msg })
hyuuxyz.sendMessage(from,{text:`Hai Kak @${sender.split("@")[0]}\nMau Beli Vps Atau Jasa Instal Panel?\nChat Owner Ku Aja.`,mentions:[sender]},{quoted:repf})
}
break
//=================================================//
case "cekidgc": {
if (!ItsMeHyuu) return reply(mess.owner)
await reply('*Wait Sedang Memuat Data...*')
let getGroups = await hyuuxyz.groupFetchAllParticipating()
let groups = Object.entries(getGroups).slice(0).map((entry) => entry[1])
let anu = groups.map((v) => v.id)
let teks = `𝗜𝗡𝗙𝗢 𝗚𝗥𝗢𝗨𝗣 𝗔𝗡𝗗𝗔\n\n*Total Group :* ${anu.length} GROUP\n\n`
for (let x of anu) {
let metadata2 = await hyuuxyz.groupMetadata(x)
teks += `𝗗𝗔𝗧𝗔 𝗚𝗥𝗢𝗨𝗣\n ◉ *NAMA* : ${metadata2.subject}\n ◉ *ID* : ${metadata2.id}\n ◉ *MEMBER* : ${metadata2.participants.length}\n\n`
}
reply(teks + `*NOTE⚠️*\nsilahkan salin salah satu id group\ndi atas untuk melakukan push\n\ntutor push nya :\n.pushid ID|teks\n.pushv2 ID|jeda|teks`)
}
break
//=================================================//
case 'bcgc': case 'jpm': {
if (!ItsMeHyuu) return reply('Lu Siapa?')
if (!text) throw `Text mana?\n\nExample : ${prefix + command} Need Vps? Cet Hyuu`
let getGroups = await hyuuxyz.groupFetchAllParticipating()
let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
let anu = groups.map(v => v.id)
reply(`Mengirim Broadcast Ke ${anu.length} Group Chat, Waktu Selesai ${anu.length * 1.5} detik`)
for (let i of anu) {
await sleep(1500)
hyuuxyz.sendMessage(i, {text: `${text}`}, {quoted:m})
    }
reply(`Sukses Mengirim Broadcast Ke ${anu.length} Group`)
}
break
//=================================================//
case "jpmhidetag": case "jpm2": {
if (!ItsMeHyuu) return reply(`Jir Lu Siapa Cok`)
if (!text) return reply(`*Penggunaan Salah Silahkan Gunakan Seperti Ini*\n${prefix+command} teks|jeda\n\nReply Gambar Untuk Mengirim Gambar Ke Semua Group\nUntuk Jeda Itu Delay Jadi Nominal Jeda Itu 1000 = 1 detik`)
let getGroups = await hyuuxyz.groupFetchAllParticipating()
let groups = Object.entries(getGroups).slice(0).map((entry) => entry[1])
let anu = groups.map((v) => v.id)
for (let xnxx of anu) {
let metadat72 = await hyuuxyz.groupMetadata(xnxx)
let participanh = await metadat72.participants
if (/image/.test(mime)) {
media = await hyuuxyz.downloadAndSaveMediaMessage(quoted)
mem = await uptotelegra(media)
await hyuuxyz.sendMessage(xnxx, { image: { url: mem }, caption: text.split('|')[0], mentions: participanh.map(a => a.id) })
await sleep(text.split('|')[1])
} else {
await hyuuxyz.sendMessage(xnxx, { text: text.split('|')[0], mentions: participanh.map(a => a.id) })
await sleep(text.split('|')[1])
}}
reply(`Sukses Mengirim Broadcast Ke ${anu.length} Group`)
}
break
//=================================================//
case "jpmimg": case "jpm3": {
if (!ItsMeHyuu) return reply(`Lu Hyuu Kah?`)
if (!text) return reply(`*Penggunaan Salah Silahkan Gunakan Seperti Ini*\n${prefix+command} teks|jeda\n\nReply Gambar Untuk Mengirim Gambar Ke Semua Group\nUntuk Jeda Itu Delay Jadi Nominal Jeda Itu 1000 = 1 detik`)
let getGroups = await hyuuxyz.groupFetchAllParticipating()
let groups = Object.entries(getGroups).slice(0).map((entry) => entry[1])
let anu = groups.map((v) => v.id)
for (let xnxx of anu) {
if (/image/.test(mime)) {
media = await hyuuxyz.downloadAndSaveMediaMessage(quoted)
mem = await uptotelegra(media)
await hyuuxyz.sendMessage(xnxx, { image: { url: mem }, caption: text.split('|')[0] })
await sleep(text.split('|')[1])
} else {
await hyuuxyz.sendMessage(xnxx, { text: text.split('|')[0] })
await sleep(text.split('|')[1])
}}
reply(`Sukses Mengirim Broadcast Ke ${anu.length} Group`)
}
break
//=================================================//
case "push":{
if (!ItsMeHyuu) return reply(mess.owner)
if (isGroup) return reply(mess.priv)
if (!text) return reply(`Cara Pakai Nya\n${prefix+command} teks push nya`)
await reply(mess.proses)
const groupMetadataa = !isGroup? await hyuuxyz.groupMetadata(`${text.split("|")[0]}`).catch(e => {}) : ""
const participants = !isGroup? await groupMetadataa.participants : ""
const halls = await participants.filter(v => v.id.endsWith('.net')).map(v => v.id)
global.tekspushkon = text.split("|")[1]
for (let mem of halls) {
if (isContacts) return
contacts.push(mem)
fs.writeFileSync('./src/database/contacts.json', JSON.stringify(contacts))
if (/image/.test(mime)) {
media = await hyuuxyz.downloadAndSaveMediaMessage(quoted)
memk = await uptotelegra(media)
await hyuuxyz.sendMessage(mem, { image: { url: memk }, caption: global.tekspushkon })
await sleep(3000)
} else {
await hyuuxyz.sendMessage(mem, { text: global.tekspushkon })
await sleep(3000)
}
}
try {
const uniqueContacts = [...new Set(contacts)];
const vcardContent = uniqueContacts.map((contact, index) => {
const vcard = [
"BEGIN:VCARD",
"VERSION:3.0",
`FN:WA[${createSerial(2)}] ${contact.split("@")[0]}`,
`TEL;type=CELL;type=VOICE;waid=${contact.split("@")[0]}:+${contact.split("@")[0]}`,
"END:VCARD",
"", ].join("\n");
return vcard; }).join("");
fs.writeFileSync("./src/database/contacts.vcf", vcardContent, "utf8");
} catch (err) {
reply(util.format(err))
} finally {
await hyuuxyz.sendMessage(from, { document: fs.readFileSync("./src/database/contacts.vcf"), fileName: "contacts.vcf", caption: "Nih Kak Tinggal Pencet File Di Atas Terus Save", mimetype: "text/vcard", }, { quoted: m })
contacts.splice(0, contacts.length)
fs.writeFileSync("./src/database/contacts.json", JSON.stringify(contacts))
}
}
break
//=================================================//
case "pushid":{
if (!ItsMeHyuu) return reply(mess.owner)
if (!msg.isGroup) return reply(mess.group)
if (!text) return reply(`𝗣𝗘𝗡𝗚𝗚𝗨𝗡𝗔 𝗦𝗔𝗟𝗔𝗛
silahkan ketik kan seperti ini
.pushid *teks*`)
await reply(mess.proses)
const groupMetadata = isGroup? await hyuuxyz.groupMetadata(from).catch(e => {}) : ""
const groupOwner = isGroup? groupMetadata.owner : ""
const participantts = isGroup? await groupMetadata.participants : ""
const halsss = await participantts.filter(v => v.id.endsWith('.net')).map(v => v.id)
global.tekspushkonv1 = text
for (let men of halsss) {
if (isContacts) return
contacts.push(men)
fs.writeFileSync('./src/database/contacts.json', JSON.stringify(contacts))
if (/image/.test(mime)) {
media = await hyuuxyz.downloadAndSaveMediaMessage(quoted)
mem = await uptotelegra(media)
await hyuuxyz.sendMessage(men, { image: { url: mem }, caption: global.tekspushkonv1 })
await sleep(3000)
} else {
await hyuuxyz.sendMessage(men, { text: global.tekspushkonv1 })
await sleep(3000)
}
}
reply('*𝗗𝗢𝗡𝗘*\nFile save otomatis dah di send ke chat pribadi')
try {
const uniqueContacts = [...new Set(contacts)];
const vcardContent = uniqueContacts.map((contact, index) => {
const vcard = [
"BEGIN:VCARD",
"VERSION:3.0",
`FN:WA[${createSerial(2)}] ${contact.split("@")[0]}`,
`TEL;type=CELL;type=VOICE;waid=${contact.split("@")[0]}:+${contact.split("@")[0]}`,
"END:VCARD",
"", ].join("\n");
return vcard; }).join("");
fs.writeFileSync("./src/database/contacts.vcf", vcardContent, "utf8");
} catch (err) {
reply(util.format(err))
} finally {
await hyuuxyz.sendMessage(sender, { document: fs.readFileSync("./src/database/contacts.vcf"), fileName: "contacts.vcf", caption: "ini tuan file nya\n\n𝗧𝗨𝗧𝗢𝗥 𝗦𝗔𝗩𝗘-𝗢𝗧𝗢𝗠\n- download file\n- pencet file \n- import ke kontak\n- pilih email\n- done", mimetype: "text/vcard", }, { quoted: m })
contacts.splice(0, contacts.length)
fs.writeFileSync("./src/database/contacts.json", JSON.stringify(contacts))
}
}
break
//=================================================//
case "pushidv2":
if (!ItsMeHyuu) return reply(mess.owner)
if (!q) return reply('𝘂𝗻𝘁𝘂𝗸 𝗽𝗲𝗻𝗴𝗴𝘂𝗻𝗮𝗮𝗻\n𝘀𝗶𝗹𝗮𝗵𝗸𝗮𝗻 𝗸𝗲𝘁𝗶𝗸𝗮𝗻 𝘀𝗲𝗽𝗲𝗿𝘁𝗶 𝗶𝗻𝗶\n\n.pushkon *ID|JEDA|Tekspush*\n\ncontoh : \n.pushkonv2 73926917@g.us|2000|SV fox\n1000 = 1 detik\n\n𝘂𝗻𝘁𝘂𝗸 𝗺𝗲𝗹𝗶𝗵𝗮𝘁 𝗜𝗗\n𝘀𝗶𝗹𝗮𝗵𝗸𝗮𝗻 𝗸𝗲𝘁𝗶𝗸𝗮𝗻 .𝗰𝗲𝗸𝗶𝗱𝗴𝗰')
await reply(mess.proses)
const groupMetadataa = !isGroup? await hyuuxyz.groupMetadata(`${q.split("|")[0]}`).catch(e => {}) : ""
const participantss = !isGroup? await groupMetadataa.participants : ""
const halls = await participantss.filter(v => v.id.endsWith('.net')).map(v => v.id)
global.tekspushkonv2 = q.split("|")[2]
for (let mem of halls) {
if (/image/.test(mime)) {
media = await hyuuxyz.downloadAndSaveMediaMessage(quoted)
memk = await uptotelegra(media)
await hyuuxyz.sendMessage(mem, { image: { url: memk }, caption: global.tekspushkonv2 })
await sleep(q.split("|")[1])
} else {
await hyuuxyz.sendMessage(mem, { text: global.tekspushkonv2 })
await sleep(q.split("|")[1])
}
}
reply(mess.sukses)
break
//=================================================//
case "pushv2":
if (!ItsMeHyuu) return reply(mess.owner)
if (!msg.isGroup) return reply(mess.group)
if (!text) return reply(`𝗣𝗘𝗡𝗚𝗚𝗨𝗡𝗔 𝗦𝗔𝗟𝗔𝗛
silahkan ketik kan seperti ini
.pushidv2 *jeda|teks*

contoh : 
.pushidv2 2000|save hyuu
1000 = 1 detik`)
await reply(mess.proses)
const halsss = await participants.filter(v => v.id.endsWith('.net')).map(v => v.id)
global.tekspushkonv3 = text.split("|")[1]
for (let men of halsss) {
if (/image/.test(mime)) {
media = await hyuuxyz.downloadAndSaveMediaMessage(quoted)
mem = await uptotelegra(media)
await hyuuxyz.sendMessage(men, { image: { url: mem }, caption: global.tekspushkonv3 })
await sleep(text.split("|")[0])
} else {
await hyuuxyz.sendMessage(men, { text: global.tekspushkonv3 })
await sleep(text.split("|")[0])
}
}
reply(mess.sukses)
break
//=================================================//
case "savekonv1": {
if (!ItsMeHyuu) return reply(mess.owner)
if (!msg.isGroup) return reply(mess.group)
await reply(mess.proses)
const groupMetadata = isGroup? await hyuuxyz.groupMetadata(from).catch(e => {}) : ""
const groupOwner = isGroup? groupMetadata.owner : ""
const participantts = isGroup? await groupMetadata.participants : ""
const halsss = await participantts.filter(v => v.id.endsWith('.net')).map(v => v.id)
for (let men of halsss) {
if (isContacts) return
contacts.push(men)
fs.writeFileSync('./src/database/contacts.json', JSON.stringify(contacts))
}
reply("*𝗗𝗢𝗡𝗘*\nFile save otomatis dah di send ke chat pribadi")
try {
const uniqueContacts = [...new Set(contacts)];
const vcardContent = uniqueContacts.map((contact, index) => {
const vcard = [
"BEGIN:VCARD",
"VERSION:3.0",
`FN:WA[${createSerial(2)}] ${contact.split("@")[0]}`,
`TEL;type=CELL;type=VOICE;waid=${contact.split("@")[0]}:+${contact.split("@")[0]}`,
"END:VCARD",
"", ].join("\n");
return vcard; }).join("");
fs.writeFileSync("./src/database/contacts.vcf", vcardContent, "utf8");
} catch (err) {
reply(util.format(err))
} finally {
await hyuuxyz.sendMessage(sender, { document: fs.readFileSync("./src/database/contacts.vcf"), fileName: "contacts.vcf", caption: "ini tuan file nya\n\n𝗧𝗨𝗧𝗢𝗥 𝗦𝗔𝗩𝗘-𝗢𝗧𝗢𝗠\n- download file\n- pencet file \n- import ke kontak\n- pilih email\n- done", mimetype: "text/vcard", }, { quoted: m })
contacts.splice(0, contacts.length)
fs.writeFileSync("./src/database/contacts.json", JSON.stringify(contacts))
}
}
break
//=================================================//
case "savekonv2": {
if (!ItsMeHyuu) return reply(mess.owner)
if (isGroup) return reply(mess.priv)
if (!text) return reply(`𝗣𝗘𝗡𝗚𝗚𝗨𝗡𝗔 𝗦𝗔𝗟𝗔𝗛
silahkan ketik kan seperti ini
.savekonv1 ID

untuk mengecek ID 
silahkan ketik .cekidgc`)
await reply(mess.proses)
const groupMetadataa = !isGroup? await hyuuxyz.groupMetadata(`${text}`).catch(e => {}) : ""
const participants = !isGroup? await groupMetadataa.participants : ""
const halls = await participants.filter(v => v.id.endsWith('.net')).map(v => v.id)
for (let mem of halls) {
if (isContacts) return
contacts.push(mem)
fs.writeFileSync('./src/database/contacts.json', JSON.stringify(contacts))
}
try {
const uniqueContacts = [...new Set(contacts)];
const vcardContent = uniqueContacts.map((contact, index) => {
const vcard = [
"BEGIN:VCARD",
"VERSION:3.0",
`FN:WA[${createSerial(2)}] ${contact.split("@")[0]}`,
`TEL;type=CELL;type=VOICE;waid=${contact.split("@")[0]}:+${contact.split("@")[0]}`,
"END:VCARD",
"", ].join("\n");
return vcard; }).join("");
fs.writeFileSync("./src/database/contacts.vcf", vcardContent, "utf8");
} catch (err) {
reply(util.format(err))
} finally {
await hyuuxyz.sendMessage(from, { document: fs.readFileSync("./src/database/contacts.vcf"), fileName: "contacts.vcf", caption: "Sukses Tinggal Save Ya Kakak", mimetype: "text/vcard", }, { quoted: m })
contacts.splice(0, contacts.length)
fs.writeFileSync("./src/database/contacts.json", JSON.stringify(contacts))
}
}
break

//=================================================//
// cpanel
case "createadmin": {
if (!ItsMeHyuu) return reply(`Jirr Lu Siapa Cukk`)
let s = q.split(',')
let email = s[0];
let username = s[0]
let nomor = s[1]
if (s.length < 2) return reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
if (!username) return reply(`Ex : ${prefix+command} Username,@tag/nomor\n\nContoh :\n${prefix+command} example,@user`)
if (!nomor) return reply(`Ex : ${prefix+command} Username,@tag/nomor\n\nContoh :\n${prefix+command} example,@user`)
let password = username + "019"
let nomornya = nomor.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": username + "@gmail.com",
"username": username,
"first_name": username,
"last_name": "Admin Panel HyuuOffc",
"language": "en",
 "root_admin" : true,  
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let tks = `
TYPE: user

📡ID: ${user.id}
🌷UUID: ${user.uuid}
👤USERNAME: ${user.username}
📬EMAIL: ${user.email}
🦖NAME: ${user.first_name} ${user.last_name}
🔥LANGUAGE: ${user.language}
📊ADMIN: ${user.root_admin}
☢️CREATED AT: ${user.created_at}

🖥️LOGIN: ${domain}
`
const listMessage = {
text: tks,
    }
await hyuuxyz.sendMessage(m.chat, listMessage)
await hyuuxyz.sendMessage(nomornya, {
text: `*BERIKUT DETAIL AKUN ADMIN  PANEL ANDA*\n

┌⁠──────────⁠─────────
○
○ ID : ${user.id}
○ EMAIL : ${user.email}
○ USERNAME : ${user.username}
○ PASSWORD : ${password.toString()}
○ ️LOGIN : ${domain}
○
└──────────⁠─────────

*NOTE :*
_JANHAN RUSUH DI PANEL_
_JANGAN MENGOTAK ATIK SETTINGAN PANEL_
_JANGAN UBAH TEMA PANEL_
_JANGAN BUKA PANEL MILIK ORANG LAIN_

*KETAUAN? SUNG DELETE ADMIN PANEL*
*NO GARANSI & NO REFF*
`,
})
} 
break
//=================================================//
case "listadmin": {
  if (!ItsMeHyuu) return reply(`Maaf, Anda tidak dapat melihat daftar pengguna.`);
  let page = args[0] ? args[0] : '1';
  let f = await fetch(domain + "/api/application/users?page=" + page, {
    "method": "GET",
    "headers": {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apikey
    }
  });
  let res = await f.json();
  let users = res.data;
  let messageText = "Berikut list admin:\n\n";

  for (let user of users) {
    let u = user.attributes;
    if (u.root_admin) {
      messageText += `ID: ${u.id} - Status: ${u.attributes?.user?.server_limit === null ? 'Inactive' : 'Active'}\n`;
      messageText += `${u.username}\n`;
      messageText += `${u.first_name} ${u.last_name}\n\n`;
    }
  }

  messageText += `Page: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
  messageText += `Total Admin: ${res.meta.pagination.count}`;

  await hyuuxyz.sendMessage(m.chat, { text: messageText }, { quoted: m });

  if (res.meta.pagination.current_page < res.meta.pagination.total_pages) {
    reply(`Gunakan perintah ${prefix}listusr ${res.meta.pagination.current_page + 1} untuk melihat halaman selanjutnya.`);
  }
}
break
case "listsrv": {
  if (!ItsMeHyuu) return reply(`Maaf, Anda tidak dapat melihat daftar server.`);
  let page = args[0] ? args[0] : '1';
  let f = await fetch(domain + "/api/application/servers?page=" + page, {
    "method": "GET",
    "headers": {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apikey
    }
  });
  let res = await f.json();
  let servers = res.data;
  let sections = [];
  let messageText = "Berikut adalah daftar server:\n\n";
  
  for (let server of servers) {
    let s = server.attributes;
    
    let f3 = await fetch(domain + "/api/client/servers/" + s.uuid.split`-`[0] + "/resources", {
      "method": "GET",
      "headers": {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + capikey
      }
    });
    
    let data = await f3.json();
    let status = data.attributes ? data.attributes.current_state : s.status;
    
    messageText += `ID Server: ${s.id}\n`;
    messageText += `Nama Server: ${s.name}\n`;
    messageText += `Status: ${status}\n\n`;
  }
  
  messageText += `Halaman: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
  messageText += `Total Server: ${res.meta.pagination.count}`;
  
  await hyuuxyz.sendMessage(m.chat, { text: messageText }, { quoted: m });
  
  if (res.meta.pagination.current_page < res.meta.pagination.total_pages) {
    reply(`Gunakan perintah ${prefix}listsrv ${res.meta.pagination.current_page + 1} untuk melihat halaman selanjutnya.`);
  }
}
break
//=================================================//
              case "listusr": {
  if (!ItsMeHyuu) return reply('males')
  let page = args[0] ? args[0] : '1';
  let f = await fetch(domain + "/api/application/users?page=" + page, {
    "method": "GET",
    "headers": {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apikey
    }
  });
  let res = await f.json();
  let users = res.data;
  let messageText = "Berikut list user:\n\n";
  
  for (let user of users) {
    let u = user.attributes;
    messageText += `ID: ${u.id} - Status: ${u.attributes?.user?.server_limit === null ? 'Inactive' : 'Active'}\n`;
    messageText += `${u.username}\n`;
    messageText += `${u.first_name} ${u.last_name}\n\n`;
  }
  
  messageText += `Page: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
  messageText += `Total Users: ${res.meta.pagination.count}`;
  
  await hyuuxyz.sendMessage(m.chat, { text: messageText }, { quoted: m });
  
  if (res.meta.pagination.current_page < res.meta.pagination.total_pages) {
    reply(`Gunakan perintah ${prefix}listusr ${res.meta.pagination.current_page + 1} untuk melihat halaman selanjutnya.`);
  }
}
break
//=================================================//
        case "delsrv": {
      if (!ItsMeHyuu) return reply(`Jirr Lu Siapa Cok`)

let srv = args[0]
if (!srv) return reply('ID nya mana?')
let f = await fetch(domain + "/api/application/servers/" + srv, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
}
})
let res = f.ok ? {
errors: null
} : await f.json()
if (res.errors) return reply('*SERVER NOT FOUND*')
reply('*SUCCESSFULLY DELETE THE SERVER*')
}
        break
//=================================================//
        case "delusr": {
  if (!ItsMeHyuu) return reply(`Jirr Lu Siapa Cok`)
let usr = args[0]
if (!usr) return reply('ID nya mana?')
let f = await fetch(domain + "/api/application/users/" + usr, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res = f.ok ? {
errors: null
} : await f.json()
if (res.errors) return reply('*USER NOT FOUND*')
reply('*SUCCESSFULLY DELETE THE USER*')
}
        break
//=================================================//
                case "addusr": {
if (!ItsMeHyuu) return reply(`Maaf Command Tersebut Khusus Developer Bot WhatsApp`)
let t = text.split(',');
if (t.length < 3) return reply(`*Format salah!*

Penggunaan:
${prefix + command} email,username,name,number/tag`);
let email = t[0];
let username = t[1];
let name = t[2];
let u = m.quoted ? m.quoted.sender : t[3] ? t[3].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
if (!u) return m.reply(`*Format salah!*

Penggunaan:
${prefix + command} email,username,name,number/tag`);
let d = (await hyuuxyz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = d.exists ? crypto.randomBytes(5).toString('hex') : t[3]
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": name,
"last_name": "Memb",
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let p = await hyuuxyz.sendMessage(m.chat, { text: `
*SUCCESSFULLY ADD USER*

╭─❏ *『 USER INFO 』*
┣❐ ➤ *ID* : ${user.id}
┣❏ ➤ *USERNAME* : ${user.username}
┣❏ ➤ *EMAIL* : ${user.email}
┣❏ ➤ *NAME* : ${user.first_name} ${user.last_name}
┣❏ ➤ *CREATED AT* :  ${tanggal}
┗⬣ *PASSWORD BERHASIL DI KIRIM KE @${u.split`@`[0]}*`, mentions:[u],
})
hyuuxyz.sendMessage(u, { text: `*BERIKUT DETAIL AKUN PANEL ANDA*\n
╭─❏ *『 USER INFO 』*
┣❏ ➤ *📧EMAIL* : ${email}
┣❏ ➤ *👤USERNAME* : ${username}
┣❏ ➤ *🔐PASSWORD* : ${password.toString()}
┣❏ ➤ *🌐LOGIN* : ${domain}
┗⬣`,
})
}
break
//=================================================//
case "addsrv": {
if (!ItsMeHyuu) return reply(`Jirr Lu Siapa Cok`)
let s = text.split(',');
if (s.length < 7) return reply(`*Format salah!*

Penggunaan:
${prefix + command} name,tanggal,userId,eggId,locationId,memory/disk,cpu`)
let name = s[0];
let desc = s[1] || ''
let usr_id = s[2];
let egg = s[3];
let loc = s[4];
let memo_disk = s[5].split`/`;
let cpu = s[6];
let f1 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let data = await f1.json();
let startup_cmd = data.attributes.startup

let f = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": desc,
"user": usr_id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo_disk[0],
"swap": 0,
"disk": memo_disk[1],
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
reply(`*SUCCESSFULLY ADD SERVER*

TYPE: ${res.object}

ID: ${server.id}
UUID: ${server.uuid}
NAME: ${server.name}
DESCRIPTION: ${server.description}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%
CREATED AT: ${server.created_at}`)
}
        break
//=================================================//
case "1gb": {
if (!ItsMeHyuu) return reply(`njir lu siapa cuk`)
let t = text.split(',');
if (t.length < 2) return reply(`*Format salah!*

Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "1024"
let cpu = "30"
let disk = "1024"
let email = username + "@s.id"
akunlo = "https://telegra.ph/file/c6262413cb0ddd1663683.jpg" 
if (!u) return
let d = (await hyuuxyz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = d.exists ? crypto.randomBytes(5).toString('hex') : t[3]
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
reply(`*Sedang Membuat Server, Tunggu Sebentar ☕*`)
ctf = `┌⁠──────────⁠─────────
○
○ ID : ${user.id}
○ EMAIL : ${user.email}
○ USERNAME : ${user.username}
○ PASSWORD : ${password.toString()}
○ ️LOGIN : ${domain}
○
└──────────⁠─────────`
hyuuxyz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: m })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = reply(`*SUKSES MEMBUAT SERVER✅*

Silahkan Cek Akun Pannel Anda
Yang Telah Dikirim Oleh Saya!

*ID SERVER : ${server.id}*

Untuk Delete Server Silahkan Ketik
_.delsrv id server_
`)

}
break
//=================================================//
case "2gb": {
if (!ItsMeHyuu) return reply(`njir lu siapa cuk`)
let t = text.split(',');
if (t.length < 2) return reply(`*Format salah!*

Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "2024"
let cpu = "60"
let disk = "2024"
let email = username + "@s.id"
akunlo = "https://telegra.ph/file/c6262413cb0ddd1663683.jpg" 
if (!u) return
let d = (await hyuuxyz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = d.exists ? crypto.randomBytes(5).toString('hex') : t[3]
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
reply(`*Sedang Membuat Server, Tunggu Sebentar ☕*`)
ctf = `┌⁠──────────⁠─────────
○
○ ID : ${user.id}
○ EMAIL : ${user.email}
○ USERNAME : ${user.username}
○ PASSWORD : ${password.toString()}
○ ️LOGIN : ${domain}
○
└──────────⁠─────────`
hyuuxyz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: m })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = reply(`*SUKSES MEMBUAT SERVER✅*

Silahkan Cek Akun Pannel Anda
Yang Telah Dikirim Oleh Saya!

*ID SERVER : ${server.id}*

Untuk Delete Server Silahkan Ketik
_.delsrv id server_
`)

}
break
case "3gb": {
if (!ItsMeHyuu) return reply(`njir lu siapa cuk`)
//=================================================//
let t = text.split(',');
if (t.length < 2) return reply(`*Format salah!*

Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "3024"
let cpu = "80"
let disk = "3024"
let email = username + "@s.id"
akunlo = "https://telegra.ph/file/c6262413cb0ddd1663683.jpg" 
if (!u) return
let d = (await hyuuxyz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = d.exists ? crypto.randomBytes(5).toString('hex') : t[3]
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
reply(`*Sedang Membuat Server, Tunggu Sebentar ☕*`)
ctf = `┌⁠──────────⁠─────────
○
○ ID : ${user.id}
○ EMAIL : ${user.email}
○ USERNAME : ${user.username}
○ PASSWORD : ${password.toString()}
○ ️LOGIN : ${domain}
○
└──────────⁠─────────`
hyuuxyz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: m })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = reply(`*SUKSES MEMBUAT SERVER✅*

Silahkan Cek Akun Pannel Anda
Yang Telah Dikirim Oleh Saya!

*ID SERVER : ${server.id}*

Untuk Delete Server Silahkan Ketik
_.delsrv id server_
`)

}
break
//=================================================//
case "4gb": {
if (!ItsMeHyuu) return reply(`njir lu siapa cuk`)
let t = text.split(',');
if (t.length < 2) return reply(`*Format salah!*

Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "4024"
let cpu = "100"
let disk = "4024"
let email = username + "@s.id"
akunlo = "https://telegra.ph/file/c6262413cb0ddd1663683.jpg" 
if (!u) return
let d = (await hyuuxyz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = d.exists ? crypto.randomBytes(5).toString('hex') : t[3]
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
reply(`*Sedang Membuat Server, Tunggu Sebentar ☕*`)
ctf = `┌⁠──────────⁠─────────
○
○ ID : ${user.id}
○ EMAIL : ${user.email}
○ USERNAME : ${user.username}
○ PASSWORD : ${password.toString()}
○ ️LOGIN : ${domain}
○
└──────────⁠─────────`
hyuuxyz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: m })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = reply(`*SUKSES MEMBUAT SERVER✅*

Silahkan Cek Akun Pannel Anda
Yang Telah Dikirim Oleh Saya!

*ID SERVER : ${server.id}*

Untuk Delete Server Silahkan Ketik
_.delsrv id server_
`)

}
break
//=================================================//
case "5gb": {
if (!ItsMeHyuu) return reply(`njir lu siapa cuk`)
let t = text.split(',');
if (t.length < 2) return reply(`*Format salah!*

Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "5024"
let cpu = "130"
let disk = "5024"
let email = username + "@s.id"
akunlo = "https://telegra.ph/file/c6262413cb0ddd1663683.jpg" 
if (!u) return
let d = (await hyuuxyz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = d.exists ? crypto.randomBytes(5).toString('hex') : t[3]
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
reply(`*Sedang Membuat Server, Tunggu Sebentar ☕*`)
ctf = `┌⁠──────────⁠─────────
○
○ ID : ${user.id}
○ EMAIL : ${user.email}
○ USERNAME : ${user.username}
○ PASSWORD : ${password.toString()}
○ ️LOGIN : ${domain}
○
└──────────⁠─────────`
hyuuxyz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: m })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = reply(`*SUKSES MEMBUAT SERVER✅*

Silahkan Cek Akun Pannel Anda
Yang Telah Dikirim Oleh Saya!

*ID SERVER : ${server.id}*

Untuk Delete Server Silahkan Ketik
_.delsrv id server_
`)

}
break
//=================================================//
case "6gb": {
if (!ItsMeHyuu) return reply(`njir lu siapa cuk`)
let t = text.split(',');
if (t.length < 2) return reply(`*Format salah!*

Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "6024"
let cpu = "150"
let disk = "6024"
let email = username + "@s.id"
akunlo = "https://telegra.ph/file/c6262413cb0ddd1663683.jpg" 
if (!u) return
let d = (await hyuuxyz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = d.exists ? crypto.randomBytes(5).toString('hex') : t[3]
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
reply(`*Sedang Membuat Server, Tunggu Sebentar ☕*`)
ctf = `┌⁠──────────⁠─────────
○
○ ID : ${user.id}
○ EMAIL : ${user.email}
○ USERNAME : ${user.username}
○ PASSWORD : ${password.toString()}
○ ️LOGIN : ${domain}
○
└──────────⁠─────────`
hyuuxyz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: m })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = reply(`*SUKSES MEMBUAT SERVER✅*

Silahkan Cek Akun Pannel Anda
Yang Telah Dikirim Oleh Saya!

*ID SERVER : ${server.id}*

Untuk Delete Server Silahkan Ketik
_.delsrv id server_
`)

}
break
//=================================================//
case "7gb": {
if (!ItsMeHyuu) return reply(`njir lu siapa cuk`)
let t = text.split(',');
if (t.length < 2) return reply(`*Format salah!*

Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "7024"
let cpu = "170"
let disk = "7024"
let email = username + "@s.id"
akunlo = "https://telegra.ph/file/c6262413cb0ddd1663683.jpg" 
if (!u) return
let d = (await hyuuxyz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = d.exists ? crypto.randomBytes(5).toString('hex') : t[3]
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
reply(`*Sedang Membuat Server, Tunggu Sebentar ☕*`)
ctf = `┌⁠──────────⁠─────────
○
○ ID : ${user.id}
○ EMAIL : ${user.email}
○ USERNAME : ${user.username}
○ PASSWORD : ${password.toString()}
○ ️LOGIN : ${domain}
○
└──────────⁠─────────`
hyuuxyz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: m })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = reply(`*SUKSES MEMBUAT SERVER✅*

Silahkan Cek Akun Pannel Anda
Yang Telah Dikirim Oleh Saya!

*ID SERVER : ${server.id}*

Untuk Delete Server Silahkan Ketik
_.delsrv id server_
`)

}
break
//=================================================//
case "8gb": {
if (!ItsMeHyuu) return reply(`njir lu siapa cuk`)
let t = text.split(',');
if (t.length < 2) return reply(`*Format salah!*

Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "8024"
let cpu = "180"
let disk = "8024"
let email = username + "@s.id"
akunlo = "https://telegra.ph/file/c6262413cb0ddd1663683.jpg" 
if (!u) return
let d = (await hyuuxyz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = d.exists ? crypto.randomBytes(5).toString('hex') : t[3]
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
reply(`*Sedang Membuat Server, Tunggu Sebentar ☕*`)
ctf = `┌⁠──────────⁠─────────
○
○ ID : ${user.id}
○ EMAIL : ${user.email}
○ USERNAME : ${user.username}
○ PASSWORD : ${password.toString()}
○ ️LOGIN : ${domain}
○
└──────────⁠─────────`
hyuuxyz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: m })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = reply(`*SUKSES MEMBUAT SERVER✅*

Silahkan Cek Akun Pannel Anda
Yang Telah Dikirim Oleh Saya!

*ID SERVER : ${server.id}*

Untuk Delete Server Silahkan Ketik
_.delsrv id server_
`)

}
break
//=================================================//
case "unli": {
if (!ItsMeHyuu) return reply(`njir lu siapa cuk`)
let t = text.split(',');
if (t.length < 2) return reply(`*Format salah!*

Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "0"
let cpu = "0"
let disk = "0"
let email = username + "@s.id"
akunlo = "https://telegra.ph/file/c6262413cb0ddd1663683.jpg" 
if (!u) return
let d = (await hyuuxyz.onWhatsApp(u.split`@`[0]))[0] || {}
let password = d.exists ? crypto.randomBytes(5).toString('hex') : t[3]
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
reply(`*Sedang Membuat Server, Tunggu Sebentar ☕*`)
ctf = `┌⁠──────────⁠─────────
○
○ ID : ${user.id}
○ EMAIL : ${user.email}
○ USERNAME : ${user.username}
○ PASSWORD : ${password.toString()}
○ ️LOGIN : ${domain}
○
└──────────⁠─────────`
hyuuxyz.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: m })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = reply(`*SUKSES MEMBUAT SERVER✅*

Silahkan Cek Akun Pannel Anda
Yang Telah Dikirim Oleh Saya!

*ID SERVER : ${server.id}*

Untuk Delete Server Silahkan Ketik
_.delsrv id server_`)

}
break
//=================================================//

default:
}
if (budy.startsWith('$')) {
if (!ItsMeHyuu) return reply(mess.owner)
exec(budy.slice(2), (err, stdout) => {
if(err) return reply(err)
if (stdout) return reply(stdout)})}
if (budy.startsWith('>')) {
if (!ItsMeHyuu) return reply(mess.owner)
try {
let evaled = await eval(budy.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
await reply(evaled)
} catch (err) {
reply(String(err))
}
}
} catch (err) {
console.log(util.format(err))
let e = String(err)
hyuuxyz.sendMessage(`${nomerOwner}@s.whatsapp.net`, {text:e})
}
}

let file = require.resolve(__filename) 
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})