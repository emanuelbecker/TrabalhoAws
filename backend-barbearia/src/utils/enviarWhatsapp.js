import fetch from 'node-fetch'; // npm install node-fetch@2

/**
 * Envia WhatsApp via microserviço rodando em http://localhost:3333
 */
export async function enviarMensagemWhatsApp(numeroCliente, barbeiro, data, hora, servico) {
  const mensagem = `Olá aqui é da Barbearia Corte & Estilo e estamos passando aqui para avisar que seu agendamento foi confirmado com o barbeiro: ${barbeiro}
às ${hora} no dia ${data} que será realizado o serviço de: ${servico}`;

  console.log('[DEBUG] Enviando WhatsApp via microserviço:', {
    numeroCliente,
    mensagem
  });

  try {
    const resposta = await fetch('http://localhost:3333/send-message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ numero: numeroCliente, mensagem }),
    });
    const resultado = await resposta.json();
    if (!resposta.ok) {
      console.error('[Microserviço] Erro ao enviar mensagem:', resultado);
    } else {
      console.log('[Microserviço] Mensagem enviada com sucesso!');
    }
  } catch (error) {
    console.error('[Microserviço] Falha ao conectar ao microserviço:', error);
  }
}
