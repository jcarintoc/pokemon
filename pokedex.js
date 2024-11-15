
// Navigation
const nav = document.querySelector('.pokemon-nav-ul');
const menuBtn = document.querySelector('.pokemon-menu')

menuBtn.addEventListener('click', () => {
  const visible = menuBtn.getAttribute('data-hidden')
  if (visible === 'false') {
    nav.setAttribute('data-visible', true);
    menuBtn.setAttribute('data-hidden', true);
  } else {
    nav.setAttribute('data-visible', false);
    menuBtn.setAttribute('data-hidden', false);
  }
})



// Fetch Pokemon API
const cards = document.querySelector('.pokemon-cards-container');

const pokemonAPI = async () => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=24');
    const pokemonData = await response.json()
    const results = pokemonData.results
    displayPokemon(results)
    console.log(pokemonData);
  } catch (error) {
    console.log(error);
  }
}

function displayPokemon(pokemonData) {
  cards.innerHTML = pokemonData.map((data, index) => {
    return `<div class="pokemon-cards">
      <div class="card-info">
        <div class="card-front">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png" alt="">
          <p>${data.name.toUpperCase()}</p>
        </div>

        <div class="card-back">
          <p>${data.name.toUpperCase()} Stats</p>
          <button class="pokemon-back-btn">Back</button>
        </div>

        <button class="pokemon-view-btn">View Pokemon</button>
      </div>
    </div>`
  }).join('')

  const viewBtn = document.querySelectorAll('.pokemon-view-btn');
  const backBtn = document.querySelectorAll('.pokemon-back-btn');
  const pokeStats = document.querySelectorAll('.card-info');
  const pokemonInfo = document.querySelectorAll('.card-back')

  for (let i = 0; i < pokeStats.length; i++) {
    viewBtn[i].addEventListener('click', () => {
      pokeStats[i].style.transform = 'rotateY(180deg)';
    })

    backBtn[i].addEventListener('click', () => {
      pokeStats[i].style.transform = 'rotateY(0)';
    })
  }
}

pokemonAPI()

