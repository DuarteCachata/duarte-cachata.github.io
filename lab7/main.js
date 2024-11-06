const over = document.querySelector('#over');
const btnred = document.querySelector('#btnRed')
const btngreen = document.querySelector('#btnGreen')
const btnblue = document.querySelector('#btnBlue')
const TextoCor = document.querySelector('#texto-cor')
const background = document.querySelector('#background')
const btnconta = document.querySelector('#btnConta')
const stringcount = document.querySelector('#counter')
const colorinput = document.querySelector('#colorInput')
const backcolor = document.querySelector('#backColor')
let random = 0;
let counter = 0;

function mudarTexto() {
    if (over.innerText == "Passa por aqui!"){
        over.innerText = "Obrigado por passares!";
    }else{
        over.innerText = "Passa por aqui!";
    }
}

function button_red(){
    TextoCor.style.color = "red";
}

function button_green(){
    TextoCor.style.color = "green";
}

function button_blue(){
    TextoCor.style.color = "blue";
}

function muda_aleatorio(){
    random++;
    if(random % 4 == 0) background.style.backgroundColor = 'grey'
    if(random % 4 == 1) background.style.backgroundColor = 'lightblue'
    if(random % 4 == 2) background.style.backgroundColor = 'salmon'
    if(random % 4 == 3) background.style.backgroundColor = 'khaki'

}

function count(){
    counter++;
    stringcount.innerHTML=counter;
}

function changeBackgroundColor() {
    const color = colorinput.value;  
    document.body.style.backgroundColor = 'color';
}


over.addEventListener('mouseover', mudarTexto);
over.addEventListener('mouseout', mudarTexto);
btnred.addEventListener('click',button_red);
btngreen.addEventListener('click',button_green);
btnblue.addEventListener('click',button_blue);
background.addEventListener('keyup', muda_aleatorio)
btnconta.addEventListener('click',count)
backcolor.addEventListener('click',changeBackgroundColor)