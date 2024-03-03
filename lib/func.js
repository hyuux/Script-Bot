require("../connection/settings");
const fs = require("fs");
const chalk = require("chalk");
const axios = require("axios");
const moment = require("moment-timezone");
const BodyForm = require('form-data');
const Jimp = require('jimp')
const {
	sizeFormatter
} = require("human-readable");
const {
    randomBytes
} = require('crypto')
const {
	proto,
	delay,
	getContentType
} = require("@whiskeysockets/baileys");

exports.pickRandom = (list) => {
	return list[Math.floor(list.length * Math.random())]
}

exports.getRandom = (ext) => {
    return `${randomBytes(10).toString('hex')}${ext}`
}

exports.Tmp = (ext) => {
    return `./src/tmp/${randomBytes(10).toString('hex')}${ext}`
}

exports.sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

exports.generateProfilePicture = async (buffer) => {
    const jimp = await Jimp.read(buffer);
    const min = jimp.getWidth();
    const max = jimp.getHeight();
    const cropped = jimp.crop(0, 0, min, max);
    return {
        img: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG),
        preview: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG)
    };
};

exports.uploader = (Path) => {
	return new Promise(async (resolve, reject) => {
		if (!fs.existsSync(Path)) return reject(new Error("File not Found"))
		try {
			const form = new BodyForm();
			form.append("file", fs.createReadStream(Path))
			const data = await axios({
				url: "https://telegra.ph/upload",
				method: "POST",
				headers: {
					...form.getHeaders()
				},
				data: form
			})
			return resolve("https://telegra.ph" + data.data[0].src)
		} catch (err) {
			return reject(new Error(String(err)))
		}
	})
}
exports.UploadFileUgu = (input) => {
	return new Promise(async (resolve, reject) => {
		const form = new BodyForm();
		form.append("files[]", fs.createReadStream(input))
		await axios({
			url: "https://uguu.se/upload.php",
			method: "POST",
			headers: {
				"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
				...form.getHeaders()
			},
			data: form
		}).then((data) => {
			let a = axios.get(`https://url.xyzendev.repl.co/shortlink?url=${data.data.files[0]}`)
			resolve(a.data.result.shortUrl)
		}).catch((err) => reject(err))
	})
}

exports.smsg = (client, m, store) => {
	if (!m) return m;
	let M = proto.WebMessageInfo;
	if (m.key) {
		m.id = m.key.id;
		m.isBaileys = m.id.startsWith("BAE5") && m.id.length === 16;
		m.chat = m.key.remoteJid;
		m.fromMe = m.key.fromMe;
		m.isGroup = m.chat.endsWith("@g.us");
		m.sender = client.decodeJid(
			(m.fromMe && client.user.id) ||
			m.participant ||
			m.key.participant ||
			m.chat ||
			"",
		);
		if (m.isGroup) m.participant = client.decodeJid(m.key.participant) || "";
	}
	if (m.message) {
		m.mtype = getContentType(m.message);
		m.msg =
			m.mtype == "viewOnceMessage" ?
			m.message[m.mtype].message[getContentType(m.message[m.mtype].message)] :
			m.message[m.mtype];
		m.body = m.message ?
			m.message.conversation ||
			(m.mtype == "listResponseMessage" &&
				m.msg.singleSelectReply.selectedRowId) ||
			(m.mtype == "viewOnceMessage" && m.msg.caption) ||
			m.text :
			"";
		let quoted = m.quoted
		m.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : [];
		if (m.quoted) {
			let type = getContentType(quoted);
			m.quoted = m.quoted[type];
			if (["productMessage"].includes(type)) {
				type = getContentType(m.quoted);
				m.quoted = m.quoted[type];
			}
			if (typeof m.quoted === "string")
				m.quoted = {
					text: m.quoted,
				};
			m.quoted.chat = m.msg.contextInfo.remoteJid || m.chat;
			m.quoted.isBaileys = m.quoted.id ?
				m.quoted.id.startsWith("BAE5") && m.quoted.id.length === 16 :
				false;
			m.quoted.sender = client.decodeJid(m.msg.contextInfo.participant);
			m.quoted.fromMe = m.quoted.sender === (client.user && client.user.id);
			m.quoted.text =
				m.quoted.text ||
				m.quoted.caption ||
				m.quoted.conversation ||
				m.quoted.contentText ||
				m.quoted.selectedDisplayText ||
				m.quoted.title ||
				"";
			m.quoted.mentionedJid = m.msg.contextInfo ?
				m.msg.contextInfo.mentionedJid :
				[];
			m.getQuotedObj = m.getQuotedMessage = async () => {
				if (!m.quoted.id) return false;
				let q = await store.loadMessage(m.chat, m.quoted.id, client);
				return exports.smsg(client, q, store);
			};
			let vM = (m.quoted.fakeObj = M.fromObject({
				key: {
					remoteJid: m.quoted.chat,
					fromMe: m.quoted.fromMe,
					id: m.quoted.id,
				},
				message: quoted,
				...(m.isGroup ?
					{
						participant: m.quoted.sender,
					} :
					{}),
			}));

			m.quoted.delete = () =>
				client.sendMessage(m.quoted.chat, {
					delete: vM.key,
				});

			m.quoted.copyNForward = (jid, forceForward = false, options = {}) =>
				client.copyNForward(jid, vM, forceForward, options);

			m.quoted.download = () => client.downloadMediaMessage(m.quoted);
		}
	}
	if (m.msg.url) m.download = () => client.downloadMediaMessage(m.msg);
	m.text =
		m.msg.text ||
		m.msg.caption ||
		m.message.conversation ||
		m.msg.contentText ||
		m.msg.selectedDisplayText ||
		m.msg.title ||
		"";

	m.reply = (text, chatId = m.chat, options = {}) =>
		Buffer.isBuffer(text) ?
		client.sendMedia(chatId, text, "file", "", m, {
			...options,
		}) :
		client.sendText(chatId, 'ori', text, m, {
			...options,
		});

	m.copy = () => exports.smsg(client, M.fromObject(M.toObject(m)));

	m.copyNForward = (jid = m.chat, forceForward = false, options = {}) =>
		client.copyNForward(jid, m, forceForward, options);

	return m;
};

