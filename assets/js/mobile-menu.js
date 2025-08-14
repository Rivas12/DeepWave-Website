// Menu mobile responsivo
document.addEventListener('DOMContentLoaded', function() {
    // Criar o botão de hambúrguer e adicionar ao DOM
    const nav = document.querySelector('nav');
    
    if (nav) {
        // Cria o botão de hambúrguer
        const hamburgerBtn = document.createElement('div');
        hamburgerBtn.classList.add('hamburger-menu');
        
        // Adiciona três linhas ao botão
        for (let i = 0; i < 3; i++) {
            const line = document.createElement('span');
            line.classList.add('hamburger-line');
            hamburgerBtn.appendChild(line);
        }
        
        // Adiciona o botão ao nav
        nav.appendChild(hamburgerBtn);
        
        // Seletor para nav links
        const navLinks = document.querySelector('.nav-links');
        
        // Função de toggle para o menu
        hamburgerBtn.addEventListener('click', function() {
            hamburgerBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
            // Impede o scroll quando o menu está aberto
            document.body.classList.toggle('menu-open');
        });
        
        // Fecha o menu ao clicar em um link do menu
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                hamburgerBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
        
        // Fecha o menu ao redimensionar para desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                hamburgerBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
});
