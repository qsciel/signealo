/**
 * DATA.JS
 * Base de datos centralizada para toda la aplicación.
 * Contiene todas las palabras, rutas de imágenes y categorías.
 */

const dictionary = {
  pronombres: {
    title: "Pronombres",
    icon: "bi-people-fill",
    items: [
      { word: "Yo", image: "assets/aad77jj3.png", sign: "assets/YO.jpg" },
      { word: "Tú", image: "assets/tu.png", sign: "assets/TUU.jpg" },
      {
        word: "Él/Ella",
        image: "assets/Elella.webp",
        sign: "assets/elella.jpg",
      },
      {
        word: "Nosotros",
        image: "assets/nosotros.webp",
        sign: "assets/nosotros.jpg",
      },
      { word: "Mío", image: "assets/MIOO.jpg", sign: "assets/mio.jpg" },
      { word: "Tuyo", image: "assets/TUYOO.jpg", sign: "assets/tuyo.jpg" },
    ],
  },
  saludos: {
    title: "Saludos",
    icon: "bi-emoji-smile-fill",
    items: [
      { word: "Hola", image: "assets/HOLAA.jpg", sign: "assets/hola.jpg" },
      { word: "Adiós", image: "assets/adioss.jpg", sign: "assets/adios.png" },
      {
        word: "Buenos días",
        image: "assets/buenosdiass.jpg",
        sign: "assets/buenosdias.jpg",
      },
      {
        word: "Buenas tardes",
        image: "assets/buenastardes.jpg",
        sign: "assets/buenastardes.jpg",
      },
      {
        word: "Buenas noches",
        image: "assets/buenasnochess.jpg",
        sign: "assets/buenasnoches.jpg",
      },
    ],
  },
  cortesias: {
    title: "Cortesía",
    icon: "bi-heart-fill",
    items: [
      {
        word: "Gracias",
        image: "assets/graciass.jpg",
        sign: "assets/gracias.jpg",
      },
      {
        word: "Por favor",
        image: "assets/porfavorr.jpg",
        sign: "assets/porfavor.jpg",
      },
      {
        word: "De nada",
        image: "assets/denadaa.jpg",
        sign: "assets/denada.jpg",
      },
      {
        word: "Perdón",
        image: "assets/losientoo.jpg",
        sign: "assets/perdon.jpg",
      },
    ],
  },
  adjetivos: {
    title: "Adjetivos",
    icon: "bi-star-fill",
    items: [
      { word: "Bien", image: "assets/bien.jpg", sign: "assets/bienmal.jpg" },
      { word: "Mal", image: "assets/mal.jpg", sign: "assets/bienmal.jpg" },
      {
        word: "Bonito",
        image: "assets/bonitoo.jpg",
        sign: "assets/bonito.jpg",
      },
      {
        word: "Triste",
        image: "assets/triste.jpg",
        sign: "assets/alegretriste.jpg",
      },
    ],
  },
};
