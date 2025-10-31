



var tooltip = document.querySelectorAll('.tooltiptext');



document.querySelectorAll('.tooltip').forEach(tooltip => {
  const tooltipText = tooltip.querySelector('.tooltiptext');
  
  // Store original content and set initial state
  const originalContent = tooltipText.innerHTML;
  tooltipText.innerHTML = originalContent;
  
  // Set initial styles
  tooltipText.style.visibility = 'visible'; // Keep visible for positioning
  tooltipText.style.opacity = '0';
  tooltipText.style.height = '0';
  tooltipText.style.borderWidth = '0';
  tooltipText.style.padding = '0';
  tooltipText.style.overflow = 'hidden';
  tooltipText.style.transition = 'none';
  
  tooltip.addEventListener('mouseenter', function() {
      // Reset styles
      tooltipText.style.transition = 'none';
      tooltipText.style.opacity = '0';
      tooltipText.style.height = '0';
      tooltipText.style.borderWidth = '0';
      tooltipText.style.padding = '0';
      
      // Get target values
      const targetHeight = tooltipText.scrollHeight + 'px';
      const targetBorderWidth = '2px';
      const targetPadding = '5px'; // Adjust as needed
      
      // Force reflow
      void tooltipText.offsetHeight;
      
      // Apply transition and animate to target
      tooltipText.style.transition = `
          height 0.1s ease-out,
          opacity 0.2s ease-out 0.1s,
          border-width 0.2s ease-out 0.1s,
          padding 0.1s ease-out 0.1s
      `;
      
      tooltipText.style.height = targetHeight;
      tooltipText.style.opacity = '1';
      tooltipText.style.borderWidth = targetBorderWidth;
      tooltipText.style.padding = targetPadding;
  });
  
  tooltip.addEventListener('mouseleave', function() {
      // Animate back to hidden state
      tooltipText.style.transition = `
          height 0.05s ease-in,
          opacity 0.1s ease-in,
          border-width 0.1s ease-in,
          padding 0.05s ease-in
      `;
      
      tooltipText.style.height = '0';
      tooltipText.style.opacity = '0';
      tooltipText.style.borderWidth = '0';
      tooltipText.style.padding = '0';
  });
});

// Keep your existing mousemove code for positioning
document.addEventListener('mousemove', function(e) {
    const tooltips = document.querySelectorAll('.tooltip:hover .tooltiptext');
    
    tooltips.forEach(tooltip => {
        tooltip.style.transform = 'none';
        tooltip.style.left = '0';
        tooltip.style.top = '0';
        tooltip.style.transform = `translate(${e.clientX + 25}px, ${e.clientY + 25}px)`;
        
        const rect = tooltip.getBoundingClientRect();
        if (rect.right > window.innerWidth) {
            tooltip.style.transform = `translate(${e.clientX - rect.width - 15}px, ${e.clientY + 15}px)`;
        }
        if (rect.bottom > window.innerHeight) {
            tooltip.style.transform = `translate(${e.clientX + 15}px, ${e.clientY - rect.height - 15}px)`;
        }
    });
});


// document.querySelectorAll('.hover-gif').forEach(img => {
//     const originalSrc = img.src;
    
//     // Create a temporary image to get first frame
//     const tempImg = new Image();
//     tempImg.src = originalSrc;
    
//     tempImg.onload = function() {
//       // Create canvas with first frame
//       const canvas = document.createElement('canvas');
//       canvas.width = tempImg.width;
//       canvas.height = tempImg.height;
//       const ctx = canvas.getContext('2d');
//       ctx.drawImage(tempImg, 0, 0);
      
//       // Set initial state (paused)
//       img.src = canvas.toDataURL();
      
//       // Play on hover
//       img.addEventListener('mouseenter', () => {
//         img.src = originalSrc;
//       });
      
//       // Pause on mouseleave
//       img.addEventListener('mouseleave', () => {
//         img.src = canvas.toDataURL();
//       });
//     };
//   });


