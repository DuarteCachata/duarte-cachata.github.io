document.addEventListener('DOMContentLoaded', function () {
    carregarProdutos(produtos);
});

function carregarProdutos(produtos) {

    const produtosContainer = document.getElementById('produtos');

    produtos.forEach(produto => {
        console.log(produto); 
        console.log(`ID: ${produto.id}, Título: ${produto.title}`); 

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

    artigo.append(titulo, imagem, descricao, preco, rating, botao);

    return artigo;
}
