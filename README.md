# Wordly - Interactive Dictionary (SPA)

## Overview

Wordly is a fast, dynamic, and user-friendly Single Page Application (SPA) built for language learners. It provides an interactive dictionary interface that allows users to search for words, view their definitions, check synonyms, and listen to their pronunciations—all without ever reloading the page.

This project was built to demonstrate modern web development practices including asynchronous JavaScript, DOM manipulation, and responsive UI design, fulfilling the requirements for the Summative Lab: Single Page Application (SPA).

## Features

- **Real-Time Word Search:** Fetch detailed definitions, parts of speech, and example usages instantly using the Free Dictionary API.
- **Audio Pronunciations:** Listen to the correct pronunciation of words directly from the results interface (when available from the API).
- **Dynamic DOM Updates:** All search results, UI states, and error messages update seamlessly on the same page.
- **Dark Mode Toggle:** Includes a dynamic theme switcher that updates CSS variables via JavaScript for an accessible and customizable user experience.
- **Robust Error Handling:** Gracefully handles invalid inputs, misspelled words, and API connection errors with user-friendly fallback messages.

## Technologies Used

- **HTML5:** Semantic structuring and accessible form inputs (`aria-labels`).
- **CSS3:** Custom properties (variables) for theming, responsive layout, and modern styling.
- **Vanilla JavaScript (ES6+):** Async/await for fetching API data, event listeners, and dynamic DOM manipulation without frameworks.
- **Free Dictionary API:** An external, open-source REST API (`https://api.dictionaryapi.dev/api/v2/entries/en/<word>`) providing dictionary data in JSON format.

## Setup and Installation

Since this is a vanilla HTML/CSS/JS project, no build tools or package managers are required to run it locally.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kenmills-gh/summativeLab-SPA.git
   ```

## How it Works

1. User Input: The user types a word into the form and submits it.

2. Event Interception: JavaScript prevents the default form submission (which would refresh the page) and instead triggers an asynchronous function.

3. API Fetch: The application sends a fetch request to the Free Dictionary API.

4. Data Parsing: Upon a successful response, the JSON data is parsed to extract the word, phonetics (audio), and meanings (parts of speech, definitions, synonyms).

5. DOM Injection: JavaScript dynamically creates HTML elements for the retrieved data and injects them into the #results-container.

6. Error State: If the API returns a 404 (word not found) or the fetch fails, the #error-container is unhidden with a contextual error message.

## Future Enhancements

1. Save Favorite Words: Integrate localStorage to allow users to save a list of vocabulary words for future reference.

2. Search History: Maintain a visual queue of the user's recently searched terms.

3. Enhanced Synonym Linking: Make synonyms clickable so users can immediately look up related words.
