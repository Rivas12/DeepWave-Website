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

// Formatação do telefone
document.addEventListener("DOMContentLoaded", function() {
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

    // Certifica que o scroll funciona bem em dispositivos móveis
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Em dispositivos móveis, ajustamos a duração para ser um pouco mais rápida
        document.documentElement.style.setProperty('--scroll-timeline', '600ms');
    }
});