document.addEventListener('DOMContentLoaded', function() {
    // Create overlay elements
    const overlay = document.createElement('div');
    const enlargedImg = document.createElement('img');
    
    // Style the overlay
    Object.assign(overlay.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: '1000',
      cursor: 'zoom-out',
      opacity: '0',
      pointerEvents: 'none',
      transition: 'opacity 0.3s ease, background-color 0.3s ease'
    });
    
    // Style the enlarged image
    Object.assign(enlargedImg.style, {
      maxWidth: '90%',
      maxHeight: '90%',
      objectFit: 'contain',
      transform: 'scale(0.9)',
      transition: 'transform 0.3s ease',
      opacity: '0'
    });
  
    overlay.appendChild(enlargedImg);
    document.body.appendChild(overlay);
  
    // Animation functions
    function openOverlay(imgSrc) {
      enlargedImg.src = imgSrc;
      
      // Enable overlay interaction
      overlay.style.pointerEvents = 'auto';
      document.body.style.overflow = 'hidden';
      
      // Start animations
      requestAnimationFrame(() => {
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        overlay.style.opacity = '1';
        
        // Delay image animation slightly
        setTimeout(() => {
          enlargedImg.style.transform = 'scale(1)';
          enlargedImg.style.opacity = '1';
        }, 50);
      });
    }
  
    function closeOverlay() {
      // Start closing animations
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
      overlay.style.opacity = '0';
      enlargedImg.style.transform = 'scale(0.9)';
      enlargedImg.style.opacity = '0';
      
      // Disable interaction after animation
      setTimeout(() => {
        overlay.style.pointerEvents = 'none';
        document.body.style.overflow = 'auto';
      }, 300);
    }
  
    // Add click events to images
    document.querySelectorAll('.worksproj img').forEach(img => {
      img.style.cursor = 'zoom-in';
      
      img.addEventListener('click', function() {
        openOverlay(this.src);
      });
    });
  
    // Close events
    overlay.addEventListener('click', closeOverlay);
    
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && overlay.style.pointerEvents === 'auto') {
        closeOverlay();
      }
    });
  });


  

  // document.addEventListener('DOMContentLoaded', function() {
  //   // Check if mobile device (you can adjust the breakpoint as needed)
  //   const isMobile = window.innerWidth <= 768; // Common mobile breakpoint
    
  //   if (isMobile) {
  //     // Create popup elements
  //     const popupOverlay = document.createElement('div');
  //     const popupContent = document.createElement('div');
  //     const popupMessage = document.createElement('p');
  //     const closeButton = document.createElement('button');
      
  //     // Style the overlay
  //     Object.assign(popupOverlay.style, {
  //       position: 'fixed',
  //       top: '0',
  //       left: '0',
  //       width: '100%',
  //       height: '100%',
  //       backgroundColor: 'rgba(0, 0, 0, 0.8)',
  //       display: 'flex',
  //       justifyContent: 'center',
  //       alignItems: 'center',
  //       zIndex: '9999',
  //       fontFamily: 'sans-serif'
  //     });
      
  //     // Style the content box
  //     Object.assign(popupContent.style, {
  //       backgroundColor: 'white',
  //       padding: '20px',
  //       borderRadius: '10px',
  //       maxWidth: '80%',
  //       textAlign: 'center',
  //       boxShadow: '0 0 20px rgba(0,0,0,0.5)'
  //     });
      
  //     // Style the message
  //     Object.assign(popupMessage.style, {
  //       fontSize: '18px',
  //       margin: '0 0 20px 0',
  //       color: '#333'
  //     });
  //     popupMessage.textContent = 'Sorry! Phone site work in progress. Please visit on desktop for the full experience :)';
      
  //     // Style the close button
  //     Object.assign(closeButton.style, {
  //       backgroundColor: '#ff6b6b',
  //       color: 'white',
  //       border: 'none',
  //       padding: '10px 20px',
  //       borderRadius: '5px',
  //       cursor: 'pointer',
  //       fontSize: '16px'
  //     });
  //     closeButton.textContent = 'I Understand';
      
  //     // Build the popup structure
  //     popupContent.appendChild(popupMessage);
  //     popupContent.appendChild(closeButton);
  //     popupOverlay.appendChild(popupContent);
  //     document.body.appendChild(popupOverlay);
      
  //     // Make body non-scrollable
  //     document.body.style.overflow = 'hidden';
      
  //     // Close functionality
  //     closeButton.addEventListener('click', function() {
  //       document.body.removeChild(popupOverlay);
  //       document.body.style.overflow = 'auto';
  //     });
      
  //     // Also close when clicking outside content
  //     popupOverlay.addEventListener('click', function(e) {
  //       if (e.target === popupOverlay) {
  //         document.body.removeChild(popupOverlay);
  //         document.body.style.overflow = 'auto';
  //       }
  //     });
      
  //     // Close with ESC key
  //     document.addEventListener('keydown', function(e) {
  //       if (e.key === 'Escape' && document.body.contains(popupOverlay)) {
  //         document.body.removeChild(popupOverlay);
  //         document.body.style.overflow = 'auto';
  //       }
  //     });
  //   }
  // });


  // Add orange highlighting on hover for each span individually


  document.addEventListener('DOMContentLoaded', function() {
  // Select all spans within the paragraph
  const spans = document.querySelectorAll('p span');
  
  spans.forEach(span => {
      span.style.transition = 'background-color 0.2s ease';
      span.style.borderRadius = '3px';
      span.style.cursor = 'pointer';
      // span.style.display = 'inline-block'; // Ensure proper highlighting
      span.style.padding = '2px 4px'; // Add some padding for better visual
      span.style.margin = '1px 0'; // Small margin between spans
      
      span.addEventListener('mouseenter', function(e) {
          e.stopPropagation();
          this.style.backgroundColor = 'orange';
      });
      
      span.addEventListener('mouseleave', function(e) {
          e.stopPropagation();
          this.style.backgroundColor = '';
      });
  });
});