import { Color, Breed, Dog } from "./types"; 

const form = document.getElementById("dog-form") as HTMLFormElement;
const nameInput = document.getElementById("dog-name") as HTMLInputElement;
const ageInput = document.getElementById("dog-age") as HTMLInputElement;
const colorSelect = document.getElementById("dog-color") as HTMLSelectElement;
const breedSelect = document.getElementById("dog-breed") as HTMLSelectElement;
const dogList = document.getElementById("dog-list") as HTMLUListElement;
const statsDiv = document.getElementById("dog-stats") as HTMLDivElement;


let dogs: Dog[] = [];
let breeds: Breed[] = ["Husky", "Mops", "Golden", "Beagle", "Berner sennen"];

function populateBreeds() {
  breeds.forEach((breed: string) => {
    const option = document.createElement("option");
    option.value = breed; 
    option.textContent = breed; 
    breedSelect.appendChild(option); 
  });
}
populateBreeds();

function updateDogList() {
  dogList.innerHTML = "";
  dogs.forEach((dog, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${dog.name}, ${dog.age} år, ${dog.color}, ${dog.breed}`;
    listItem.dataset.index = index.toString();

    const removeButton = document.createElement("button");
    removeButton.textContent = "Ta bort";
    removeButton.addEventListener("click", () => removeDog(index));

    listItem.appendChild(removeButton);
    dogList.appendChild(listItem);
  });
}

function updateStats() {
  const colorCounts: Record<string, number> = {};
  const breedCounts: Record<string, number> = {};
  let totalAge = 0;

  dogs.forEach((dog) => {
    colorCounts[dog.color] = (colorCounts[dog.color] || 0) + 1;
    breedCounts[dog.breed] = (breedCounts[dog.breed] || 0) + 1;
    totalAge += dog.age;
  });

  const averageAge = dogs.length > 0 ? Math.round(totalAge / dogs.length) : 0;
  statsDiv.innerHTML = `
    <p>Antal hundar: ${dogs.length}</p>
    <p>Medelålder: ${averageAge}</p>
    <h3>Färger:</h3>
    <ul>${Object.entries(colorCounts)
      .map(([color, count]) => `<li>${color}: ${count}</li>`)
      .join("")}</ul>
    <h3>Raser:</h3>
    <ul>${Object.entries(breedCounts)
      .map(([breed, count]) => `<li>${breed}: ${count}</li>`)
      .join("")}</ul>
  `;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const newDog: Dog = {
    name: nameInput.value,
    age: parseInt(ageInput.value),
    color: colorSelect.value as Color,
    breed: breedSelect.value as Breed,
  };

  dogs.push(newDog);
  updateDogList();
  updateStats();

  form.reset();
});

function removeDog(index: number) {
  dogs.splice(index, 1);
  updateDogList();
  updateStats();
}
