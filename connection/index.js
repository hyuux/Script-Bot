require("../connection/settings");
const pino = require("pino");
const {
	Boom
} = require("@hapi/boom");
const fs = require("fs");
const cfonts = require('cfonts')
const chalk = require("chalk");
const FileType = require("file-type");
const path = require("path");
const axios = require("axios");
const PhoneNumber = require("awesome-phonenumber");
const readline = require("readline");
const {
	imageToWebp,
	videoToWebp,
	writeExifImg,
	writeExifVid,
} = require("../lib/watermark");
const {
	smsg,
	getBuffer
} = require("../lib/func");
const { Low, JSONFile } = require('@xyzendev/lowdb');
const cloudDBAdapter = require('../lib/cloudDBAdapter');
const _ = require('lodash');
const yargs = require('yargs/yargs');
const mongoDB = require('../lib/mongoDB');
const {
	default: clientConnect,
	useMultiFileAuthState,
	DisconnectReason,
	downloadContentFromMessage,
	makeInMemoryStore,
	jidDecode,
	proto,
	getAggregateVotesInPollMessage,
	PHONENUMBER_MCC,
	generateWAMessage,
	areJidsSameUser
} = require("@whiskeysockets/baileys");

const pairingCode = process.argv.includes("--pairing");
const useMobile = process.argv.includes("--mobile");

const store = makeInMemoryStore({
	logger: pino().child({
		level: "silent",
		stream: "store",
	}),
});

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})

const question = (text) => new Promise((resolve) => rl.question(text, resolve))

cfonts.say("NEW-BASE", {
    font: 'tiny',
	align: 'center',
   	colors: ['system']
});

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.db = new Low(
  /https?:\/\//.test(opts['db'] || '') ?
    new cloudDBAdapter(opts['db']) : /mongodb/.test(opts['db']) ?
      new mongoDB('mongodb+srv://xyzenbot:xyzen@bot.299vnje.mongodb.net/', opts['db']) :
      new JSONFile(`src/database/database.json`)
)
global.DATABASE = global.db 
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) return new Promise((resolve) => setInterval(function () { (!global.db.READ ? (clearInterval(this), resolve(global.db.data == null ? global.loadDatabase() : global.db.data)) : null) }, 1 * 1000))
  if (global.db.data !== null) return
  global.db.READ = true
  await global.db.read()
  global.db.READ = false
  global.db.data = {
    users: {},
	game: {},
	others: {},
    ...(global.db.data || {})
  }
  global.db.chain = _.chain(global.db.data)
}
loadDatabase()

if (global.db) setInterval(async () => {
    if (global.db.data) await global.db.write()
  }, 30 * 1000)

