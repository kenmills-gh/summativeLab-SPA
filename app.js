// DOM Elements
const form = document.getElementById("search-form");
const input = document.getElementById("word-input");
const resultsContainer = document.getElementById("results-container");
const errorContainer = document.getElementById("error-container");
const themeToggle = document.getElementById("theme-toggle");

// Audio object
let currentAudio = null;

// 1. Theme Toggle Event Listener (Styling & UX)
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// 2. Form Submission Event Listener (Form and Event Handling)
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevents page reload
  const word = input.value.trim();

  if (word) {
    await fetchWordData(word);
  }
});

// 3. Fetch API Function (Fetch API Usage & Error Handling)
async function fetchWordData(word) {
  // Hide previous results/errors while loading
  resultsContainer.classList.add("hidden");
  errorContainer.classList.add("hidden");

  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
    );

    // Handle 404 Not Found or other API errors
    if (!response.ok) {
      throw new Error("Word not found");
    }

    const data = await response.json();
    displayResults(data[0]); // Pass the first result object
  } catch (error) {
    displayError(error.message);
  }
}

// 4. DOM Manipulation Function (Data Display & DOM Manipulation)
function displayResults(data) {
  // Set Title
  document.getElementById("word-title").textContent = data.word;
  document.getElementById("phonetic").textContent = data.phonetic || "";

  // Handle Audio
  const playBtn = document.getElementById("play-audio");
  const phoneticsWithAudio = data.phonetics.find((p) => p.audio !== "");

  if (phoneticsWithAudio) {
    playBtn.classList.remove("hidden");
    currentAudio = new Audio(phoneticsWithAudio.audio);
    playBtn.onclick = () => currentAudio.play();
  } else {
    playBtn.classList.add("hidden");
  }

  // Handle Meanings (Definitions, Parts of Speech, Synonyms)
  const meaningsContainer = document.getElementById("meanings-container");
  meaningsContainer.innerHTML = ""; // Clear previous meanings

  data.meanings.forEach((meaning) => {
    const div = document.createElement("div");
    div.classList.add("meaning");

    // Part of Speech
    const pos = document.createElement("h3");
    pos.textContent = meaning.partOfSpeech;
    pos.style.fontStyle = "italic";
    div.appendChild(pos);

    // First Definition
    const def = document.createElement("p");
    def.innerHTML = `<strong>Definition:</strong> ${meaning.definitions[0].definition}`;
    div.appendChild(def);

    // Synonyms
    if (meaning.synonyms.length > 0) {
      const syn = document.createElement("p");
      syn.innerHTML = `<strong>Synonyms:</strong> ${meaning.synonyms.slice(0, 3).join(", ")}`;
      div.appendChild(syn);
    }

    meaningsContainer.appendChild(div);
  });

  resultsContainer.classList.remove("hidden");
}

// 5. Error UI Function
function displayError(message) {
  document.getElementById("error-title").textContent = "Oops!";
  document.getElementById("error-message").textContent =
    message === "Word not found"
      ? "We couldn't find that word. Please check your spelling and try again."
      : "Something went wrong with the connection.";

  errorContainer.classList.remove("hidden");
}
