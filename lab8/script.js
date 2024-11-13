const box = document.querySelector('#box');
const clickBtn = document.querySelector('#clickBtn');
const textInput = document.querySelector('#textInput');
const message = document.querySelector('#message');
const nameInput = document.querySelector('#nameInput');
const colorSelect = document.querySelector('#colorSelect');
const body = document.querySelector('body')
const container = document.querySelector('#container');


box.addEventListener('mouseover', mudarTexto);
box.addEventListener('mouseout', mudarTexto);
clickBtn.addEventListener('click', btnClick);
textInput.addEventListener('keydown', handleKeyDown);
nameInput.addEventListener('change', handleChange);
colorSelect.addEventListener('change', handleColorChange);


function handleColorChange() {
    const selectedColor = colorSelect.value;
    if (selectedColor) {
        message.innerText = "Escolheu a cor: " + selectedColor;
        body.style.backgroundColor = selectedColor;
        container.style.backgroundColor = selectedColor;

    } else {
        message.innerText = "Nenhuma cor selecionada.";
    }
}

function mudarTexto() {
    if (box.style.backgroundColor == "lightgreen") {
        box.style.backgroundColor = "lightblue";
        message.innerText = "Mouse saiu na área da caixa!";
    } else {
        box.style.backgroundColor = "lightgreen";
        message.innerText = "Mouse entrou da área da caixa!";
    }
}

function btnClick() {
    message.innerText = "O botão foi clicado!";
}

function handleKeyDown(event) {
    message.innerText = "Tecla pressionada: " + event.key;
}

function handleChange() {
    const nameInput = document.querySelector('#nameInput').value;
    message.innerText = "Nome alterado para: " + nameInput;
}

