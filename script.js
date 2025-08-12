



var tooltip = document.querySelectorAll('.tooltiptext');



document.querySelectorAll('.tooltip').forEach(tooltip => {
    const tooltipText = tooltip.querySelector('.tooltiptext');
    const originalContent = tooltipText.innerHTML;
    
    // Clear content initially and set up container
    tooltipText.innerHTML = originalContent;
    tooltipText.style.overflow = 'hidden';
    tooltipText.style.display = 'block';
    tooltipText.style.height = '0';
    tooltipText.style.opacity = '0';
    tooltipText.style.borderWidth = '0';
    tooltipText.style.transition = 'none';
    
    tooltip.addEventListener('mouseenter', function() {
        // Reset for animation
        tooltipText.innerHTML = originalContent;
        tooltipText.style.display = 'block';
        tooltipText.style.height = '0';
        tooltipText.style.opacity = '0';
        tooltipText.style.borderWidth = '0';
        tooltipText.style.transition = 'none';
        
        // Get the full height we need to animate to
        const fullHeight = tooltipText.scrollHeight + 'px';
        const borderWidth = '2px'; // Match your original border width
        
        // Force reflow
        void tooltipText.offsetHeight;
        
        // Start animation
        tooltipText.style.transition = `
            height 0.3s ease-in,
            opacity 0.2s ease-in 0.1s,
            border-width 0.2s ease-in 0.1s
        `;
        tooltipText.style.height = fullHeight;
        tooltipText.style.opacity = '1';
        tooltipText.style.borderWidth = borderWidth;
    });
    
    tooltip.addEventListener('mouseleave', function() {
        // Reverse animation
        tooltipText.style.transition = `
            height 0.3s ease-out,
            opacity 0.2s ease-out,
            border-width 0.2s ease-out
        `;
        tooltipText.style.height = '0';
        tooltipText.style.opacity = '0';
        tooltipText.style.borderWidth = '0';
        
        // Keep content until animation completes
        setTimeout(() => {
            tooltipText.style.display = 'none';
        }, 300);
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
    document.querySelectorAll('.sright img').forEach(img => {
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