document.addEventListener("DOMContentLoaded", () => {
  console.log("Mapbox JS file imported successfully!");

  // Select the elements that store the info about the display of the map Paso 10
  const mapCenter = document.querySelector(".map-center").innerHTML.split(",")
  const mapZoom = document.querySelector(".map-zoom").innerHTML

  // Select the elements that store the info about the locatinos and markers
  const popupDivs = document.querySelectorAll(".popup") /*Paso 6.2*/ 
  const posDivs = document.querySelectorAll(".pos")
  const markerDivs = document.querySelectorAll(".marker") /*Hacer esto tambien*/ 

  // Create an array to store all the popups (one for each location)
  

  mapboxgl.accessToken = "pk.eyJ1IjoiZ2l1bGlhbm8zMjEiLCJhIjoiY2xhOXFkM2VuMDBmczN4cW1qYXVwOWR3NyJ9.TuMhw4ZcNTbOZ8ZgivexBw"

  const map = new mapboxgl.Map({
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio Elegir el mapa en style
    style: "mapbox://styles/giuliano321/cla9tgnd4000714qo34s9s4mt",
    center: [2.163887, 41.392620],// donde empieza el mapa, el puso coordenadas de bcn
    zoom: 10 // puso 10
  })


 

  // Create a marker for every position Paso 4
  posDivs.forEach((posDiv, i) => {
    const posS = posDiv.innerText.split(",")
    const pos = posS.map(num => Number(num))
    new mapboxgl.Marker(markerDivs[i])
      .setLngLat(pos)
      .addTo(map)
  })
});

