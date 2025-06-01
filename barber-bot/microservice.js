const express = require('express');
const wppconnect = require('@wppconnect-team/wppconnect');

const app = express();
app.use(express.json());

let clientGlobal = null;

wppconnect.create({
  session: 'barber-bot-session',
  logQR: true, // mostra o QR code só na primeira vez
  autoClose: false,
  catchQR: (base64Qrimg, asciiQR, attempts, urlCode) => {
    console.log('Escaneie o QR Code para autenticar:');
    console.log(asciiQR);
  },
  statusFind: (statusSession, session) => {
    console.log('Status da sessão:', statusSession);
  }
})
.then((client) => {
  clientGlobal = client;

  // Endpoint HTTP para envio de mensagem:
  app.post('/send-message', async (req, res) => {
    const { numero, mensagem } = req.body;
    if (!numero || !mensagem) {
      return res.status(400).json({ error: 'Informe numero e mensagem.' });
    }
    try {
      const to = numero.replace(/\D/g, '') + '@c.us';
      await client.sendText(to, mensagem);
      res.json({ status: 'Mensagem enviada com sucesso!' });
    } catch (err) {
      console.error('Erro ao enviar WhatsApp:', err);
      res.status(500).json({ error: 'Falha ao enviar mensagem.' });
    }
  });

  // Inicie o microserviço HTTP só depois do WhatsApp estar pronto!
  app.listen(3333, () => {
    console.log('Microserviço WhatsApp rodando em http://localhost:3333');
  });
})
.catch((error) => {
  console.error('Erro geral ao iniciar microserviço:', error);
  process.exit(1);
});
