const chest = document.getElementById('chest');
const openChestButton = document.getElementById('openChestButton');
const card = document.getElementById('card');

// para abrir el cofre
openChestButton.addEventListener('click', () => {
    if (!chest.classList.contains('opened')) {
        chest.classList.add('opened');
        revealCard();
    }
});

function revealCard() {

    // mostrar los detalles de la card
    card.style.display = 'flex';

    // reseteo y volver a llamar a la peticion para traer la carta random
    setTimeout(() => {
        chest.classList.remove('opened');
        card.style.display = 'none';
        window.location.href = "/variaciones/random";
    }, 3000);
}