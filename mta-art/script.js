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
      <li>
        <a href="${album.Art_Image_Link}">
         Listen Here
        </a>
      <li>
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
          return album.Line.includes('2');
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


function runAnimationRedIn() {
  // Code to run the animation goes here
  // var element = document.querySelector('.door');
  //   element.classList.add('animate');

    const Rectangle1 = document.getElementById("Rectangle1");
    Rectangle1.style.backgroundColor = "#ee352e";
    Rectangle1.style.transform = "translateX(100vw)";
    const Rectangle2 = document.getElementById("Rectangle2");
    Rectangle2.style.backgroundColor = "#ee352e";
    Rectangle2.style.transform = "translateX(-105vw)";
    
    // setTimeout(function() {
    //   // Remove the 'animate' class to reset the animation
    //   // element.classList.remove('animate');
    //   // Navigate to the new page
    //   window.location.href = 'red.html';
    // }, 2000); // Duration of animation in milliseconds
}
function runAnimationOrangeIn() {
  // Code to run the animation goes here
  // var element = document.querySelector('.door');
  //   element.classList.add('animate');

    const Rectangle1 = document.getElementById("Rectangle1");
    Rectangle1.style.backgroundColor = "#ff6319";
    Rectangle1.style.transform = "translateX(100vw)";
    const Rectangle2 = document.getElementById("Rectangle2");
    Rectangle2.style.backgroundColor = "#ff6319";
    Rectangle2.style.transform = "translateX(-105vw)";
    
    // setTimeout(function() {
    //   // Remove the 'animate' class to reset the animation
    //   // element.classList.remove('animate');
    //   // Navigate to the new page
    //   window.location.href = 'orange.html';
    // }, 2000); // Duration of animation in milliseconds
}
function runAnimationYellowIn() {
  // Code to run the animation goes here
  // var element = document.querySelector('.door');
  //   element.classList.add('animate');

    const Rectangle1 = document.getElementById("Rectangle1");
    Rectangle1.style.backgroundColor = "#fccc0a";
    Rectangle1.style.transform = "translateX(100vw)";
    const Rectangle2 = document.getElementById("Rectangle2");
    Rectangle2.style.backgroundColor = "#fccc0a";
    Rectangle2.style.transform = "translateX(-105vw)";
    
    // setTimeout(function() {
    //   // Remove the 'animate' class to reset the animation
    //   // element.classList.remove('animate');
    //   // Navigate to the new page
    //   window.location.href = 'yellow.html';
    // }, 2000); // Duration of animation in milliseconds
}
function runAnimationLimeIn() {
  // Code to run the animation goes here
  // var element = document.querySelector('.door');
  //   element.classList.add('animate');

    const Rectangle1 = document.getElementById("Rectangle1");
    Rectangle1.style.backgroundColor = "#6cbe45";
    Rectangle1.style.transform = "translateX(100vw)";
    const Rectangle2 = document.getElementById("Rectangle2");
    Rectangle2.style.backgroundColor = "#6cbe45";
    Rectangle2.style.transform = "translateX(-105vw)";
    
    // setTimeout(function() {
    //   // Remove the 'animate' class to reset the animation
    //   // element.classList.remove('animate');
    //   // Navigate to the new page
    //   window.location.href = 'lime.html';
    // }, 2000); // Duration of animation in milliseconds
}
function runAnimationGreenIn() {
  // Code to run the animation goes here
  // var element = document.querySelector('.door');
  //   element.classList.add('animate');

    const Rectangle1 = document.getElementById("Rectangle1");
    Rectangle1.style.backgroundColor = "#00933c";
    Rectangle1.style.transform = "translateX(100vw)";
    const Rectangle2 = document.getElementById("Rectangle2");
    Rectangle2.style.backgroundColor = "#00933c";
    Rectangle2.style.transform = "translateX(-105vw)";
    
    // setTimeout(function() {
    //   // Remove the 'animate' class to reset the animation
    //   // element.classList.remove('animate');
    //   // Navigate to the new page
    //   window.location.href = 'green.html';
    // }, 2000); // Duration of animation in milliseconds
}
function runAnimationTealIn() {
  // Code to run the animation goes here
  // var element = document.querySelector('.door');
  //   element.classList.add('animate');

    const Rectangle1 = document.getElementById("Rectangle1");
    Rectangle1.style.backgroundColor = "#00add0";
    Rectangle1.style.transform = "translateX(100vw)";
    const Rectangle2 = document.getElementById("Rectangle2");
    Rectangle2.style.backgroundColor = "#00add0";
    Rectangle2.style.transform = "translateX(-105vw)";
    
    // setTimeout(function() {
    //   // Remove the 'animate' class to reset the animation
    //   // element.classList.remove('animate');
    //   // Navigate to the new page
    //   window.location.href = 'teal.html';
    // }, 2000); // Duration of animation in milliseconds
}
function runAnimationBlueIn() {
  // Code to run the animation goes here
  // var element = document.querySelector('.door');
  //   element.classList.add('animate');

    const Rectangle1 = document.getElementById("Rectangle1");
    Rectangle1.style.backgroundColor = "#0039a6";
    Rectangle1.style.transform = "translateX(100vw)";
    const Rectangle2 = document.getElementById("Rectangle2");
    Rectangle2.style.backgroundColor = "#0039a6";
    Rectangle2.style.transform = "translateX(-105vw)";
    
    // setTimeout(function() {
    //   // Remove the 'animate' class to reset the animation
    //   // element.classList.remove('animate');
    //   // Navigate to the new page
    //   window.location.href = 'blue.html';
    // }, 2000); // Duration of animation in milliseconds
}
function runAnimationPurpleIn() {
  // Code to run the animation goes here
  // var element = document.querySelector('.door');
  //   element.classList.add('animate');

    const Rectangle1 = document.getElementById("Rectangle1");
    Rectangle1.style.backgroundColor = "#b933ad";
    Rectangle1.style.transform = "translateX(100vw)";
    const Rectangle2 = document.getElementById("Rectangle2");
    Rectangle2.style.backgroundColor = "#b933ad";
    Rectangle2.style.transform = "translateX(-105vw)";
    
    // setTimeout(function() {
    //   // Remove the 'animate' class to reset the animation
    //   // element.classList.remove('animate');
    //   // Navigate to the new page
    //   window.location.href = 'purple.html';
    // }, 2000); // Duration of animation in milliseconds
}
function runAnimationBrownIn() {
  // Code to run the animation goes here
  // var element = document.querySelector('.door');
  //   element.classList.add('animate');

    const Rectangle1 = document.getElementById("Rectangle1");
    Rectangle1.style.backgroundColor = "#996633";
    Rectangle1.style.transform = "translateX(100vw)";
    const Rectangle2 = document.getElementById("Rectangle2");
    Rectangle2.style.backgroundColor = "#996633";
    Rectangle2.style.transform = "translateX(-105vw)";
    
    // setTimeout(function() {
    //   // Remove the 'animate' class to reset the animation
    //   // element.classList.remove('animate');
    //   // Navigate to the new page
    //   window.location.href = 'brown.html';
    // }, 2000); // Duration of animation in milliseconds
}
function runAnimationLgrayIn() {
  // Code to run the animation goes here
  // var element = document.querySelector('.door');
  //   element.classList.add('animate');

    const Rectangle1 = document.getElementById("Rectangle1");
    Rectangle1.style.backgroundColor = "#a7a9ac";
    Rectangle1.style.transform = "translateX(100vw)";
    const Rectangle2 = document.getElementById("Rectangle2");
    Rectangle2.style.backgroundColor = "#a7a9ac";
    Rectangle2.style.transform = "translateX(-105vw)";
    
    // setTimeout(function() {
    //   // Remove the 'animate' class to reset the animation
    //   // element.classList.remove('animate');
    //   // Navigate to the new page
    //   window.location.href = 'lgray.html';
    // }, 2000); // Duration of animation in milliseconds
}
function runAnimationDgrayIn() {
  // Code to run the animation goes here
  // var element = document.querySelector('.door');
  //   element.classList.add('animate');

    const Rectangle1 = document.getElementById("Rectangle1");
    Rectangle1.style.backgroundColor = "#808183";
    Rectangle1.style.transform = "translateX(100vw)";
    const Rectangle2 = document.getElementById("Rectangle2");
    Rectangle2.style.backgroundColor = "#808183";
    Rectangle2.style.transform = "translateX(-105vw)";
    
    // setTimeout(function() {
    //   // Remove the 'animate' class to reset the animation
    //   // element.classList.remove('animate');
    //   // Navigate to the new page
    //   window.location.href = 'dgray.html';
    // }, 2000); // Duration of animation in milliseconds
}