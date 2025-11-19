document.addEventListener("DOMContentLoaded", function () {
  // --- 0. LÓGICA DEL SPLASH SCREEN (MOVIDA AQUÍ) ---
  const splashScreen = document.getElementById("splash-screen");
  // Solo se ejecuta si el elemento existe en la página actual (index.html)
  if (splashScreen) {
    setTimeout(() => {
      splashScreen.classList.add("hidden");
    }, 2800); // Mantenemos la duración original
  }

  // --- El resto del código para la página de inicio ---
  const searchInput = document.getElementById("search-input");
  const searchResultsContainer = document.getElementById("search-results");
  const popularCategoriesContainer =
    document.getElementById("popular-categories");

  // Verifica que los elementos existan antes de añadirles listeners
  // Esto evita errores si el script se carga en otras páginas por accidente
  if (searchInput) {
    // --- 1. Lógica del Buscador ---
    searchInput.addEventListener("input", function (e) {
      const query = e.target.value.toLowerCase().trim();
      searchResultsContainer.innerHTML = "";

      if (query.length < 2) {
        searchResultsContainer.classList.add("hidden");
        return;
      }

      const results = [];
      for (const categoryKey in dictionary) {
        dictionary[categoryKey].items.forEach((item) => {
          if (item.word.toLowerCase().includes(query)) {
            results.push({ ...item, categoryKey: categoryKey });
          }
        });
      }

      if (results.length > 0) {
        searchResultsContainer.classList.remove("hidden");
        results.forEach((item) => {
          const resultItem = document.createElement("a");
          resultItem.href = `diccionario.html?categoria=${item.categoryKey}`;
          resultItem.className = "search-result-item";
          resultItem.innerHTML = `
                        <div class="result-text">
                            <strong>${item.word}</strong>
                            <span>${dictionary[item.categoryKey].title}</span>
                        </div>
                        <svg viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/></svg>
                    `;
          searchResultsContainer.appendChild(resultItem);
        });
      } else {
        searchResultsContainer.classList.add("hidden");
      }
    });
  }

  // --- 2. Palabra del Día Dinámica ---
  function updateWordOfTheDay() {
    const wordContainer = document.querySelector(".word-of-the-day");
    if (!wordContainer) return;

    const allWords = [];
    let allCategories = {};
    for (const categoryKey in dictionary) {
      dictionary[categoryKey].items.forEach((item) => {
        allWords.push(item);
        allCategories[item.word] = dictionary[categoryKey].title;
      });
    }

    if (allWords.length === 0) return;

    const randomWord = allWords[Math.floor(Math.random() * allWords.length)];
    const categoryTitle = allCategories[randomWord.word];

    wordContainer.querySelector("h3").textContent = randomWord.word;
    wordContainer.querySelector("p").textContent =
      `Aprende esta seña útil de la categoría de ${categoryTitle}.`;

    const imageContainer = wordContainer.querySelector(
      ".word-of-the-day-image",
    );
    imageContainer.innerHTML = `<img src="${randomWord.sign}" alt="Seña de ${randomWord.word}">`;
  }

  // --- 3. Cargar Categorías Populares ---
  function loadPopularCategories() {
    if (!popularCategoriesContainer) return;

    const popularKeys = ["saludos", "cortesias", "pronombres", "adjetivos"];
    popularCategoriesContainer.innerHTML = ""; // Limpiar antes de añadir
    popularKeys.forEach((key) => {
      const category = dictionary[key];
      if (category) {
        const card = document.createElement("a");
        card.className = "card";
        card.href = `diccionario.html?categoria=${key}`;
        card.innerHTML = `
                    <div class="card-icon">
                        <i class="bi ${category.icon}"></i>
                    </div>
                    <h3>${category.title}</h3>
                `;
        popularCategoriesContainer.appendChild(card);
      }
    });
  }

  // --- Inicialización de funciones para la página de inicio ---
  // Solo se ejecutan si estamos en index.html (verificando la existencia de un elemento clave)
  if (document.getElementById("popular-categories")) {
    updateWordOfTheDay();
    loadPopularCategories();
  }
});
