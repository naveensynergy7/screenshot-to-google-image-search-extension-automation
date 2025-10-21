// Content script for the Quick Screenshot Tool extension

let isScreenshotMode = false;
let overlay = null;
let startX, startY, endX, endY;
let isDrawing = false;

// Create the screenshot overlay
function createOverlay() {
  if (overlay) return;
  
  overlay = document.createElement('div');
  overlay.id = 'screenshot-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);
    z-index: 999999;
    cursor: crosshair;
    user-select: none;
  `;
  
  document.body.appendChild(overlay);
  
  // Add event listeners
  overlay.addEventListener('mousedown', startSelection);
  overlay.addEventListener('mousemove', updateSelection);
  overlay.addEventListener('mouseup', endSelection);
  overlay.addEventListener('keydown', handleKeyDown);
  
  // Make overlay focusable for keyboard events
  overlay.tabIndex = 0;
  overlay.focus();
}

// Start selection
function startSelection(e) {
  if (!isScreenshotMode) return;
  
  isDrawing = true;
  startX = e.clientX;
  startY = e.clientY;
  endX = e.clientX;
  endY = e.clientY;
  
  // Create selection rectangle
  const rect = document.createElement('div');
  rect.id = 'selection-rect';
  rect.style.cssText = `
    position: fixed;
    border: 2px solid #007bff;
    background: rgba(0, 123, 255, 0.1);
    pointer-events: none;
    z-index: 1000000;
  `;
  
  overlay.appendChild(rect);
}

// Update selection
function updateSelection(e) {
  if (!isDrawing || !isScreenshotMode) return;
  
  endX = e.clientX;
  endY = e.clientY;
  
  const rect = document.getElementById('selection-rect');
  if (rect) {
    const left = Math.min(startX, endX);
    const top = Math.min(startY, endY);
    const width = Math.abs(endX - startX);
    const height = Math.abs(endY - startY);
    
    rect.style.left = left + 'px';
    rect.style.top = top + 'px';
    rect.style.width = width + 'px';
    rect.style.height = height + 'px';
  }
}

// End selection and take screenshot
async function endSelection(e) {
  if (!isDrawing || !isScreenshotMode) return;
  
  isDrawing = false;
  
  const rect = document.getElementById('selection-rect');
  if (rect) {
    const left = Math.min(startX, endX);
    const top = Math.min(startY, endY);
    const width = Math.abs(endX - startX);
    const height = Math.abs(endY - startY);
    
    // Only proceed if selection has minimum size
    if (width > 10 && height > 10) {
      await captureAndCopyScreenshot(left, top, width, height);
    }
  }
  
  exitScreenshotMode();
}

// Handle keyboard events
function handleKeyDown(e) {
  if (e.key === 'Escape') {
    exitScreenshotMode();
  }
}

// Capture screenshot and copy to clipboard
async function captureAndCopyScreenshot(x, y, width, height) {
  try {
    // Temporarily hide the overlay and selection rectangle
    const overlay = document.getElementById('screenshot-overlay');
    const selectionRect = document.getElementById('selection-rect');
    
    if (overlay) overlay.style.display = 'none';
    if (selectionRect) selectionRect.style.display = 'none';
    
    // Small delay to ensure the overlay is hidden before capture
    await new Promise(resolve => setTimeout(resolve, 50));
    
    // Request full page screenshot from background script
    const response = await chrome.runtime.sendMessage({ action: 'captureVisibleTab' });
    
    if (response && response.dataUrl) {
      // Create image from data URL
      const img = new Image();
      img.onload = async () => {
        // Get the device pixel ratio for high-DPI displays
        const devicePixelRatio = window.devicePixelRatio || 1;
        
        // Create canvas to crop the image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size to match the selection
        canvas.width = width;
        canvas.height = height;
        
        // Scale coordinates for high-DPI displays
        const scaledX = x * devicePixelRatio;
        const scaledY = y * devicePixelRatio;
        const scaledWidth = width * devicePixelRatio;
        const scaledHeight = height * devicePixelRatio;
        
        // Draw the cropped portion with proper scaling
        ctx.drawImage(
          img, 
          scaledX, scaledY, scaledWidth, scaledHeight,  // Source rectangle (scaled)
          0, 0, width, height  // Destination rectangle (original size)
        );
        
        // Convert to blob and copy to clipboard
        canvas.toBlob(async (blob) => {
          try {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob })
            ]);
            
            // Show success notification
            showNotification('Screenshot copied to clipboard!', 'success');
            
            // Automatically navigate to Google Images and trigger search
            setTimeout(() => {
              navigateToGoogleImages();
            }, 1000); // Wait 1 second for clipboard to be ready
            
          } catch (error) {
            console.error('Failed to copy to clipboard:', error);
            showNotification('Failed to copy to clipboard', 'error');
          }
        }, 'image/png');
      };
      
      img.src = response.dataUrl;
    }
  } catch (error) {
    console.error('Screenshot capture failed:', error);
    showNotification('Screenshot capture failed', 'error');
  }
}

// Navigate to Google Images and trigger search
function navigateToGoogleImages() {
  // Check if we're already on Google Images
  if (window.location.hostname === 'images.google.com') {
    // We're already on Google Images, just trigger the search
    triggerGoogleImageSearch();
  } else {
    // Navigate to Google Images
    window.location.href = 'https://images.google.com';
    
    // Wait for page to load, then trigger search
    setTimeout(() => {
      triggerGoogleImageSearch();
    }, 2000);
  }
}

// Trigger Google Image search
function triggerGoogleImageSearch() {
  // Wait a bit for the page to fully load
  setTimeout(() => {
    try {
      // Check if we're on Google Images page
      const isGoogleImages = window.location.hostname === 'images.google.com' || 
                           window.location.href.includes('images.google.com') ||
                           document.querySelector('div[aria-label="Search by image"]');
      
      if (isGoogleImages) {
        // Simple and direct approach - only click if button exists
        const searchButton = document.querySelector('div[aria-label="Search by image"]');
        if (searchButton) {
          searchButton.click();
          
          // Wait for the upload dialog to appear, then trigger paste
          setTimeout(() => {
            // Look for the file input or paste area
            const fileInput = document.querySelector('input[type="file"]') ||
                             document.querySelector('input[accept*="image"]');
            
            if (fileInput) {
              // Focus the input and trigger paste
              fileInput.focus();
              document.execCommand('paste');
            } else {
              // Try to trigger paste on the document
              document.execCommand('paste');
            }
          }, 500);
          
          showNotification('Opening Google Image search...', 'success');
        } else {
          showNotification('Search by image button not found', 'error');
        }
      } else {
        showNotification('Not on Google Images page', 'error');
      }
    } catch (error) {
      console.error('Failed to trigger Google Image search:', error);
      showNotification('Screenshot copied! Please paste manually in Google Images', 'success');
    }
  }, 1000);
}

// Show notification
function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 20px;
    background: ${type === 'success' ? '#28a745' : '#dc3545'};
    color: white;
    border-radius: 4px;
    z-index: 1000001;
    font-family: Arial, sans-serif;
    font-size: 14px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.3);
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Remove notification after 3 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 3000);
}

// Exit screenshot mode
function exitScreenshotMode() {
  isScreenshotMode = false;
  
  if (overlay) {
    overlay.remove();
    overlay = null;
  }
  
  // Remove any selection rectangle
  const rect = document.getElementById('selection-rect');
  if (rect) {
    rect.remove();
  }
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'startScreenshot') {
    isScreenshotMode = true;
    createOverlay();
  }
});