exports.fetch = async (url, options) => {
	try {
		options ? options : {};
		const res = await axios({
			method: "GET",
			url: url,
			headers: {
				"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
			},
			...options,
		});
		return res.data;
	} catch (err) {
		return err;
	}
};

exports.ucapanWaktu = () => {
    try {
        const waktu = moment().tz("Asia/Jakarta").format("HH:mm:ss");
        let ucapanWaktu;

        if (waktu < "04:00:00") {
            ucapanWaktu = "Selamat Malam";
        } else if (waktu < "10:00:00") {
            ucapanWaktu = "Selamat Pagi";
        } else if (waktu < "15:00:00") {
            ucapanWaktu = "Selamat Siang";
        } else if (waktu < "18:00:00") {
            ucapanWaktu = "Selamat Sore";
        } else if (waktu < "23:59:00") {
            ucapanWaktu = "Selamat Malam";
        } else {
            ucapanWaktu = "Selamat Malam";
        }

        return ucapanWaktu;
    } catch (err) {
        return err;
    }
};

exports.getGroupAdmins = (participants) => {
	let admins = [];
	for (let i of participants) {
		i.admin === "superadmin" ?
			admins.push(i.id) :
			i.admin === "admin" ?
			admins.push(i.id) :
			"";
	}
	return admins || [];
};

exports.getBuffer = async (url, options) => {
	try {
		options ? options : {};
		const res = await axios({
			method: "get",
			url,
			headers: {
				DNT: 1,
				"Upgrade-Insecure-Request": 1,
			},
			...options,
			responseType: "arraybuffer",
		});
		return res.data;
	} catch (err) {
		return err;
	}
};

exports.runtime = function(seconds) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600 * 24));
	var h = Math.floor((seconds % (3600 * 24)) / 3600);
	var m = Math.floor((seconds % 3600) / 60);
	var s = Math.floor(seconds % 60);
	var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
	var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
	var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
	var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
	return dDisplay + hDisplay + mDisplay + sDisplay;
};

exports.convertDurationToSeconds = (duration) => {
	const [hours, minutes, seconds] = duration.split(":").map(Number);
	const totalSeconds = hours * 3600 + minutes * 60 + seconds;
	return totalSeconds;
};

exports.formatp = sizeFormatter({
	std: "JEDEC",
	decimalPlaces: 2,
	keepTrailingZeroes: false,
	render: (literal, symbol) => `${literal} ${symbol}B`,
});

exports.formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

exports.isUrl = (url) => {
    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}

exports.jsonformat = (string) => {
    return JSON.stringify(string, null, 2)
}

exports.clockString = (ms) => {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

let file = require.resolve(__filename);
fs.watchFile(file, () => {
	fs.unwatchFile(file);
	console.log(chalk.redBright(`Update'${__filename}'`));
	delete require.cache[file];
	require(file);
});