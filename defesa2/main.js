document.addEventListener('DOMContentLoaded', () => {
    fetch('https://deisishop.pythonanywhere.com/products/')
        .then(response => response.json())
        .then(produtos => {
            carregarProdutos(produtos);
            carregarFiltros(produtos);
        })
        .catch(error => console.error('Erro ao carregar produtos:', error));

    carregarCarrinho();
});

let filtroCategoria = 'Todas as Categorias';
let ordemSelecionada = 'padrao';
let termoPesquisa = '';

function carregarFiltros(produtos) {
    fetch('https://deisishop.pythonanywhere.com/categories/')
        .then(response => response.json())
        .then(categorias => {
            const filtrosContainer = document.createElement('section');
            filtrosContainer.id = 'filtros-categorias';
            filtrosContainer.classList.add('filtros');

            // Filtro de Categoria
            const titulo = document.createElement('h3');
            titulo.textContent = 'Filtrar';
            filtrosContainer.append(titulo);

            const categoriaSelect = document.createElement('select');
            categoriaSelect.id = 'categoria-select';
            filtrosContainer.append(categoriaSelect);

            const todasCategoriasOption = document.createElement('option');
            todasCategoriasOption.textContent = 'Todas as Categorias';
            todasCategoriasOption.value = 'Todas as Categorias';
            categoriaSelect.append(todasCategoriasOption);

            categorias.forEach(categoria => {
                const option = document.createElement('option');
                option.textContent = categoria;
                option.value = categoria;
                categoriaSelect.append(option);
            });

            categoriaSelect.addEventListener('change', () => {
                filtroCategoria = categoriaSelect.value;
                atualizarProdutosFiltrados(produtos);
            });
            
            // Ordenação por Preço
            const ordenarTitulo = document.createElement('h3');
            ordenarTitulo.textContent = 'Ordenar';
            filtrosContainer.append(ordenarTitulo);

            const ordenarSelect = document.createElement('select');
            ordenarSelect.id = 'ordenar-select';
            filtrosContainer.append(ordenarSelect);

            const ordemPadrao = document.createElement('option');
            ordemPadrao.textContent = 'Ordenar pelo preço';
            ordemPadrao.value = 'padrao';
            ordenarSelect.append(ordemPadrao);

            const ordemDecrescente = document.createElement('option');
            ordemDecrescente.textContent = 'Rating Decrescente';
            ordemDecrescente.value = 'Rating Decrescente';
            ordenarSelect.append(ordemDecrescente);

            const ordemCrescente = document.createElement('option');
            ordemCrescente.textContent = 'Rating Crescente';
            ordemCrescente.value = 'Rating Crescente';
            ordenarSelect.append(ordemCrescente);



            ordenarSelect.addEventListener('change', () => {
                ordemSelecionada = ordenarSelect.value;
                atualizarProdutosFiltrados(produtos);
            });

            // Barra de Pesquisa
            const pesquisaTitulo = document.createElement('h3');
            pesquisaTitulo.textContent = 'Procurar';
            filtrosContainer.append(pesquisaTitulo);

            const barraPesquisa = document.createElement('input');
            barraPesquisa.type = 'text';
            barraPesquisa.placeholder = 'Pesquisar produto...';
            barraPesquisa.id = 'barra-pesquisa';
            filtrosContainer.append(barraPesquisa);

            barraPesquisa.addEventListener('keyup', () => {
                termoPesquisa = barraPesquisa.value.toLowerCase();
                atualizarProdutosFiltrados(produtos);
            });

            const sectionProdutos = document.getElementById('produtos');
            sectionProdutos.before(filtrosContainer, sectionProdutos);

            const botaoRemoverTodos = document.createElement('button');
            botaoRemoverTodos.textContent = 'Remover Todos do Carrinho';
            botaoRemoverTodos.addEventListener('click', () => {
                produtos.forEach((index) => carrinho.splice(index, 1),
                localStorage.setItem('carrinho', JSON.stringify(carrinho)),
                carregarCarrinho())
            });
            filtrosContainer.append(botaoRemoverTodos);

            const botaoRemoverDescricoes = document.createElement('button');
            botaoRemoverDescricoes.textContent = 'menos info';
            botaoRemoverDescricoes.addEventListener('click', () => {
                const produtosElements = document.querySelectorAll('.product-card .descricao');
                produtosElements.forEach(descricao => descricao.remove()); 
            });
            filtrosContainer.append(botaoRemoverDescricoes);

            const nome = document.createElement('input');
            nome.type = 'text';
            nome.placeholder = 'Insira nome';
            nome.id = 'nome'
            filtrosContainer.append('nome')
            postMessage(nome);
        })
        .catch(error => console.error('Erro ao carregar categorias:', error));
}

function atualizarProdutosFiltrados(produtos) {
    let produtosFiltrados = filtroCategoria === 'Todas as Categorias'
        ? produtos
        : produtos.filter(produto => produto.category === filtroCategoria);

    if (termoPesquisa) {
        produtosFiltrados = produtosFiltrados.filter(produto =>
            produto.title.toLowerCase().includes(termoPesquisa) ||
            produto.description.toLowerCase().includes(termoPesquisa)
        );
    }

    if (ordemSelecionada === 'Rating Decrescente') {
        produtosFiltrados.sort((a, b) => b.rating - a.rating);
    } else if (ordemSelecionada === 'Rating Crescente') {
        produtosFiltrados.sort((a, b) => a.rating - b.rating);
    }

    carregarProdutos(produtosFiltrados);
}

function adicionarCarrinho(produto) {
    try {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        carrinho.push(produto);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        carregarCarrinho();
    } catch (error) {
        console.error('Erro ao adicionar ao cesto:', error);
    }
}

