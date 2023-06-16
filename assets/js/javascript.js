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
    
            console.log(data);
    
            let categoria = document.createElement('ul');
            categoria.setAttribute("class", "dropdown-menu");
            listaCategorias.appendChild(categoria);
    
            data.genres.forEach(element => {
                let liCategoria = document.createElement('li');
                let item = document.createElement('a');
                
                item.setAttribute("class", "dropdown-item");
                item.innerText = element.name;
                
                liCategoria.appendChild(item);
                categoria.appendChild(liCategoria);
    
    
            });
        }).catch(err => console.log(err))
    
        .catch(err => console.log(err));

}


MontarMenuCategorias();