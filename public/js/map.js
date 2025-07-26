document.addEventListener("DOMContentLoaded", () => {
    const mapElement = document.getElementById("map");
    //geting location via html element
    const location = mapElement.dataset.location;
    const country = mapElement.dataset.country;

    // geocoding (api)
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}+${country}`, {
        headers: {
            'Accept-Language': 'en',
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                mapElement.innerHTML = `
                <div class="alert alert-warning text-center" role="alert">
                    📍 Location/Map not found for "<b>${location}, ${country}</b>".
                </div>`;
                return;
            }

            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);

            //set map (api)
            const map = new maplibregl.Map({
                container: 'map',
                style: 'https://api.maptiler.com/maps/streets/style.json?key=CDGPJgVH6z8Yu4IdBjTm&language=en',
                center: [lon, lat],
                zoom: 6,
                pitch: 45,
                bearing: -17.6,
                antialias: true
            });

            new maplibregl.Marker()
                .setLngLat([lon, lat])
                .addTo(map);
        })
        .catch(error => {
            console.error("Geocoding failed:", error);
        });
});
