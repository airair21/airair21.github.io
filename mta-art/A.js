const albumsList = document.getElementById('albums-list')

function renderAlbum(album, i) {
  // Create .album element
  const albumElement = document.createElement('div')

  albumElement.classList.add('album')
  albumElement.classList.add(`album-${i}`)

  // const line = '2';

  // console.log(albumElement)
  // console.log(album.Line);
  // console.log(album.cover_image_url)
  // console.log(album.Line == 2);
  // const albumFilter = albumFilter(album => album.includes('2'))
  // console.log(albumFilter);
  // console.log(${line})

  // Create the inner HTML content
  const albumHTML = `
    <a href="albumDetail.html?title=${album.Station_Name}">
      <h2> ${album.Station_Name} </h2>
    </a>
    <ul>
      <p> ${album.Art_Title}</p>
    </ul>
  `

  // Set the inner HTML content of the albumElement
  albumElement.innerHTML = albumHTML

  // Add to the list #albums-list
  albumsList.appendChild(albumElement)
}


fetch('albums.json')
    .then(response => response.json())
    .then(data => {
      const filteredAlbums = data.albums.filter(album => {
        // Check if the Line property is a string before calling includes()
        if (typeof album.Line === 'string') {
          return album.Line.includes('A');
        } else {
          return false;
        }
      });
      console.log(filteredAlbums);

      filteredAlbums.forEach(album => {
      if (album.Line) {
        renderAlbum(album);
      }
    });
    })
    


// checkFilter = album.Line.filter(album => album.Line >= 2);
// console.log(checkFilter);


