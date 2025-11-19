document.addEventListener("DOMContentLoaded", () => {
  const keysList = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "30",
    "40",
    "50",
    "60",
    "70",
    "80",
    "90",
    "100",
  ];
  const NUM_OPTIONS = 4;
  const imagePath = "assets/"; // Asegúrate que las imágenes estén aquí

  let currentMode = "explore";
  let score = 0;
  let totalQuestions = 0;
  let availableQuizKeys = [];
  let currentCorrectKey = null;
  let quizInProgress = false;
  const loadedImages = {};

  const mainCard = document.querySelector(".card-numeric");
  const keyboard = document.getElementById("keyboard");
  const viewer = document.getElementById("viewer");
  const viewerPlaceholder = document.getElementById("viewer-placeholder");
  const exploreBtn = document.getElementById("mode-btn-explore");
  const quizBtn = document.getElementById("mode-btn-quiz");
  const quizOptionsContainer = document.getElementById("quiz-options");
  const scoreDisplay = document.getElementById("quiz-score");

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
    txt.setAttribute("font-size", text.length > 2 ? "60" : "80");
    txt.setAttribute("fill", "#616161");
    txt.setAttribute("font-weight", "800");
    txt.textContent = text;
    svg.appendChild(txt);
    return svg;
  }

  function showForKey(k) {
    document.querySelectorAll(".key-numeric").forEach((n) => {
      n.classList.toggle("selected", n.dataset.key === k);
    });
    viewer.innerHTML = "";
    if (viewerPlaceholder) viewerPlaceholder.style.display = "none";
    const element = loadedImages[k]
      ? Object.assign(new Image(), {
          src: loadedImages[k],
          alt: `Imagen para ${k}`,
        })
      : createFallbackSVG(k);
    viewer.appendChild(element);
  }

  function enterExploreMode() {
    mainCard.className = "card-numeric mode-explore";
    exploreBtn.classList.add("active");
    quizBtn.classList.remove("active");
    viewer.innerHTML = "";
    viewerPlaceholder.style.display = "block";
  }

  function enterQuizMode() {
    if (availableQuizKeys.length < NUM_OPTIONS) return;
    mainCard.className = "card-numeric mode-quiz";
    quizBtn.classList.add("active");
    exploreBtn.classList.remove("active");
    score = 0;
    totalQuestions = 0;
    updateScore();
    startNewQuestion();
  }

  function updateScore() {
    scoreDisplay.innerHTML = `Puntaje: ${score} <span>/ ${totalQuestions}</span>`;
  }

  function startNewQuestion() {
    quizInProgress = false;
    quizOptionsContainer.innerHTML = "";
    currentCorrectKey = getRandomElement(availableQuizKeys);
    viewer.innerHTML = "";
    const img = new Image();
    img.src = loadedImages[currentCorrectKey];
    img.alt = "Imagen del quiz";
    viewer.appendChild(img);
    const options = [currentCorrectKey];
    const distractors = availableQuizKeys.filter(
      (k) => k !== currentCorrectKey,
    );
    shuffleArray(distractors);
    for (let i = 0; i < NUM_OPTIONS - 1; i++) options.push(distractors[i]);
    shuffleArray(options).forEach((key) => {
      const btn = document.createElement("button");
      btn.className = "quiz-option";
      btn.innerText = key;
      btn.dataset.key = key;
      btn.onclick = handleAnswerClick;
      quizOptionsContainer.appendChild(btn);
    });
  }

  function handleAnswerClick(e) {
    if (quizInProgress) return;
    quizInProgress = true;
    const selectedKey = e.target.dataset.key;
    totalQuestions++;
    document.querySelectorAll(".quiz-option").forEach((btn) => {
      btn.disabled = true;
      if (btn.dataset.key === currentCorrectKey) btn.classList.add("correct");
    });
    if (selectedKey === currentCorrectKey) {
      score++;
    } else {
      e.target.classList.add("incorrect");
    }
    updateScore();
    setTimeout(startNewQuestion, 1500);
  }

  function shuffleArray(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }
  function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  async function initialize() {
    keysList.forEach((k) => {
      const btn = document.createElement("button");
      btn.className = "key-numeric";
      btn.dataset.key = k;
      btn.innerText = k;
      btn.onclick = () => showForKey(k);
      keyboard.appendChild(btn);
    });
    await preloadAll();
    availableQuizKeys = Object.keys(loadedImages);
    if (availableQuizKeys.length >= NUM_OPTIONS) {
      quizBtn.disabled = false;
      quizBtn.innerText = "Quiz";
    } else {
      quizBtn.innerText = `Quiz (imágenes insuficientes)`;
    }
    exploreBtn.addEventListener("click", enterExploreMode);
    quizBtn.addEventListener("click", enterQuizMode);
  }
  initialize();
});
