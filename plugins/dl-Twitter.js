import axios from 'axios'

let handler = async (m, { conn, text, rcanal }) => {
  if (!text) return conn.reply(m.chat, 'Ingresa un link de twitter', m)

  try {
    await conn.sendMessage(m.chat, { react: { text: rcanal, key: m.key } }) // Reacción
    await conn.reply(m.chat, 'Estoy descargando su video', m)

    let { data } = await axios.get(`https://api.davidcyriltech.my.id/twitter?url=${text}`)
    let { description, video_hd } = data

    let caption = `- *Descripción:* ${description}`

    await conn.sendFile(m.chat, video_hd, 'GokuBlack.mp4', caption, m)
  } catch (error) {
    console.error(error)
    return conn.reply(m.chat, 'Ocurrió un error al descargar el video', m)
  }
}

handler.command = ['twitter', 'twitterdl']
export default handler