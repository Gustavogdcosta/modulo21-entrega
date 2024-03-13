document.addEventListener('DOMContentLoaded', function(){
    const buttons = document.querySelectorAll('[data-tab-button]');

    for (let i=0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function(botao){
            const abaAlvo = botao.target.dataset.tabButton;
            const aba = document.querySelector(`[data-tab-id=${abaAlvo}]`);
            escondeTodasAbas();
            aba.classList.add('wallpapers__list--is-active');
            removeBotaoAtivo();
            botao.target.classList.add('wallpapers__tabs__button--is-active')
        })
    }
})

function removeBotaoAtivo(){
    const buttons = document.querySelectorAll('[data-tab-button]');

    for (let i=0; i < buttons.length; i++) {
        buttons[i].classList.remove('wallpapers__list--is-active')
    }
}