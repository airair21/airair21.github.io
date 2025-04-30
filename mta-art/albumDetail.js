console.log('Hello from detail page')

const LOCAL_STORAGE_ITINERARY_KEY = 'itinerary'

// Decode URI to handle album titles with spaces
// Assumes the URL for this page looks like /albumDetail.html?title={ album_title }
const albumTitleFromQueryString = decodeURI(window.location.search.replace('?title=', ''))


function renderAlbumDetail(album) {
  // Set the title of the page to the title of the album
  document.querySelector('h1').innerText = album.Station_Name
  document.querySelector('h2').innerText = album.Art_Title
  document.querySelector('h3').innerText = album.Line
  // document.querySelector('img').innerText = album.img_url

  
  // Create an image element to display the cover image of the album
  // const img = document.createElement('img')
  //       img.src = album.img_url

  // // Append it to the bottom of the page
  // document.body.appendChild(img)


  const albumElement = document.createElement('div')
  // albumElement.classList.add('album')
  // albumElement.classList.add(`album-${i}`)

  // Create the inner HTML content
  const albumHTML = `
      <img src="${album.img_url}">
      <h2> ${album.Station_Name} </h2>
    <ul>
      <p> ${album.Art_Title}</p>
    </ul>
  `

  // Set the inner HTML content of the albumElement
  albumElement.innerHTML = albumHTML

  // Add to the list #albums-list
  // albumsList.appendChild(albumElement) 

  // Add to the list #albums-list
  const albumsList = document.querySelector('#albums-list')
  albumsList.appendChild(albumElement)
}

(function() { // Scoping function to avoid creating globals
  // Loading
  var savedAlbums = JSON.parse(localStorage.getItem("savedAlbums") || "[]");
  console.log("# of saved albums: " + savedAlbums.length);
  savedAlbums.forEach(function(album, index) {
      console.log("[" + index + "]: Station Name: " + album.stationName + ", Art Title: " + album.artTitle);
  });

  // Modifying
  const saveButton = document.getElementById('save-button');
  saveButton.addEventListener('click', () => {
    const stationName = document.querySelector('h1').innerText;
    const artTitle = document.querySelector('div').innerText;

    const album = {
      stationName: stationName,
      artTitle: artTitle
    };

    savedAlbums.push(album);
    console.log(`Saved ${artTitle} at ${stationName} to local storage`);

    // Saving
    localStorage.setItem("savedAlbums", JSON.stringify(savedAlbums));
  });
})();

function displaySavedAlbums() {
  // Load saved albums from localStorage
  const savedAlbums = JSON.parse(localStorage.getItem('savedAlbums')) || [];

  // Select the container element where the saved albums will be displayed
  const container = document.querySelector('#saved-albums-container');

  // If there are no saved albums, display a message
  if (savedAlbums.length === 0) {
    container.innerHTML = '<p>No saved stations.</p>';
    return;
  }

  // Generate HTML for each saved album
  const albumHTML = savedAlbums.map(album => `
    <div class="saved-album" id="saved-items-container">
      <h3>${album.stationName}</h3>
      <p>${album.artTitle}</p>
    </div>
  `).join('');

  // Add the generated HTML to the container element
  container.innerHTML = albumHTML;
}

// Only run the function on the ticket.html page
if (window.location.pathname === '/ticket.html') {
  displaySavedAlbums();
}



fetch('albums.json')
    .then((response) => response.json())
    .then((json) => {
      const albums = json.albums

      // Find specific album based on album title passed in URL query string
      // Use Array.find to return the first element that passes our test function
      const foundAlbum = albums.find(function(album) {
        // Check that the title of the current album in the array matches the title that we passed to the page in the URL
        return album.Station_Name === albumTitleFromQueryString
      })

      if (foundAlbum) {
        renderAlbumDetail(foundAlbum)
      }
      else {
        // console.log('You asked for an album that doesnt exist')
      }

      console.log('Found? ', foundAlbum)

      // Add event listener to save button
      const saveButton = document.getElementById('save-button');
      saveButton.addEventListener('click', () => {
        console.log(foundAlbum)
        console.log('current value of itinerary is', localStorage.getItem(LOCAL_STORAGE_ITINERARY_KEY))

        console.log('we need to add the station to the list')
        localStorage.setItem(LOCAL_STORAGE_ITINERARY_KEY, foundAlbum.Station_Name);
        // console.log(`Saved ${Art_Title} at ${Station_Name} to localStorage`);
      });
    });

    const backButton = document.getElementById('back-button');
    backButton.addEventListener('click', () => {
      window.location.href = 'index.html';
    });

    const ticketButton = document.getElementById('ticket-button');
    ticketButton.addEventListener('click', () => {
      window.location.href = 'ticket.html';
    });

    