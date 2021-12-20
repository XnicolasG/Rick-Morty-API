const API = 'https://rickandmortyapi.com/api/character'
const filtro = 'https://rickandmortyapi.com/api/character/?name='

const main = document.getElementById('main');
const buscar = document.getElementById('search');
const barra = document.getElementById('barra');
const logo = document.getElementById('logo');

logo.addEventListener('click', ()=>{
    getCharacters(API)
})

const getCharacters = (url) => {
    const peticion = fetch(url)
    peticion.then(res => res.json())
        .then(datos => personajes(datos.results))
        .catch(err =>
            console.log('error')
        )
}

getCharacters(API);

const personajes = (perso) => {
    main.innerHTML = ''
    perso.forEach(info => {
        const { image, status, name, species } = info;
        const divPersonajes = document.createElement('div')
        divPersonajes.classList.add('container')
        divPersonajes.innerHTML = `
        <div id="card">
            <img src="${image}" id="logo" class="img-per" alt="personaje">
            <div id="infoCard">
                <h4 id="nombre">${name}</h4>
                <h5 id="especie">${species}</h5>
            <ul>
                <li id="${lifeStatus(status)}">${status}</li>
            </div>
        </div>
        `
        main.appendChild(divPersonajes)
        lifeStatus(status)
    }); 
    
}

const lifeStatus = (status) =>{
    if (status === "Alive"){
        return "green"
    }else if(status === "Dead"){
        return "red"
    }else{
        return "grey"
    }
}

barra.addEventListener('submit', e =>{
    e.preventDefault()
    const buscarPer = buscar.value
    if(buscarPer && buscarPer !== ''){
        getCharacters(filtro + buscarPer)
        buscar.value = ""
    }else {
        window.location.reload()
    }
})