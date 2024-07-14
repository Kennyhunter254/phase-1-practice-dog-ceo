console.log('%c HI', 'color: firebrick')
document.addEventListener('DOMContentLoaded', function() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const dogImageContainer = document.getElementById('dog-image-container');
    const breedDropdown = document.getElementById('breed-dropdown');
    const dogBreedsList = document.getElementById('dog-breeds');
  
    // Fetch random dog images
    fetch(imgUrl)
      .then(response => response.json())
      .then(data => {
        data.message.forEach(imageUrl => {
          const imgElement = document.createElement('img');
          imgElement.src = imageUrl;
          dogImageContainer.appendChild(imgElement);
        });
      })
      .catch(error => console.error('Error fetching dog images:', error));
  
    // Fetch all dog breeds and populate the list
    fetch(breedUrl)
      .then(response => response.json())
      .then(data => {
        const breeds = data.message;
        for (const breed in breeds) {
          const breedItem = document.createElement('li');
          breedItem.textContent = breed;
          dogBreedsList.appendChild(breedItem);
        }
      })
      .catch(error => console.error('Error fetching dog breeds:', error));
  
    // Filter dog breeds based on selected starting letter
    breedDropdown.addEventListener('change', function(event) {
      const selectedLetter = event.target.value;
      const breedItems = dogBreedsList.getElementsByTagName('li');
  
      for (const breedItem of breedItems) {
        const breedName = breedItem.textContent.toLowerCase();
        if (selectedLetter === 'all' || breedName.startsWith(selectedLetter)) {
          breedItem.style.display = 'block';
        } else {
          breedItem.style.display = 'none';
        }
      }
    });
  });
  