async function startAdrian() {
	async function getMessage(key) {
		if (store) {
			const msg = await store.loadMessage(key.remoteJid, key.id)
			return msg?.message
		}
		return {
			conversation: 'xyzendev'
		}
	}

	const {
		state,
		saveCreds
	} = await useMultiFileAuthState(`./src/session`);
	const client = clientConnect({
		logger: pino({
			level: "silent",
		}),
		printQRInTerminal: !pairingCode,
		browser: ["Windows", "Chrome", "11"],
		getMessage: async (key) => {
			if (store) {
				const msg = await store.loadMessage(key.remoteJid, key.id)
				return msg.message || undefined
			}
			return {
				conversation: 'xyzendev'
			}
		},
		auth: state,
	});

	store.bind(client.ev);

	client.ev.on("messages.upsert", async (chatUpdate, msg) => {
		try {
			mek = chatUpdate.messages[0];
			if (!mek.message) return;
			mek.message = Object.keys(mek.message)[0] === "ephemeralMessage" ? mek.message.ephemeralMessage.message : mek.message;
			if (mek.key && mek.key.remoteJid === "status@broadcast") return;
			if (!client.public && !mek.key.fromMe && chatUpdate.type === "notify") return;
			if (mek.key.id.startsWith("BAE5") && mek.key.id.length === 16) return;
			m = smsg(client, mek, store);
			require("../connection/Hyuu")(client, m, chatUpdate, store);
		} catch (err) {
			console.log(err)
		}
	});

	if (pairingCode && !client.authState.creds.registered) {
		if (useMobile) client.logger.error('\nCannot use pairing code with mobile api')
		console.log(chalk.cyan('┌──────────────┈'));
		console.log(`│ 🦊  ${chalk.redBright('Masukan Nomor Whatsapp Mu Berawalan +62xxx')}:`);
		console.log(chalk.cyan('└──────────────┈'));
		let phoneNumber = await question(`   ${chalk.cyan('- Number')}: `);
		console.log(chalk.cyan('┌──────────────┈'));
		phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
		if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
			console.log(chak.cyan('└──────────────┈'));
			console.log(`│ 🗯  ${chalk.redBright("Start with your country's WhatsApp code, Example 62xxx")}:`);
			console.log(chalk.cyan('├──────────────┈'));
			console.log(chalk.cyan('┌──────────────┈'));
			console.log(`│ 😺  ${chalk.redBright('Masukan Nomor Whatsapp Mu Berawalan +62xxxxx')}:`);
			console.log(chalk.cyan('├──────────────┈'));
			phoneNumber = await question(`   ${chalk.cyan('- Number')}: `);
			console.log(chalk.cyan('└──────────────┈'));
			phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
		}
		let code = await client.requestPairingCode(phoneNumber)
		code = code?.match(/.{1,4}/g)?.join("-") || code
		console.log(chalk.cyan('┌──────────────┈'));
		console.log(`│ 🕒  ${chalk.redBright('Your Pairing Code')}:`);
		console.log(chalk.cyan('├──────────────┈'));
		console.log(`   ${chalk.cyan('- Code')}: ${code}`);
		console.log(chalk.cyan('└──────────────┈'));
		rl.close()
	}
	
	client.ev.on('messages.update', async (chatUpdate) => {
		for (const {
				key,
				update
			}
			of chatUpdate) {
			if (update.pollUpdates && key.fromMe) {
				const pollCreation = await getMessage(key)
				if (pollCreation) {
					const pollUpdate = await getAggregateVotesInPollMessage({
						message: pollCreation,
						pollUpdates: update.pollUpdates,
					})
					const command = pollUpdate.filter(v => v.voters.length !== 0)[0]?.name
					if (command == undefined) return
					const comand = '.' + command
					client.appenTextMessage(comand, chatUpdate)
				}
			}
		}
	})

	client.decodeJid = (jid) => {
		if (!jid) return jid;
		if (/:\d+@/gi.test(jid)) {
			let decode = jidDecode(jid) || {};
			return (
				(decode.user && decode.server && decode.user + "@" + decode.server) || jid);
		} else return jid;
	};

	client.ev.on("contacts.update", (update) => {
		for (let contact of update) {
			let id = client.decodeJid(contact.id);
			if (store && store.contacts) store.contacts[id] = {
				id,
				name: contact.notify,
			};
		}
	});

	client.getName = (jid, withoutContact = false) => {
		id = client.decodeJid(jid);
		withoutContact = client.withoutContact || withoutContact;
		let v;
		if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
			v = store.contacts[id] || {};
			if (!(v.name || v.subject)) v = client.groupMetadata(id) || {};
			resolve(v.name || v.subject || PhoneNumber("+" + id.replace("@s.whatsapp.net", "")).getNumber("international", ), );
		});
		else v = id === "0@s.whatsapp.net" ? {
			id,
			name: "WhatsApp",
		} : id === client.decodeJid(client.user.id) ? client.user : store.contacts[id] || {};
		return (
			(withoutContact ? "" : v.name) || v.subject || v.verifiedName || PhoneNumber("+" + jid.replace("@s.whatsapp.net", "")).getNumber("international", ));
	};

	client.sendContact = async (jid, kon, quoted = "", opts = {}) => {
		let list = [];
		for (let i of kon) {
			list.push({
				displayName: await client.getName(i + "@s.whatsapp.net"),
				vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await client.getName(
          i + "@s.whatsapp.net",
        )}\nFN:${await client.getName(
          i + "@s.whatsapp.net",
        )}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nitem2.EMAIL;type=INTERNET:creator@xyzen.tech\nitem2.X-ABLabel:Email\nitem3.URL:https://api.xyzen.tech\nitem3.X-ABLabel:RestAPIs\nitem4.ADR:;;Bandung, Jawa Barat, Indonesia;;;;\nitem4.X-ABLabel:Region\nEND:VCARD`,
			});
		}
		client.sendMessage(jid, {
			contacts: {
				displayName: `${list.length} Kontak`,
				contacts: list,
			},
			...opts,
		}, {
			quoted,
		}, );
	};

	client.setStatus = (status) => {
		client.query({
			tag: "iq",
			attrs: {
				to: "@s.whatsapp.net",
				type: "set",
				xmlns: "status",
			},
			content: [{
				tag: "status",
				attrs: {},
				content: Buffer.from(status, "utf-8"),
			}, ],
		});
		return status;
	};

	client.public = options.public;

	client.serializeM = (m) => smsg(client, m, store);

	client.ev.on("connection.update", async (update) => {
		const { connection, lastDisconnect } = update;
		let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
	
		if (connection === "close") {
			switch (reason) {
				case DisconnectReason.badSession:
					console.log("Bad Session File, Please Delete Session and Scan Again");
					client.logout();
					break;
				case DisconnectReason.connectionClosed:
				case DisconnectReason.connectionLost:
					console.log("Connection closed or lost, reconnecting...");
					startAdrian();
					break;
				case DisconnectReason.connectionReplaced:
					console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First");
					client.logout();
					break;
				case DisconnectReason.loggedOut:
					console.log("Device Logged Out, Please Scan Again And Run.");
					client.logout();
					break;
				case DisconnectReason.restartRequired:
				case DisconnectReason.timedOut:
					console.log(`Restart ${reason === DisconnectReason.restartRequired ? "Required" : "TimedOut"}, Restarting...`);
					startAdrian();
					break;
				default:
					console.log(chalk.red(`Unknown DisconnectReason: ${reason}|${connection}`));
					client.end(`Unknown DisconnectReason: ${reason}|${connection}`);
			}
		}
		if (update.connection == "connecting" || update.receivedPendingNotifications == "false") {
			console.log(chalk.white.bold(`[Sedang mengkoneksikan]`))
		}
		if (update.connection == "open" || update.receivedPendingNotifications == "true") {
			console.log(chalk.green(`[Connecting to] WhatsApp web`))
			console.log(chalk.blue(`[Connected] ` + JSON.stringify(client.user, null, 2)))
		}
	});	

	client.ev.on("creds.update", saveCreds);

	client.reSize = async (image, width, height) => {
		let jimp = require("jimp");
		var oyy = await jimp.read(image);
		var kiyomasa = await oyy.resize(width, height).getBufferAsync(jimp.MIME_JPEG);
		return kiyomasa;
	};

	client.appenTextMessage = async (text, chatUpdate) => {
		let messages = await generateWAMessage(m.chat, {
			text: text,
			mentions: m.mentionedJid
		}, {
			userJid: client.user.id,
			quoted: m.quoted && m.quoted.fakeObj
		})
		messages.key.fromMe = areJidsSameUser(m.sender, client.user.id)
		messages.key.id = m.key.id
		messages.pushName = m.pushName
		if (m.isGroup) messages.participant = m.sender
		let msg = {
			...chatUpdate,
			messages: [proto.WebMessageInfo.fromObject(messages)],
			type: 'append'
		}
		client.ev.emit('messages.upsert', msg)
	}

	client.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
		let mime = "";
		let res = await axios.head(url);
		mime = res.headers["content-type"];
		if (mime.split("/")[1] === "gif") {
			return client.sendMessage(jid, {
				video: await getBuffer(url),
				caption: caption,
				gifPlayback: true,
				...options,
			}, {
				quoted: quoted,
				...options,
			}, );
		}
		let type = mime.split("/")[0] + "Message";
		if (mime === "application/pdf") {
			return client.sendMessage(jid, {
				document: await getBuffer(url),
				mimetype: "application/pdf",
				caption: caption,
				...options,
			}, {
				quoted: quoted,
				...options,
			}, );
		}
		if (mime.split("/")[0] === "image") {
			return client.sendMessage(jid, {
				image: await getBuffer(url),
				caption: caption,
				...options,
			}, {
				quoted: quoted,
				...options,
			}, );
		}
		if (mime.split("/")[0] === "video") {
			return client.sendMessage(jid, {
				video: await getBuffer(url),
				caption: caption,
				mimetype: "video/mp4",
				...options,
			}, {
				quoted: quoted,
				...options,
			}, );
		}
		if (mime.split("/")[0] === "audio") {
			return client.sendMessage(jid, {
				audio: await getBuffer(url),
				caption: caption,
				mimetype: "audio/mpeg",
				...options,
			}, {
				quoted: quoted,
				...options,
			}, );
		}
	};

	client.sendText = (jid, type, text, quoted = "", options) => {
		const bold = type === 'bold';
		const mono = type === 'mono';
		const ori = type === 'ori';
	
		const a = '```';
		let input;
	
		if (bold) {
			input = `*${text}*`;
		} else if (mono) {
			input = a + text + '\n' + a;
		} else if (ori) {
			input = text;
		}
	
		client.sendMessage(jid, {
			text: input,
			...options,
		}, { quoted });
	}
	

	client.sendPoll = (jid, name = '', values = [], selectableCount = 1) => {
		return client.sendMessage(jid, {
			poll: {
				name,
				values,
				selectableCount,
				isQuiz: true
			}
		})
	};

	client.sendImage = async (jid, path, caption = "", quoted = "", options) => {
		let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], "base64") : /^https?:\/\//.test(path) ? await await getBuffer(path) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0);
		return await client.sendMessage(jid, {
			image: buffer,
			caption: caption,
			...options,
		}, {
			quoted,
		}, );
	};

	client.sendVideo = async (jid, path, caption = "", quoted = "", gif = false, options, ) => {
		let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], "base64") : /^https?:\/\//.test(path) ? await await getBuffer(path) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0);
		return await client.sendMessage(jid, {
			video: buffer,
			caption: caption,
			gifPlayback: gif,
			...options,
		}, {
			quoted,
		}, );
	};

	client.sendAudio = async (jid, path, quoted = "", ptt = false, options) => {
		let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], "base64") : /^https?:\/\//.test(path) ? await await getBuffer(path) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0);
		return await client.sendMessage(jid, {
			audio: buffer,
			ptt: ptt,
			...options,
		}, {
			quoted,
		});
	};

	client.sendTextWithMentions = async (jid, text, quoted, options = {}) => client.sendMessage(jid, {
		text: text,
		contextInfo: {
			mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(
				(v) => v[1] + "@s.whatsapp.net", ),
		},
		...options,
	}, {
		quoted,
	});

	client.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
		let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], "base64") : /^https?:\/\//.test(path) ? await await getBuffer(path) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0);
		let buffer;
		if (options && (options.packname || options.author)) {
			buffer = await writeExifImg(buff, options);
		} else {
			buffer = await imageToWebp(buff);
		}
		await client.sendMessage(jid, {
			sticker: {
				url: buffer,
			},
			...options,
		}, {
			quoted,
		}, );
		return buffer;
	};

	client.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
		let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], "base64") : /^https?:\/\//.test(path) ? await await getBuffer(path) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0);
		let buffer;
		if (options && (options.packname || options.author)) {
			buffer = await writeExifVid(buff, options);
		} else {
			buffer = await videoToWebp(buff);
		}
		await client.sendMessage(jid, {
			sticker: {
				url: buffer,
			},
			...options,
		}, {
			quoted,
		}, );
		return buffer;
	};

	client.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true, ) => {
		let quoted = message.msg ? message.msg : message;
		let mime = (message.msg || message).mimetype || "";
		let messageType = message.mtype ? message.mtype.replace(/Message/gi, "") : mime.split("/")[0];
		const stream = await downloadContentFromMessage(quoted, messageType);
		let buffer = Buffer.from([]);
		for await (const chunk of stream) {
			buffer = Buffer.concat([buffer, chunk]);
		}
		let type = await FileType.fromBuffer(buffer);
		trueFileName = attachExtension ? filename + "." + type.ext : filename;
		await fs.writeFileSync(trueFileName, buffer);
		return trueFileName;
	};

	client.downloadMediaMessage = async (message) => {
		let mime = (message.msg || message).mimetype || "";
		let messageType = message.mtype ? message.mtype.replace(/Message/gi, "") : mime.split("/")[0];
		const stream = await downloadContentFromMessage(message, messageType);
		let buffer = Buffer.from([]);
		for await (const chunk of stream) {
			buffer = Buffer.concat([buffer, chunk]);
		}
		return buffer;
	};

	client.sendMedia = async (jid, path, fileName = "", caption = "", quoted = "", options = {}, ) => {
		let types = await client.getFile(path, true);
		let {
			mime,
			ext,
			res,
			data,
			filename
		} = types;
		if ((res && res.status !== 200) || file.length <= 65536) {
			try {
				throw {
					json: JSON.parse(file.toString()),
				};
			} catch (e) {
				if (e.json) throw e.json;
			}
		}
		let type = "",
			mimetype = mime,
			pathFile = filename;
		if (options.asDocument) type = "document";
		if (options.asSticker || /webp/.test(mime)) {
			let {
				writeExif
			} = require("./lib/watermark");
			let media = {
				mimetype: mime,
				data,
			};
			pathFile = await writeExif(media, {
				packname: options.packname ? options.packname : global.packname,
				author: options.author ? options.author : global.author,
				categories: options.categories ? options.categories : [],
			});
			await fs.promises.unlink(filename);
			type = "sticker";
			mimetype = "image/webp";
		} else if (/image/.test(mime)) type = "image";
		else if (/video/.test(mime)) type = "video";
		else if (/audio/.test(mime)) type = "audio";
		else type = "document";
		await client.sendMessage(jid, {
			[type]: {
				url: pathFile,
			},
			caption,
			mimetype,
			fileName,
			...options,
		}, {
			quoted,
			...options,
		}, );
		return fs.promises.unlink(pathFile);
	};

	client.cMod = (jid, copy, text = "", sender = client.user.id, options = {}, ) => {
		let mtype = Object.keys(copy.message)[0];
		let isEphemeral = mtype === "ephemeralMessage";
		if (isEphemeral) {
			mtype = Object.keys(copy.message.ephemeralMessage.message)[0];
		}
		let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message;
		let content = msg[mtype];
		if (typeof content === "string") msg[mtype] = text || content;
		else if (content.caption) content.caption = text || content.caption;
		else if (content.text) content.text = text || content.text;
		if (typeof content !== "string") msg[mtype] = {
			...content,
			...options,
		};
		if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant;
		else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant;
		if (copy.key.remoteJid.includes("@s.whatsapp.net")) sender = sender || copy.key.remoteJid;
		else if (copy.key.remoteJid.includes("@broadcast")) sender = sender || copy.key.remoteJid;
		copy.key.remoteJid = jid;
		copy.key.fromMe = sender === client.user.id;
		return proto.WebMessageInfo.fromObject(copy);
	};

	client.getFile = async (PATH, save) => {
		let res;
		let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,` [1], "base64") : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? ((filename = PATH), fs.readFileSync(PATH)) : typeof PATH === "string" ? PATH : Buffer.alloc(0);
		let type = (await FileType.fromBuffer(data)) || {
			mime: "application/octet-stream",
			ext: ".bin",
		};
		filename = path.join(__filename, "../src/" + new Date() * 1 + "." + type.ext, );
		if (data && save) fs.promises.writeFile(filename, data);
		return {
			res,
			filename,
			size: await getSizeMedia(data),
			...type,
			data,
		};
	};
	return client;
}
startAdrian();
let file = require.resolve(__filename);
fs.watchFile(file, () => {
	fs.unwatchFile(file);
	console.log(chalk.redBright(`Update ${__filename}`));
	delete require.cache[file];
	require(file);
});
