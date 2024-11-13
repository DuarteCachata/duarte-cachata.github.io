document.addEventListener('DOMContentLoaded', function () {
const over = document.querySelector('#over');
const TextoCor = document.querySelector('#texto-cor')
const background = document.querySelector('#background')
const btnconta = document.querySelector('#btnConta')
const stringcount = document.querySelector('#counter')
const backcolor = document.querySelector('#backColor')
const body = document.querySelector('body')
const colorSelect = document.querySelector('#colorSelect')
let random = 0;
let counter = 0;

function mudarTexto() {
    if (over.innerText == "Passa por aqui!"){
        over.innerText = "Obrigado por passares!";
    }else{
        over.innerText = "Passa por aqui!";
    }
}

document.querySelectorAll('button[data-color]').forEach(button => {
    button.addEventListener('click', () => {
        TextoCor.style.color = button.dataset.color;
    })
})

function muda_aleatorio(){
    random++;
    if(random % 4 == 0) background.style.backgroundColor = 'grey'
    if(random % 4 == 1) background.style.backgroundColor = 'lightblue'
    if(random % 4 == 2) background.style.backgroundColor = 'salmon'
    if(random % 4 == 3) background.style.backgroundColor = 'khaki'

}

colorSelect.onchange = function() {
    body.style.backgroundColor = colorSelect.value;
}

const count = () => {
    counter++;
    stringcount.innerHTML = counter;
};

function changeBackgroundColor() {  
    const colorinput = document.querySelector('#colorInput').value
    body.style.backgroundColor = colorinput;
}


over.addEventListener('mouseover', mudarTexto);
over.addEventListener('mouseout', mudarTexto);
background.addEventListener('keyup', muda_aleatorio);
btnconta.addEventListener('click',count);
backcolor.addEventListener('click',changeBackgroundColor);

})