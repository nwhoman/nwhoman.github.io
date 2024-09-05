const userInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weightElement = document.getElementById("weight");
const heightElement = document.getElementById("height");
const sprite = document.getElementById("sprite");
const pokemanListUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
const pokemanById = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";
const imgUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
const baseStatsElements = document.querySelectorAll(".base-stats");
const infoSection = document.getElementById("info");
const typeSection = document.getElementById("types");

let typesArray = [];
let pokemanArray = [];



const showPokemanData = (data) => {
    
    const {experience, height, id, name, order, sprites, stats, types, weight} = data;

    /*infoSection.innerHTML = `<div id="pokemon-name" class="infoElement">${name.toUpperCase()}</div>
    <div id="pokemon-id" class="infoElement">#${id}</div>
    <div id="weight" class="infoElement">Weight: ${weight}</div>
    <div id="height" class="infoElement">Height: ${height}</div>
    <img id="sprite" class="char-img" src="${imgUrl}${id}.png" alt="${name} avatar">
    `;*/
    pokemonName.innerText = `${name.toUpperCase()}`;
    pokemonId.innerText = `#${id}`;
    weightElement.innerText = `Weight: ${weight}`;
    heightElement.innerText = `Height: ${height}`;
    sprite.src = `${imgUrl}${id}.png`;
    sprite.alt = `${name} avatar`;
    typeSection.innerHTML = ""; 
    types.forEach((item)=>{
      typeSection.innerHTML += `<button id="${item.type.name}" class="type-button">${item.type.name.toUpperCase()}</button>`
    })
    for (i=0; i<stats.length; i++){
        baseStatsElements[i].innerText = stats[i]["base_stat"];
    }
    };

function getPokeman(){
    fetch(pokemanById + `${userInput.value.toLowerCase()}`)
  .then((res) => res.json())
  .then((data) => {
    showPokemanData(data);
    
   
  })
  .catch((err) => {
    if (err) {
      console.log(err);
      alert("Pokémon not found");
    }
   
  });
}
function clearData(){
  for (i=0; i<baseStatsElements.length; i++){
    baseStatsElements[i].innerText = "";
  }
  typeSection.innerHTML = "";
  }
clearData();
searchBtn.addEventListener("click",getPokeman)