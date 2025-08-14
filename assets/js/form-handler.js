// CSS para notificação de envio do formulário
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: #6d30ff;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 9999;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    }
    
    .notification.show {
        transform: translateX(0);
    }
`;
document.head.appendChild(notificationStyle);

// Manipulação do formulário de contato
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Valida os campos
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const whatsapp = document.getElementById('whatsapp').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !whatsapp || !message) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Mudar texto do botão
            const submitBtn = document.querySelector('.btn-submit span');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            
            // Dispara o evento de conversão do Google Ads
            if (typeof trackConversion === 'function') {
                trackConversion();
            }
            
            // Submete o formulário diretamente
            const formData = new FormData(form);
            
            fetch(form.action, {
                method: 'POST',
                body: formData,
                mode: 'no-cors' // Permite requisições cross-origin sem CORS
            })
            .then(() => {
                // Como usamos no-cors, sempre assumimos sucesso se não houver erro de rede
                submitBtn.textContent = '✅ Enviado!';
                
                // Criar notificação
                const notification = document.createElement('div');
                notification.className = 'notification';
                notification.innerHTML = '🎉 Solicitação enviada com sucesso!';
                document.body.appendChild(notification);
                
                // Mostrar notificação
                setTimeout(() => {
                    notification.classList.add('show');
                }, 100);
                
                // Limpar formulário
                form.reset();
                
                // Remover notificação e resetar botão após 3 segundos
                setTimeout(() => {
                    notification.classList.remove('show');
                    setTimeout(() => {
                        notification.remove();
                        submitBtn.textContent = originalText;
                    }, 300);
                }, 3000);
            })
            .catch(error => {
                // Erro no envio (apenas erros de rede)
                submitBtn.textContent = '❌ Erro no envio';
                
                // Criar notificação de erro
                const notification = document.createElement('div');
                notification.className = 'notification';
                notification.style.background = '#ff4757';
                notification.innerHTML = '❌ Erro ao enviar. Tente novamente!';
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.classList.add('show');
                }, 100);
                
                setTimeout(() => {
                    notification.classList.remove('show');
                    setTimeout(() => {
                        notification.remove();
                        submitBtn.textContent = originalText;
                    }, 300);
                }, 3000);
            });
        });
    }
});
