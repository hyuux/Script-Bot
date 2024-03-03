const chalk = require("chalk")
const fs = require("fs")

global.ownerNumber = ["62895622412769@s.whatsapp.net"]
global.nomerOwner = "62895622412769"
global.nomorOwner = ['62895622412769']
global.OwnerName = "HyuuOfc"
global.BotName = "Shimi-MD"
global.sessionName = 'session'

// SETTING CPANEL
global.domain = 'https://' // Isi Domain Lu
global.apikey = '' // Isi Apikey Plta Lu
global.capikey = '' // Isi Apikey Pltc Lu
global.eggsnya = '19' // id eggs yang dipakai
global.location = '1' // id location

global.options = {
    read: true,
    public: true,
    readsw: true,
    block212: true,
    onlyindo: true
}

// TEXT PUSH KNTK
global.tekspushkon = ""
global.tekspushkonv1 = ""
global.tekspushkonv2 = ""
global.tekspushkonv3 = ""

// IMAGE
global.thumb = fs.readFileSync('./src/photo/thumb.jpg')

// GLOBAL MESS
global.mess = {
   owner: "Jirr Lu Siapa Cok*",
   proses: "Wet Otw Bangg",
   sukses: "*⌜ DONE ⌟*\nSucces Mas",
   group: "Khusus Di Group",
   priv: "Khusus Di Private Chat",
   inf: "*[ SCRIPT BY HYUUOFC ]*\n\n> MAU BELI SC NYA?\n>SC NYA GAK DI JUAL 😁\nTAPI KALO DI TAKE GANJA GAS\n\n- KEUNTUNGAN :\n> BISA PUSH KONTAK\n> BISA JPM + GAMBAR\n> JPM TANPA CAPE CUMA LEWAT BOT\n> BISA SAVE KONTAK LEWAT ID\n> BISA CREATE PANEL OTOMATIS\n\n*MINAT? CHAT WA DI BAWAH*\n_wa.me/62895622412769_"
}
let file = require.resolve(__filename) 
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})