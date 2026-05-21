// 1. Menu Mobile Toggle (Responsividade)
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Alterna a classe de ativação no menu
        nav.classList.toggle('nav-active');

        // Animação do ícone do hambúrguer (transforma em X)
        burger.classList.toggle('toggle');
    });

    // Fecha o menu ao clicar em um link (útil para celulares)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
            }
        });
    });
}

// 2. Animação de Fade-in ao Rolar a Página (Intersection Observer)
const scrollAppear = () => {
    const elements = document.querySelectorAll('.fade-in');
    
    // Opções do observador
    const appearOptions = {
        threshold: 0.15, // Aciona quando 15% do elemento estiver visível
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target); // Para de observar depois que já apareceu
            }
        });
    }, appearOptions);

    elements.forEach(element => {
        appearOnScroll.observe(element);
    });
}

// Executar funções após o carregamento da página
document.addEventListener('DOMContentLoaded', () => {
    navSlide();
    scrollAppear();
});
