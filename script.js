//t for the stats all these, use js to print

// t https://pokeapi-proxy.freecodecamp.rocks/api/pokemon
// t https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/{name-or-id}

const blueBtnContainer = document.querySelector(".blue-btn-container");

for (let i = 1; i <= 10; i++) {
  const btn = document.createElement("div");
  btn.classList.add("blue-btn");
  blueBtnContainer.appendChild(btn);
}
