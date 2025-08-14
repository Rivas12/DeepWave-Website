// Script para os botões que redirecionam para WhatsApp
document.addEventListener('DOMContentLoaded', function() {
    // Função para redirecionar para WhatsApp
    function redirectToWhatsApp(e) {
        e.preventDefault(); // Previne o comportamento padrão de rolagem
        
        // Número de WhatsApp e mensagem predefinida
        const phoneNumber = '5511970838617'; // Use o formato internacional
        const message = 'Olá! Gostaria de contratar os serviços da DeepWave para o desenvolvimento do meu site!';
        
        // Cria o link do WhatsApp
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        
        // Abre em uma nova aba
        window.open(whatsappLink, '_blank');
        
        // Registra conversão, se a função estiver disponível
        if (window.triggerAdsConversion) {
            window.triggerAdsConversion();
        }
    }
    
    // Botão "Contratar Agora" no menu de navegação
    const navCtaButton = document.querySelector('.btn-nav-cta');
    if (navCtaButton) {
        // Adiciona o redirecionamento para WhatsApp
        navCtaButton.addEventListener('click', redirectToWhatsApp);
    }
    
    // Botão "Aproveitar oferta especial" na seção CTA
    const promotionButton = document.querySelector('.btn-promotion.whatsapp-redirect');
    if (promotionButton) {
        promotionButton.addEventListener('click', redirectToWhatsApp);
    }
});
