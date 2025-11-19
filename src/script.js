/**
 * SCRIPT.JS
 * Lógica principal de la aplicación Signealo.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. MANEJO DE PANTALLA DE CARGA (SPLASH SCREEN)
  const splash = document.getElementById("splash-screen");
  if (splash) {
    setTimeout(() => {
      splash.classList.add("hidden");
    }, 2000); // 2 segundos de espera
  }

  // 2. DETERMINAR RUTA RELATIVA (CRÍTICO)
  // Si estamos en /componentes/x/, necesitamos subir dos niveles (../../)
  // Si estamos en la raíz, no necesitamos prefijo.
  const isComponent = window.location.pathname.includes("/componentes/");
  const pathPrefix = isComponent ? "../../" : "";

  // 3. LÓGICA DEL BUSCADOR (Solo si existe el input)
  const searchInput = document.getElementById("search-input");
  const resultsBox = document.getElementById("search-results");

  if (searchInput && resultsBox) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();
      resultsBox.innerHTML = "";

      if (query.length < 2) {
        resultsBox.classList.remove("active");
        return;
      }

      let matches = [];
      // Buscar en todas las categorías del data.js
      for (const catKey in dictionary) {
        dictionary[catKey].items.forEach((item) => {
          if (item.word.toLowerCase().includes(query)) {
            matches.push({ ...item, catKey: catKey });
          }
        });
      }

      if (matches.length > 0) {
        resultsBox.classList.add("active");
        matches.slice(0, 5).forEach((match) => {
          // Crear enlace al diccionario con parámetro
          const link = document.createElement("a");
          link.className = "search-item";
          link.href = `${pathPrefix}componentes/diccionario/diccionario.html?categoria=${match.catKey}`;
          link.innerHTML = `
                        <div>
                            <strong>${match.word}</strong>
                            <br><small style="color:var(--primary-color)">${dictionary[match.catKey].title}</small>
                        </div>
                        <i class="bi bi-chevron-right"></i>
                    `;
          resultsBox.appendChild(link);
        });
      } else {
        resultsBox.classList.remove("active");
      }
    });
  }

  // 4. PALABRA DEL DÍA (Solo en Index)
  const wordDayContainer = document.querySelector(".word-of-the-day");
  if (wordDayContainer) {
    const allItems = [];
    for (const k in dictionary) {
      dictionary[k].items.forEach((item) => allItems.push(item));
    }

    if (allItems.length > 0) {
      // Elegir aleatorio
      const randomItem = allItems[Math.floor(Math.random() * allItems.length)];

      // Insertar datos
      document.getElementById("wotd-title").textContent = randomItem.word;

      // Imagen con ruta corregida
      const imgContainer = document.getElementById("wotd-image");
      const finalSrc = pathPrefix + randomItem.sign;

      imgContainer.innerHTML = `<img src="${finalSrc}" style="width:100%; height:100%; object-fit:cover; border-radius:15px;" onerror="this.style.display='none'">`;
    }
  }

  // 5. GENERAR CATEGORÍAS POPULARES (Solo en Index)
  const popContainer = document.getElementById("popular-categories");
  if (popContainer) {
    const keys = ["saludos", "cortesias"];
    keys.forEach((key) => {
      const cat = dictionary[key];
      if (cat) {
        popContainer.innerHTML += `
                    <a href="componentes/diccionario/diccionario.html?categoria=${key}" class="card">
                        <div class="card-icon"><i class="bi ${cat.icon}"></i></div>
                        <h3>${cat.title}</h3>
                    </a>
                `;
      }
    });
  }
});
