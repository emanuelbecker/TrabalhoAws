const wppconnect = require('@wppconnect-team/wppconnect');

const numeroCliente = process.argv[2];
const mensagem = process.argv.slice(3).join(' ');

if (!numeroCliente || !mensagem) {
  console.log('Uso: node sendMessage.js <numeroCliente> <mensagem>');
  process.exit(1);
}

wppconnect.create({
  session: 'barber-bot-session',
  logQR: false,
  autoClose: false,
  disableWelcome: true,
  catchQR: (base64Qrimg, asciiQR, attempts, urlCode) => {
    console.log('Escaneie o QR Code para autenticar:');
    console.log(asciiQR);
  },
  statusFind: (statusSession, session) => {
    console.log('Status da sessão:', statusSession);
  }
})
.then((client) => {
  // Tenta enviar mensagem assim que conectar!
  client.sendText(numeroCliente + '@c.us', mensagem)
    .then((result) => {
      console.log('Mensagem enviada!', result);
      process.exit();
    })
    .catch((error) => {
      console.error('Erro ao enviar', error);
      process.exit();
    });
})
.catch((error) => {
  console.error('Erro geral:', error);
  process.exit(1);
});
