// Função para criar partículas no fundo
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    // Limpa partículas existentes
    particlesContainer.innerHTML = '';
    
    // Número de partículas com base na largura da tela
    const particleCount = window.innerWidth < 768 ? 20 : 40;
    
    // Cores das partículas
    const colors = ['#00f7ff', '#6d30ff', '#ff2e93'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Posicionamento aleatório
        const size = Math.random() * 3 + 1; // Tamanho entre 1px e 4px
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`;
        
        // Duração da animação aleatória
        const duration = Math.random() * 20 + 15; // Entre 15s e 35s
        particle.style.setProperty('--duration', `${duration}s`);
        
        // Atraso aleatório
        particle.style.animationDelay = `${Math.random() * duration}s`;
        
        // Cor aleatória
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Opacidade aleatória
        particle.style.opacity = Math.random() * 0.5 + 0.1; // Entre 0.1 e 0.6
        
        particlesContainer.appendChild(particle);
    }
}

// Scroll ultra fluido com easing personalizado
document.querySelectorAll('.nav-links a, .hero-content a, .cta-content a, .btn, .btn-primary, .btn-secondary').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Verifica se é um link interno (começa com #)
        if (href && href.startsWith('#')) {
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                // Calcula a posição considerando o header fixo
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                // Posição atual de scroll
                const startPosition = window.pageYOffset;
                // Distância a percorrer
                const distance = targetPosition - startPosition;
                // Duração do scroll em ms (ajustável)
                const duration = 800;
                
                let startTime = null;
                
                // Função de animação com easing para scroll super fluido
                function animation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const progress = Math.min(timeElapsed / duration, 1);
                    
                    // Função de easing: easeOutQuint - extremamente fluida no final
                    const easeProgress = 1 - Math.pow(1 - progress, 5);
                    
                    window.scrollTo(0, startPosition + distance * easeProgress);
                    
                    if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                    }
                }
                
                requestAnimationFrame(animation);
            }
        }
    });
});

// Inicialização
document.addEventListener("DOMContentLoaded", function() {
    // Cria partículas
    createParticles();
    
    // Recria partículas quando a janela é redimensionada
    window.addEventListener('resize', createParticles);

    // Formatação do telefone
    const phoneInput = document.getElementById("whatsapp");
    if (phoneInput) {
        phoneInput.addEventListener("input", function(e) {
            let input = e.target.value.replace(/\D/g, "").slice(0, 11);
            if (input.length >= 3) {
                input = "(" + input.slice(0, 2) + ") " + input.slice(2);
            }
            if (input.length >= 10) {
                input = input.slice(0, 9) + "-" + input.slice(9);
            }
            e.target.value = input;
        });
    }

    // Disparar conversão ao clicar no botão WhatsApp do formulário
    const whatsappFormBtn = document.querySelector('.btn-whatsapp-form');
    if (whatsappFormBtn) {
        whatsappFormBtn.addEventListener('click', function() {
            if (window.triggerAdsConversion) window.triggerAdsConversion();
        });
    }

    // Disparar conversão ao clicar no botão flutuante WhatsApp
    const whatsappFloatBtn = document.querySelector('.whatsapp-btn');
    if (whatsappFloatBtn) {
        whatsappFloatBtn.addEventListener('click', function() {
            if (window.triggerAdsConversion) window.triggerAdsConversion();
        });
    }

    // Certifica que o scroll funciona bem em dispositivos móveis
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
        // Em dispositivos móveis, ajustamos a duração para ser um pouco mais rápida
        document.documentElement.style.setProperty('--scroll-timeline', '600ms');
    }
});
