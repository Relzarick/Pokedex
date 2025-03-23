const blueBtnContainer = document.querySelector(".blue-btn-container");
for (let i = 1; i <= 10; i++) {
  const btn = document.createElement("div");
  btn.classList.add("blue-btn");
  blueBtnContainer.appendChild(btn);
}

const form = document.querySelector(".search-container");

const name = document.getElementById("pokemon-name");
const id = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const type = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const sAttack = document.getElementById("special-attack");
const sDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const pokemonList = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const getData = async () => {
  try {
    const res = await fetch(pokemonList);
    const data = await res.json();
    // console.log(data);
    pokeData(data);
  } catch (err) {
    console.log(err);
  }
};

getData();

const pokeData = (data) => {
  const { results } = data;
  const { id, name, url } = results;
  // console.log(results[0]);
};
// t now need js to check user input to match either name or id to fetch the correct url for the stats

const uniformName = (input) => {
  const newInput = input.toLowerCase();
  console.log(newInput);
  // t use regex to remove sepcial chara
  // t seperate spaces with dash
  // t ♀ ♂ append -f or -m
};
uniformName("NLKs sdf");

form.addEventListener("submit", () => {
  const userInput = document.querySelector("#search-input");
});
