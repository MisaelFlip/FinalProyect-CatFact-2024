document.addEventListener('DOMContentLoaded', () => {
    const catFactsSection = document.getElementById('cat-facts');
    const loadMoreButton = document.getElementById('load-more');
  
    // Función para obtener una curiosidad de la API
    async function fetchCatFact() {
      try {
        const response = await fetch('https://catfact.ninja/fact');
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();
        const translatedFact = await translateText(data.fact); // Traducir el texto
        renderCatFact(translatedFact); // Mostrar el texto traducido
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    }
  
    // Función para traducir texto usando Mymemory Traslate
    async function translateText(text) {
        try {
          const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|es`);
          if (!response.ok) {
            throw new Error(`Error de traducción: ${response.status}`);
          }
          const data = await response.json();
          return data.responseData.translatedText; // Texto traducido
        } catch (error) {
          console.error('Error al traducir el texto:', error);
          return text; // Retorna el texto original si hay un error
        }
      }
  
    // Función para renderizar una curiosidad
    function renderCatFact(fact) {
      const catCard = document.createElement('div');
      catCard.classList.add('cat-card');
      catCard.innerHTML = `
        <h3>Curiosidad:</h3>
        <p>${fact}</p>
      `;
      catFactsSection.appendChild(catCard);
    }
  
    // Evento del botón para cargar más curiosidades
    loadMoreButton.addEventListener('click', fetchCatFact);
  
    // Cargar la primera curiosidad al cargar la página
    fetchCatFact();
  });
  