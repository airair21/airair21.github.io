

// ============================================
// INTEGRATED TOOLTIP & PROJ HOVER FUNCTIONS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ============================================
  // 1. TOOLTIPTEXT FUNCTIONALITY (Your original code, integrated)
  // ============================================
  
  const tooltips = document.querySelectorAll('.tooltip');
  
  tooltips.forEach(tooltip => {
    const tooltipText = tooltip.querySelector('.tooltiptext');
    if (!tooltipText) return;
    
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
    tooltipText.style.pointerEvents = 'none';
    
    // Show tooltip on hover
    tooltip.addEventListener('mouseenter', function() {
      // Reset styles
      tooltipText.style.transition = 'none';
      tooltipText.style.opacity = '0';
      tooltipText.style.height = '0';
      tooltipText.style.borderWidth = '0';
      tooltipText.style.padding = '0';
      
      // Get target values
      const targetHeight = tooltipText.scrollHeight + 'px';
      const targetBorderWidth = '0px';
      // const targetPadding = '2%';
      
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
    
    // Hide tooltip on mouse leave
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
  
  // Position tooltips near mouse (Your original mousemove code)
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
  
  

  // Initialize
  setTimeout(() => {
    randomizeOtherImg();
    setTimeout(setupHoverEffects, 300);
  }, 100);

  // Resize handler
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        randomizeOtherImg();
        setTimeout(setupHoverEffects, 300);
    }, 250);
  });

  // ============================================
  // DEBUG TOOL: Run in browser console
  // ============================================
  /*
  function debugCollisions() {
    document.querySelectorAll('.proj').forEach((proj, projIndex) => {
        const imgs = proj.querySelectorAll('.otherimg');
        const projRect = proj.getBoundingClientRect();
        
        console.log(`\n🔍 DEBUG PROJ ${projIndex} (${projRect.width}x${projRect.height})`);
        
        const rects = [];
        imgs.forEach((img, imgIndex) => {
            if (img.style.display === 'none') return;
            const rect = img.getBoundingClientRect();
            rects.push({
                index: imgIndex,
                left: rect.left - projRect.left,
                top: rect.top - projRect.top,
                right: rect.right - projRect.left,
                bottom: rect.bottom - projRect.top,
                width: rect.width,
                height: rect.height
            });
        });
        
        // Check each pair
        for (let i = 0; i < rects.length; i++) {
            for (let j = i + 1; j < rects.length; j++) {
                const r1 = rects[i];
                const r2 = rects[j];
                
                // Check all four sides
                const leftCollision = r1.right > r2.left && r1.left < r2.right;
                const rightCollision = r1.left < r2.right && r1.right > r2.left;
                const topCollision = r1.bottom > r2.top && r1.top < r2.bottom;
                const bottomCollision = r1.top < r2.bottom && r1.bottom > r2.top;
                
                if (leftCollision && topCollision) {
                    console.error(`💥 Img ${r1.index} collides with Img ${r2.index} at LEFT/TOP`);
                }
                if (rightCollision && topCollision) {
                    console.error(`💥 Img ${r1.index} collides with Img ${r2.index} at RIGHT/TOP`);
                }
                if (leftCollision && bottomCollision) {
                    console.error(`💥 Img ${r1.index} collides with Img ${r2.index} at LEFT/BOTTOM`);
                }
                if (rightCollision && bottomCollision) {
                    console.error(`💥 Img ${r1.index} collides with Img ${r2.index} at RIGHT/BOTTOM`);
                }
            }
        }
    });
  }
  */
  
  // ============================================
  // 3. KEEP ALL YOUR OTHER FUNCTIONALITY BELOW
  // ============================================
  
  // Your image zoom overlay code
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
      maxWidth: '130%',
      maxHeight: '130%',
      objectFit: 'contain',
      transform: 'scale(1.3)',
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
  
  // Your span highlighting code
  document.addEventListener('DOMContentLoaded', function() {
    // Select all spans within the paragraph
    const spans = document.querySelectorAll('p span');
    
    spans.forEach(span => {
      span.style.transition = 'background-color 0.2s ease';
      span.style.borderRadius = '3px';
      span.style.cursor = 'pointer';
      span.style.padding = '2px 4px';
      span.style.margin = '1px 0';
      
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
  
  // Your scroll fade code
  function initScrollFade() {
    const images = document.querySelectorAll('.worksproj img');
    
    // Set initial state
    images.forEach(img => {
      img.style.opacity = '0';
      img.style.transform = 'translateY(20px)';
      img.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, 100);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    // Observe all images
    images.forEach(img => observer.observe(img));
  }
  
  // Initialize scroll fade
  initScrollFade();
  
  // Your GIF hover code (commented out, uncomment if needed)
  /*
  document.querySelectorAll('.hover-gif').forEach(img => {
    const originalSrc = img.src;
    
    // Create a temporary image to get first frame
    const tempImg = new Image();
    tempImg.src = originalSrc;
    
    tempImg.onload = function() {
      // Create canvas with first frame
      const canvas = document.createElement('canvas');
      canvas.width = tempImg.width;
      canvas.height = tempImg.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(tempImg, 0, 0);
      
      // Set initial state (paused)
      img.src = canvas.toDataURL();
      
      // Play on hover
      img.addEventListener('mouseenter', () => {
        img.src = originalSrc;
      });
      
      // Pause on mouseleave
      img.addEventListener('mouseleave', () => {
        img.src = canvas.toDataURL();
      });
    };
  });
  */
});


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







document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // WORKS POPUP FUNCTIONALITY
    // ============================================
    
    // Find the works link - more specific selector
    const worksLink = document.querySelector('a[href="#"]'); // Looks for link with href="#"
    // OR use this alternative if you prefer:
    // const worksLink = document.getElementById('works-link');
    
    const popup = document.getElementById('works-popup');
    const overlay = document.getElementById('popup-overlay');
    const closeBtn = document.querySelector('.popup-close');
    
    console.log('Works link:', worksLink); // Debug: check if link is found
    console.log('Popup:', popup); // Debug: check if popup exists
    
    function openPopup(e) {
        e.preventDefault(); // Prevents page from jumping to top
        console.log('Open popup clicked!'); // Debug: confirm click works
        
        if (popup) {
            popup.classList.add('active');
        }
        if (overlay) {
            overlay.classList.add('active');
        }
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    function closePopup() {
        if (popup) {
            popup.classList.remove('active');
        }
        if (overlay) {
            overlay.classList.remove('active');
        }
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
    
    // Open popup when Works link is clicked
    if (worksLink) {
        worksLink.addEventListener('click', openPopup);
    } else {
        // Fallback: try to find any link with "works" text
        const fallbackLink = Array.from(document.querySelectorAll('a')).find(link => 
            link.textContent.trim().toLowerCase() === 'works'
        );
        if (fallbackLink) {
            fallbackLink.addEventListener('click', openPopup);
            fallbackLink.setAttribute('href', '#'); // Add href to prevent page reload
            console.log('Found fallback link:', fallbackLink);
        }
    }
    
    // Close popup when close button is clicked
    if (closeBtn) {
        closeBtn.addEventListener('click', closePopup);
    }
    
    // Close popup when overlay is clicked
    if (overlay) {
        overlay.addEventListener('click', closePopup);
    }
    
    // Close popup when Escape key is pressed
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popup && popup.classList.contains('active')) {
            closePopup();
        }
    });
    
});


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