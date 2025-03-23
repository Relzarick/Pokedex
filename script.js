const blueBtnContainer = document.querySelector(".blue-btn-container");
for (let i = 1; i <= 10; i++) {
  const btn = document.createElement("div");
  btn.classList.add("blue-btn");
  blueBtnContainer.appendChild(btn);
}

const form = document.querySelector(".search-container");
const userInput = document.getElementById("search-input");

const pokeInfo = document.querySelector(".pokemon-display");
const pokeStats = document.querySelector(".stats-display");

const pokemonList = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const uniformName = (input) => {
  let newInput = input.toLowerCase().split(" ").join("-");
  const regex = /[!@#$%^&*(),.?"':;{}|<>]/g;
  const genderRe = /[♀♂]/;

  if (regex.test(newInput)) {
    alert("Pokémon not found");
    userInput.value = "";
  } else if (genderRe.test(newInput)) {
    return newInput.replace(genderRe, (i) => (i === "♀" ? "-f" : "-m"));
  } else {
    console.log(newInput);
    return newInput;
  }
};

const fetchData = async (input) => {
  try {
    const res = await fetch(pokemonList);
    const data = await res.json();
    pokeData(data, input);
  } catch (err) {
    console.log(err);
  }
};

// fetchData("mamoswine");
// fetchData("pikachu");

const pokeData = (data, input) => {
  const { results } = data;
  const matched = results.find(
    (pokemon) => input === pokemon.name || parseInt(input) === pokemon.id
  );

  // console.log(matched);
  if (matched) {
    const url = matched.url;
    renderValues(url);
  } else {
    alert("Pokémon not found");
    userInput.value = "";
  }
};

form.addEventListener("submit", () => {
  event.preventDefault();
  const validName = uniformName(userInput.value);

  if (validName) {
    fetchData(validName);
  }
});

const renderValues = async (url) => {
  const rawData = await fetch(url);
  const data = await rawData.json();
  // console.log(data.stats);

  const { name, id, weight, height, sprites } = data;
  const type = data.types.map((type) => type.type.name);

  // console.log(type);
  pokeInfo.innerHTML = `
    <div class="pokemon-info">
              <p id="pokemon-name" class="pokemon-info-p">${name.toUpperCase()}</p>
              <p id="pokemon-id" class="pokemon-info-p">#${id}</p>
            </div>

            <div class="pokemon-info">
              <p id="weight" class="pokemon-info-p">Weight: ${weight}</p>
              <p id="height" class="pokemon-info-p">Height: ${height}</p>
            </div>

            <img id="sprite" src='${sprites.front_default}'></img>
            <div id="types">${type
              .map((type) => `<span id='${type}'>${type.toUpperCase()}</span>`)
              .join("")}</div>
  `;

  const statOrder = [
    "hp",
    "attack",
    "defense",
    "speed",
    "special-attack",
    "special-defense",
  ];

  const displayName = {
    hp: "HP:",
    attack: "Attack:",
    defense: "Defense:",
    speed: "Speed:",
    "special-attack": "Sp. Attack:",
    "special-defense": "Sp. Defense:",
  };

  //* Add two because display 2 stats per loop
  for (let i = 0; i < 6; i += 2) {
    const statsName1 = statOrder[i];
    const statsName2 = statOrder[i + 1];

    const stats1 = data.stats.find(({ stat }) => stat.name === statsName1);
    const stats2 = data.stats.find(({ stat }) => stat.name === statsName2);

    const statValue1 = stats1.base_stat;
    const statValue2 = stats2.base_stat;

    pokeStats.innerHTML += `
          <tr>
            <td id="${statsName1}">${displayName[statsName1]} ${statValue1}</td>
            <td id="${statsName2}">${displayName[statsName2]} ${statValue2}</td>
          </tr>
    `;
  }
};
