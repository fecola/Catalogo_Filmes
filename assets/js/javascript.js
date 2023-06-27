const chaveApi = '9956746939dbfda024841d339c21853f';
const auth = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTU2NzQ2OTM5ZGJmZGEwMjQ4NDFkMzM5YzIxODUzZiIsInN1YiI6IjY0Nzg4NTY2OTM4MjhlMDBiZjlkMGRkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nZnj1KfOtLGjNbiYFa7yNCB9DBznOFaWu8TrQ2YMi60';
const urlBaseApi = 'https://api.themoviedb.org/3/';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + auth
    }
};


function MontarMenuCategorias() {
    const listaCategorias = document.getElementById('lista-categorias');

    fetch(urlBaseApi + 'genre/movie/list?language=en', options)
        .then(response => response.json())
        
        .then(data => {    
            console.log('Categorias: ' , data);
    
            let categoria = document.createElement('ul');
            categoria.setAttribute("class", "dropdown-menu");
            listaCategorias.appendChild(categoria);
    
            data.genres.forEach(element => {
                let liCategoria = document.createElement('li');
                let item = document.createElement('a');

                item.setAttribute("value", element.id);
                item.setAttribute("class", "dropdown-item");
                item.setAttribute("onclick", "FilmesDaCategoria(this.getAttribute('value'))");
                item.innerText = element.name;

                
                liCategoria.appendChild(item);
                categoria.appendChild(liCategoria);
    
    
            });
        }).catch(err => console.log(err))
    
        .catch(err => console.log(err));

}



function FilmesDaCategoria(idCategoria) {
    fetch(urlBaseApi + 'discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres='+idCategoria, options)
        .then(response => response.json())        
        .then(data => {    
            console.log('Filmes da Categoria: ' , data.results);
            const divFilmes = document.querySelector('.filmes');

            console.log('catalogo: ', divFilmes);

            data.results.forEach(element => {

                let card = document.createElement('div');
                card.setAttribute('class', 'card mb-3');
                card.setAttribute('data-aos', "fade-left");
                card.style.setProperty('max-width', '540px');

                let subCard1 = document.createElement('div');
                subCard1.setAttribute('class', 'row g-o');
                card.appendChild(subCard1);

                let subCard1_1 = document.createElement('div');
                subCard1_1.setAttribute('class', 'col-md-4');
                subCard1.appendChild(subCard1_1);

                let imgPoster = document.createElement('img');
                imgPoster.setAttribute('class', 'img-fluid rounded-start');
                imgPoster.setAttribute('src', 'https://image.tmdb.org/t/p/original/' + element.poster_path);
                subCard1_1.appendChild(imgPoster);

                let subCard1_2 = document.createElement('div');
                subCard1_2.setAttribute('class', 'col-md-8');
                subCard1.appendChild(subCard1_2);

                let cardBody = document.createElement('div');
                cardBody.setAttribute('class', 'card-body');
                subCard1_2.appendChild(cardBody);

                let h5 = document.createElement('h5');
                h5.setAttribute('class', 'card-title');
                h5.innerText = element.title;

                let sinopse = document.createElement('p');
                sinopse.setAttribute('class', 'card-text');
                sinopse.innerHTML = element.overview;

                let avaliacao = document.createElement('p');
                avaliacao.setAttribute('class', 'card-text');
                avaliacao.innerHTML = 'Avaliação: ' + element.vote_average;

                cardBody.appendChild(h5);
                cardBody.appendChild(sinopse);
                cardBody.appendChild(avaliacao);


                divFilmes.appendChild(card);

            });
    
            
        }).catch(err => console.log('Erro ao montar os cards: ', err))
        .catch(err => console.log('Erro ao retornar filmes da categoria: ', err));
}



MontarMenuCategorias();