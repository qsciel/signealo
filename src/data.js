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
      {
        word: "¿Cómo te llamas?",
        image: "assets/comotellamass.jpg",
        sign: "assets/comotellamas.jpg",
      },
      {
        word: "Mucho gusto",
        image: "assets/muchogustoo.jpg",
        sign: "assets/muchogusto.jpg",
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
      { word: "Salud", image: "assets/saludd.jpg", sign: "assets/salud.jpg" },
    ],
  },
  frases_utiles: {
    title: "Frases Útiles",
    icon: "bi-chat-left-dots-fill",
    items: [
      {
        word: "¿Me ayudas?",
        image: "assets/meayudasa.jpg",
        sign: "assets/meayudas.jpg",
      },
      {
        word: "¿Cuánto cuesta?",
        image: "assets/cuantocuestaa.jpg",
        sign: "assets/cuantocuesta.jpg",
      },
      {
        word: "¿Dónde está el baño?",
        image: "assets/dondeestaelbanoo.jpg",
        sign: "assets/dondeestaelbano.jpg",
      },
      {
        word: "No entiendo",
        image: "assets/noentiendoo.jpg",
        sign: "assets/noentiendo.jpg",
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
      { word: "Feo", image: "assets/feo.jpg", sign: "assets/bonito.jpg" },
      {
        word: "Contento",
        image: "assets/alegre.jpg",
        sign: "assets/alegretriste.jpg",
      },
      {
        word: "Triste",
        image: "assets/triste.jpg",
        sign: "assets/alegretriste.jpg",
      },
    ],
  },
  informacion_basica: {
    title: "Info Básica",
    icon: "bi-info-circle-fill",
    items: [
      { word: "Sí", image: "assets/sii.jpg", sign: "assets/sino.jpg" },
      { word: "No", image: "assets/noo.jpg", sign: "assets/sino.jpg" },
      { word: "¿Qué?", image: "assets/quee.jpg", sign: "assets/que.jpg" },
      { word: "¿Quién?", image: "assets/quienn.jpg", sign: "assets/quien.jpg" },
      { word: "¿Dónde?", image: "assets/dondee.jpg", sign: "assets/donde.jpg" },
      {
        word: "¿Por qué?",
        image: "assets/porquee.jpg",
        sign: "assets/porque.jpg",
      },
    ],
  },
};
