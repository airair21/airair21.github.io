



var tooltip = document.querySelectorAll('.tooltiptext');

document.addEventListener('mousemove', function(e) {
    const tooltips = document.querySelectorAll('.tooltip:hover .tooltiptext');
    
    tooltips.forEach(tooltip => {
        // Reset transform first
        tooltip.style.transform = 'none';
        
        // Position tooltip near cursor
        tooltip.style.left = '0';
        tooltip.style.top = '0';
        tooltip.style.transform = `translate(${e.clientX + 25}px, ${e.clientY + 25}px)`;
        
        // Prevent going off-screen
        const rect = tooltip.getBoundingClientRect();
        if (rect.right > window.innerWidth) {
            tooltip.style.transform = `translate(${e.clientX - rect.width - 15}px, ${e.clientY + 15}px)`;
        }
        if (rect.bottom > window.innerHeight) {
            tooltip.style.transform = `translate(${e.clientX + 15}px, ${e.clientY - rect.height - 15}px)`;
        }
    });
});