document.addEventListener('DOMContentLoaded', function () {
    const over = document.querySelector('#over');
    const TextoCor = document.querySelector('#texto-cor');
    const background = document.querySelector('#background');
    const btnconta = document.querySelector('#btnConta');
    const stringcount = document.querySelector('#counter');
    const backcolor = document.querySelector('#backColor');
    const body = document.querySelector('body');
    const colorSelect = document.querySelector('#colorSelect');
    const autoCounterDisplay = document.querySelector('#autoCounter');
    let random = 0;
    let autoCounter = 0; 
    if (!localStorage.getItem('counter')) {
        localStorage.setItem('counter', 0);
    }

    stringcount.textContent = localStorage.getItem('counter');

    function mudarTexto() {
        if (over.innerText == "Passa por aqui!") {
            over.innerText = "Obrigado por passares!";
        } else {
            over.innerText = "Passa por aqui!";
        }
    }

    document.querySelectorAll('button[data-color]').forEach(button => {
        button.addEventListener('click', () => {
            TextoCor.style.color = button.dataset.color;
        });
    });

    function autoCount() {
        autoCounter++; 
        autoCounterDisplay.textContent = `Automatic Counter: ${autoCounter}`; 
    }
    setInterval(autoCount, 1000);

    document.querySelector('form').onsubmit = (e) => {
        e.preventDefault();

        const name = document.querySelector('#name').value;
        const age = document.querySelector('#age').value;
        const message = `Olá, o ${name} tem ${age} anos!`;
        document.querySelector('#message').textContent = message;
    };

    function muda_aleatorio() {
        random++;
        if (random % 4 == 0) background.style.backgroundColor = 'grey';
        if (random % 4 == 1) background.style.backgroundColor = 'lightblue';
        if (random % 4 == 2) background.style.backgroundColor = 'salmon';
        if (random % 4 == 3) background.style.backgroundColor = 'khaki';
    }

    colorSelect.onchange = function () {
        body.style.backgroundColor = colorSelect.value;
    };

    function count() {

        let counter = parseInt(localStorage.getItem('counter'));
        counter++;
        stringcount.textContent = counter;
        localStorage.setItem('counter', counter);
    }

    function changeBackgroundColor() {
        const colorinput = document.querySelector('#colorInput').value;
        body.style.backgroundColor = colorinput;
    }


    over.addEventListener('mouseover', mudarTexto);
    over.addEventListener('mouseout', mudarTexto);
    background.addEventListener('keyup', muda_aleatorio);
    btnconta.addEventListener('click', count);
    backcolor.addEventListener('click', changeBackgroundColor);
});
