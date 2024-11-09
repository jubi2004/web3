let smallMap, largeMap;
let marker;

// Initialize Google Maps
function initMap() {
    const defaultLocation = { lat: 20.5937, lng: 78.9629 }; // Center of India

    // Small map (satellite view)
    smallMap = new google.maps.Map(document.getElementById('smallMap'), {
        center: defaultLocation,
        zoom: 5,
        mapTypeId: 'satellite',
    });

    // Large map (satellite view)
    largeMap = new google.maps.Map(document.getElementById('largeMap'), {
        center: defaultLocation,
        zoom: 5,
        mapTypeId: 'satellite',
    });

    // Event listener for placing a marker on the large map
    largeMap.addListener('click', (event) => {
        placeMarker(event.latLng, largeMap);
    });

    // Clicking the small map opens the large map in a modal
    document.getElementById('smallMapContainer').addEventListener('click', function () {
        document.getElementById('mapModal').style.display = 'block';
        google.maps.event.trigger(largeMap, 'resize'); // Resize to adjust
        largeMap.setCenter(smallMap.getCenter()); // Keep center consistent with small map
    });

    // Close the modal
    document.querySelector('.close').addEventListener('click', function () {
        document.getElementById('mapModal').style.display = 'none';
    });

    // Initialize a marker if it's not yet created
    function placeMarker(location, map) {
        if (marker) {
            marker.setPosition(location);
        } else {
            marker = new google.maps.Marker({
                position: location,
                map: map,
            });
        }
        map.setCenter(location);
    }
}

// Handle form submission to send the selected crop and location to Firestore
document.getElementById('submit').addEventListener('click', async () => {
    if (!marker) {
        alert('Please select a location by clicking on the map.');
        return;
    }

    const selectedCrop = document.getElementById('cropChoice').value;
    const position = marker.getPosition();

    const locationData = {
        latitude: position.lat(),
        longitude: position.lng(),
        cropChoice: selectedCrop,
        userId: auth.currentUser ? auth.currentUser.uid : 'guest', // Ensure user authentication
    };

    try {
        // Store the data in Firestore
        await db.collection('farmerData').add(locationData);
        alert('Location and Crop Data successfully stored in Firestore!');
    } catch (error) {
        console.error('Error storing data:', error);
        alert('Failed to store data in Firestore.');
    }
    
});

// Initialize the map when the page loads
window.onload = initMap;
