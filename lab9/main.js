document.addEventListener('DOMContentLoaded', function () {
    carregarProdutos(produtos); 
    carregarCarrinho(); 
});

function adicionarAoCarrinho(produto) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || []; 
    carrinho.push(produto); 
    localStorage.setItem('carrinho', JSON.stringify(carrinho)); 
    carregarCarrinho();
}

function carregarCarrinho() {
    const selecionadosContainer = document.getElementById('selecionados');
    const totalContainer = document.getElementById('custo-total'); 

    selecionadosContainer.innerHTML = ''; 
    totalContainer.innerHTML = ''; 

    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || []; 

    if (carrinho.length === 0) {

        const totalElement = document.createElement('p');
        totalElement.textContent = 'Custo Total: 0.00€';
        totalElement.classList.add('preco-total');
        totalContainer.append(totalElement);
        return;
    }

    let precoTotal = 0; 

    carrinho.forEach((produto, index) => {
        const artigoProduto = criarProdutoCarrinho(produto, index); 
        selecionadosContainer.append(artigoProduto); 
        precoTotal += produto.price; 
    });

  
    const totalElement = document.createElement('p');
    totalElement.textContent = `Custo Total: ${precoTotal.toFixed(2)}€`;
    totalElement.classList.add('preco-total');
    totalContainer.append(totalElement);
}


function criarProdutoCarrinho(produto, index) {
    const artigo = document.createElement('article');
    artigo.classList.add('product-card'); 


const titulo = document.createElement('h3');
titulo.textContent = produto.title;

const imagem = document.createElement('img');
imagem.src = produto.image;
imagem.alt = produto.title;
imagem.classList.add('imagem');


const descricao = document.createElement('p');
descricao.textContent = produto.description;
descricao.classList.add('descricao');


const preco = document.createElement('p');
preco.textContent = `Preço: ${produto.price}€`;
preco.classList.add('price');


const rating = document.createElement('p');
rating.textContent = `Rating: ${produto.rating.rate} ⭐ (${produto.rating.count} avaliações)`;
rating.classList.add('rating');

    const botaoRemover = document.createElement('button');
    botaoRemover.textContent = '- Remover do Cesto';
    botaoRemover.classList.add('remover-botao');
    botaoRemover.addEventListener('click', function () {
        removerProdutoCarrinho(index); 
    });

    artigo.append(titulo, imagem,descricao, preco,rating, botaoRemover);

    return artigo;
}

function removerProdutoCarrinho(index) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || []; 
    carrinho.splice(index, 1); 
    localStorage.setItem('carrinho', JSON.stringify(carrinho)); 
    carregarCarrinho(); 
}

function carregarProdutos(produtos) {
    const produtosContainer = document.getElementById('produtos');

    produtos.forEach(produto => {
        const artigoProduto = criarProduto(produto);
        produtosContainer.append(artigoProduto);
    });
}

function criarProduto(produto) {
    const artigo = document.createElement('article');
    artigo.classList.add('product-card');

    
    const titulo = document.createElement('h3');
    titulo.textContent = produto.title;

    
    const imagem = document.createElement('img');
    imagem.src = produto.image;
    imagem.alt = produto.title;
    imagem.classList.add('imagem');

    
    const descricao = document.createElement('p');
    descricao.textContent = produto.description;
    descricao.classList.add('descricao');

    const preco = document.createElement('p');
    preco.textContent = `Preço: ${produto.price}€`;
    preco.classList.add('price');

    
    const rating = document.createElement('p');
    rating.textContent = `Rating: ${produto.rating.rate} ⭐ (${produto.rating.count} avaliações)`;
    rating.classList.add('rating');

    
    const botao = document.createElement('button');
    botao.textContent = '+ Adicionar ao Cesto';
    botao.addEventListener('click', function () {
        adicionarAoCarrinho(produto); 
    });
    

    artigo.append(titulo, imagem, descricao, preco, rating, botao);

    return artigo;
}
