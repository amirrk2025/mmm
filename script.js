// انیمیشن اسکرول
document.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.game-card');
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight && position.bottom >= 0) {
            element.classList.add('animate');
        }
    });
});
document.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, { rotateY: 20, duration: 0.5 });
    });
    card.addEventListener('mouseleave', () => {
        gsap.to(card, { rotateY: 0, duration: 0.5 });
    });
});
document.addEventListener('mousemove', (e) => {
    document.body.style.backgroundPosition = `${e.pageX / 50}px ${e.pageY / 50}px`;
});
