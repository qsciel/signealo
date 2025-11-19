document.addEventListener("DOMContentLoaded", () => {
  const keysList = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "LL",
    "M",
    "N",
    "Ñ",
    "O",
    "P",
    "Q",
    "R",
    "RR",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  // IMPORTANTE: Asegúrate de que estas imágenes existan en la carpeta 'assets/'
  // He cambiado la ruta de 'images/' a 'assets/' para que coincida con tu estructura.
  const imagePath = "assets/";

  const keyboard = document.getElementById("keyboard");
  const viewer = document.getElementById("viewer");
  const viewerPlaceholder = document.getElementById("viewer-placeholder");
  const loadedImages = {};

  async function checkImage(url) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }

  async function findValidImage(key) {
    const formats = ["png", "jpg", "jpeg", "webp"];
    for (const format of formats) {
      const url = `${imagePath}${key}.${format}`;
      if (await checkImage(url)) return url;
    }
    return null;
  }

  async function preloadAll() {
    for (const k of keysList) {
      const validUrl = await findValidImage(k);
      if (validUrl) loadedImages[k] = validUrl;
    }
  }

  function createFallbackSVG(text) {
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 200 200");

    const rect = document.createElementNS(ns, "rect");
    rect.setAttribute("width", "100%");
    rect.setAttribute("height", "100%");
    rect.setAttribute("fill", "#e0e0e0");
    svg.appendChild(rect);

    const txt = document.createElementNS(ns, "text");
    txt.setAttribute("x", "50%");
    txt.setAttribute("y", "55%");
    txt.setAttribute("text-anchor", "middle");
    txt.setAttribute("font-size", "90");
    txt.setAttribute("fill", "#616161");
    txt.setAttribute("font-weight", "800");
    txt.textContent = text;
    svg.appendChild(txt);
    return svg;
  }

  function showForKey(k) {
    document.querySelectorAll(".key").forEach((n) => {
      n.classList.toggle("selected", n.dataset.key === k);
    });

    viewer.innerHTML = "";
    if (viewerPlaceholder) viewerPlaceholder.style.display = "none";

    if (loadedImages[k]) {
      const img = document.createElement("img");
      img.src = loadedImages[k];
      img.alt = `Imagen para la letra ${k}`;
      viewer.appendChild(img);
    } else {
      const svg = createFallbackSVG(k);
      viewer.appendChild(svg);
    }
  }

  async function init() {
    keysList.forEach((k) => {
      const btn = document.createElement("button");
      btn.className = "key";
      btn.textContent = k;
      btn.dataset.key = k;
      btn.setAttribute("role", "button");
      btn.addEventListener("click", () => showForKey(k));
      keyboard.appendChild(btn);
    });

    await preloadAll();
  }

  init();
});
