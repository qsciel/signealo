document.addEventListener("DOMContentLoaded", async () => {
  const keysList = [
    "Rojo",
    "Azul",
    "Amarillo",
    "Verde",
    "Naranja",
    "Morado",
    "Blanco",
    "Negro",
    "Gris",
    "Marrón",
    "Claro",
    "Obscuro",
  ];
  const colorStyles = {
    Rojo: "#ef4444",
    Azul: "#3b82f6",
    Amarillo: "#facc15",
    Verde: "#22c55e",
    Naranja: "#f97316",
    Morado: "#a855f7",
    Blanco: "#f8fafc",
    Negro: "#1f2937",
    Gris: "#9ca3af",
    Marrón: "#7c2d12",
    Claro: "#e5e7eb",
    Obscuro: "#111827",
  };
  const textColors = {
    Amarillo: "black",
    Blanco: "black",
    Gris: "black",
    Claro: "black",
  };
  const imagePath = "assets/"; // Las imágenes deben estar aquí

  const keyboard = document.getElementById("keyboard");
  const viewer = document.getElementById("viewer");
  const exploreBtn = document.getElementById("exploreBtn");
  const quizBtn = document.getElementById("quizBtn");
  const quizSection = document.getElementById("quizSection");
  const quizOptions = document.getElementById("quizOptions");
  const quizMeta = document.getElementById("quizMeta");
  const body = document.querySelector(".colors-body");
  const imageMap = {};
  let quizData = [],
    currentIndex = 0,
    score = 0;

  const normalize = (str) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  async function imageExists(url) {
    return new Promise((r) => {
      const i = new Image();
      i.onload = () => r(true);
      i.onerror = () => r(false);
      i.src = url;
    });
  }

  for (const k of keysList) {
    const base = normalize(k);
    const formats = ["png", "jpg", "jpeg", "webp"];
    for (const ext of formats) {
      const url = `${imagePath}${base}.${ext}`;
      if (await imageExists(url)) {
        imageMap[k] = url;
        break;
      }
    }
  }

  keysList.forEach((k) => {
    const btn = document.createElement("button");
    btn.className = "key-color";
    btn.textContent = k;
    btn.style.backgroundColor = colorStyles[k];
    btn.style.color = textColors[k] || "white";
    btn.onclick = () => showImage(k);
    keyboard.appendChild(btn);
  });

  function showImage(k) {
    document
      .querySelectorAll(".key-color")
      .forEach((b) => b.classList.remove("selected"));
    [...document.querySelectorAll(".key-color")]
      .find((b) => b.textContent === k)
      ?.classList.add("selected");
    viewer.innerHTML = "";
    body.style.background = `linear-gradient(135deg, ${colorStyles[k]}44, ${colorStyles[k]}11)`;
    if (imageMap[k]) {
      const img = document.createElement("img");
      img.src = imageMap[k];
      img.alt = `Color ${k}`;
      viewer.appendChild(img);
    } else {
      viewer.innerHTML = `<div style="font-size: 2em; color: ${colorStyles[k]}">${k}</div>`;
    }
  }

  function startQuiz() {
    exploreBtn.classList.remove("active");
    quizBtn.classList.add("active");
    keyboard.classList.add("hidden");
    quizSection.classList.remove("hidden");
    score = 0;
    currentIndex = 0;
    quizData = shuffle(keysList).slice(0, 5);
    loadQuestion();
  }

  function switchToExplore() {
    quizBtn.classList.remove("active");
    exploreBtn.classList.add("active");
    quizSection.classList.add("hidden");
    keyboard.classList.remove("hidden");
    viewer.innerHTML = "<strong>Selecciona un color</strong>";
    body.style.background = "var(--background-color)";
  }

  function loadQuestion() {
    if (currentIndex >= quizData.length) {
      viewer.innerHTML = `<strong>¡Fin del quiz!</strong><br>Puntaje: ${score}/${quizData.length}`;
      quizOptions.innerHTML = "";
      quizMeta.textContent = "";
      return;
    }
    const color = quizData[currentIndex];
    showImage(color);
    quizMeta.textContent = `Pregunta ${currentIndex + 1} / ${quizData.length}`;
    const options = shuffle([
      color,
      ...shuffle(keysList.filter((k) => k !== color)).slice(0, 3),
    ]);
    quizOptions.innerHTML = "";
    options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.className = "quiz-btn-color";
      btn.textContent = opt;
      btn.onclick = () => handleAnswer(opt, color, btn);
      quizOptions.appendChild(btn);
    });
  }

  function handleAnswer(opt, correct, btn) {
    document
      .querySelectorAll(".quiz-btn-color")
      .forEach((b) => (b.disabled = true));
    if (opt === correct) {
      btn.classList.add("correct");
      score++;
    } else {
      btn.classList.add("incorrect");
      [...document.querySelectorAll(".quiz-btn-color")]
        .find((b) => b.textContent === correct)
        ?.classList.add("correct");
    }
    setTimeout(() => {
      currentIndex++;
      loadQuestion();
    }, 1200);
  }

  function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }

  quizBtn.addEventListener("click", startQuiz);
  exploreBtn.addEventListener("click", switchToExplore);
});