function carregarProdutos(produtos) {
    const sectionProdutos = document.getElementById('produtos');
    sectionProdutos.innerHTML = '';

    produtos.forEach(produto => {
        const artigo = criarProduto(produto);
        sectionProdutos.append(artigo);
    });
}

function criarProduto(produto) {
    const artigo = document.createElement('article');
    artigo.classList.add('product-card');

    const titulo = document.createElement('h3');
    titulo.textContent = produto.title;

    const categoria = document.createElement('span');
    categoria.textContent = produto.category;

    const imagem = document.createElement('img');
    imagem.src = produto.image;
    imagem.alt = produto.title;

    const descricao = document.createElement('p');
    descricao.textContent = produto.description;
    descricao.classList.add('descricao')

    const rating = document.createElement('p');
    rating.textContent = `Rating: ${produto.rating.rate} ⭐ (${produto.rating.count} avaliações)`;
    rating.classList.add('rating');

    const preco = document.createElement('p');
    preco.textContent = `Preço: ${produto.price.toFixed(2)}€`;

    const btn = document.createElement('button');
    btn.textContent = '+ Adicionar ao Cesto';
    btn.addEventListener('click', () => adicionarCarrinho(produto));

    artigo.append(titulo, categoria, imagem, descricao, rating ,preco, btn);
    return artigo;
}

function carregarCarrinho() {
    const selecionados = document.getElementById('selecionados');
    const custoTotal = document.getElementById('custo-total');
    selecionados.innerHTML = '';
    custoTotal.innerHTML = '';

    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    if (carrinho.length === 0) {
        const mensagemVazia = document.createElement('p');
        mensagemVazia.textContent = 'O carrinho está vazio';
        mensagemVazia.classList.add('preco-inicial'); 
        selecionados.appendChild(mensagemVazia);
        return;
    }

    let total = 0;

    carrinho.forEach((produto, index) => {
        const artigo = document.createElement('article');
        artigo.classList.add('product-card'); 

        const titulo = document.createElement('h3');
        titulo.textContent = produto.title;
        titulo.classList.add('titulo'); 

        const categoria = document.createElement('span');
        categoria.textContent = produto.category;
        categoria.classList.add('categoria'); 

        const imagem = document.createElement('img');
        imagem.src = produto.image;
        imagem.alt = produto.title;
        imagem.classList.add('imagem'); 

        const descricao = document.createElement('p');
        descricao.textContent = produto.description;
        descricao.classList.add('descricao'); 

        const preco = document.createElement('p');
        preco.textContent = `Preço: ${produto.price.toFixed(2)}€`;
        preco.classList.add('price'); 

        const btnRemover = document.createElement('button');
        btnRemover.textContent = '- Remover do Cesto';
        btnRemover.classList.add('remover-botao'); 
        btnRemover.addEventListener('click', () => {
            carrinho.splice(index, 1);
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            carregarCarrinho();
        });

        artigo.append(titulo, categoria, imagem, descricao, preco, btnRemover);
        selecionados.append(artigo);

        total += produto.price;
    });

    
    const totalElement = document.createElement('p');
    totalElement.textContent = `Custo total: ${total.toFixed(2)}€`;
    totalElement.classList.add('preco-total'); 
    custoTotal.appendChild(totalElement);

    
    const comprar = document.createElement('section');
    comprar.classList.add('comprar');

    const estudanteVerificar = document.createElement('h4');
    estudanteVerificar.classList.add('estudante');
    estudanteVerificar.textContent = 'És estudante do DEISI?';

    const verificar = document.createElement('input');
    verificar.classList.add('estudante');
    verificar.type = 'checkbox';

    const cupao = document.createElement('h4');
    cupao.classList.add('cupao');
    cupao.textContent = 'Cupão de desconto:';

    const desconto = document.createElement('input');
    desconto.classList.add('cupao');
    desconto.type = 'text';

    const btn = document.createElement('button');
    btn.classList.add('btn');
    btn.textContent = 'Comprar';

    const valorFinalElement = document.createElement('p');
    valorFinalElement.classList.add('recibo');
    valorFinalElement.textContent = '';

    const referenciaElement = document.createElement('p');
    referenciaElement.classList.add('recibo');
    referenciaElement.textContent = '';

    comprar.append(totalElement);
    comprar.append(estudanteVerificar);
    comprar.append(verificar);
    comprar.append(cupao);
    comprar.append(desconto);
    comprar.append(btn);
    comprar.append(valorFinalElement);
    comprar.append(referenciaElement);

    btn.addEventListener('click', () => {
        const produtosIds = carrinho.map(produto => produto.id);
        const dadosDesconto = {
            products: produtosIds,
            student: verificar.checked,
            coupon: desconto.value,
        };
    
        fetch('https://deisishop.pythonanywhere.com/buy/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosDesconto),
        })
        .then(response => response.json())
        .then(dados => {
            if (dados.error) {
                valorFinalElement.textContent = `Erro: ${dados.error}`;
                referenciaElement.textContent = '';
            } else if (dados.totalCost !== undefined && !isNaN(dados.totalCost)) {
                const totalCost = parseFloat(dados.totalCost);
                valorFinalElement.textContent = `Valor final a pagar (com eventuais descontos): ${totalCost.toFixed(2)}€`;
                referenciaElement.textContent = `Referência de pagamento: ${dados.reference}`;
            } else {
                valorFinalElement.textContent = 'Erro inesperado na resposta do servidor.';
                referenciaElement.textContent = '';
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            valorFinalElement.textContent = `Erro na compra: ${error.message}`;
            referenciaElement.textContent = '';
        });
    });
    

    custoTotal.appendChild(comprar);
}


