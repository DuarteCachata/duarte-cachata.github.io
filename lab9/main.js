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
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || []; 
    const selecionadosContainer = document.getElementById('selecionados');
    selecionadosContainer.innerHTML = ''; 

    if (carrinho.length === 0) {
        const mensagem = document.createElement('p');
        mensagem.textContent = 'Custo Total: 0.00€';
        mensagem.classList.add('preco-inicial');
        selecionadosContainer.append(mensagem);
        return;
    }

    let precoTotal = 0; 

    carrinho.forEach((produto, index) => {
        const artigoProduto = criarProdutoCarrinho(produto, index); 
        selecionadosContainer.append(artigoProduto); 
        precoTotal += produto.price; 
    });

  
    const totalElement = document.createElement('p');
    totalElement.textContent = `Custo Total: ${precoTotal}€`;
    totalElement.classList.add('preco-total');
    selecionadosContainer.append(totalElement);
}

function criarProdutoCarrinho(produto, index) {
    const artigo = document.createElement('article');
    artigo.classList.add('product-card'); 

// Título
const titulo = document.createElement('h3');
titulo.textContent = produto.title;

// Imagem
const imagem = document.createElement('img');
imagem.src = produto.image;
imagem.alt = produto.title;
imagem.classList.add('imagem');

// Descrição
const descricao = document.createElement('p');
descricao.textContent = produto.description;
descricao.classList.add('descricao');

// Preço
const preco = document.createElement('p');
preco.textContent = `Preço: ${produto.price}€`;
preco.classList.add('price');

// Rating
const rating = document.createElement('p');
rating.textContent = `Rating: ${produto.rating.rate} ⭐ (${produto.rating.count} avaliações)`;
rating.classList.add('rating');

    // Botão para remover
    const botaoRemover = document.createElement('button');
    botaoRemover.textContent = '- Remover do Cesto';
    botaoRemover.classList.add('remover-botao');
    botaoRemover.addEventListener('click', function () {
        removerProdutoCarrinho(index); // Função para remover o produto
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

    // Título
    const titulo = document.createElement('h3');
    titulo.textContent = produto.title;

    // Imagem
    const imagem = document.createElement('img');
    imagem.src = produto.image;
    imagem.alt = produto.title;
    imagem.classList.add('imagem');

    // Descrição
    const descricao = document.createElement('p');
    descricao.textContent = produto.description;
    descricao.classList.add('descricao');

    // Preço
    const preco = document.createElement('p');
    preco.textContent = `Preço: ${produto.price}€`;
    preco.classList.add('price');

    // Rating
    const rating = document.createElement('p');
    rating.textContent = `Rating: ${produto.rating.rate} ⭐ (${produto.rating.count} avaliações)`;
    rating.classList.add('rating');

    // Botão para adicionar ao carrinho
    const botao = document.createElement('button');
    botao.textContent = '+ Adicionar ao Cesto';
    botao.addEventListener('click', function () {
        adicionarAoCarrinho(produto); // Chama a função de adicionar
    });

    artigo.append(titulo, imagem, descricao, preco, rating, botao);

    return artigo;
}
