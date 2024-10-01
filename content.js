console.log("Hello from content.js");

// Receive message from the background script
chrome.runtime.onMessage.addListener(gotMessage);

// If Message is received, check if it is active
function gotMessage(message, sender, sendResponse) {
  let summary = {};

  if (message.isActive) {
    var mouseX, mouseY, distance;
    // Create a tooltip element
    const tooltip = document.createElement('div');
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = 'transparent';
    tooltip.style.border = '1px solid red';
    tooltip.style.padding = '5px';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.zIndex = '99999999999999';
    tooltip.style.borderRadius = '50%';
    tooltip.style.width = '50px';
    tooltip.style.height = '50px';
    tooltip.style.display = 'flex';
    tooltip.style.alignItems = 'center';
    tooltip.style.justifyContent = 'center';
    document.body.appendChild(tooltip);

    const tooltipContent = document.createElement('div');
    tooltipContent.style.position = 'absolute';
    tooltipContent.style.backgroundColor = 'transparent';
    tooltipContent.style.color = 'red';
    tooltipContent.style.fontSize = '.5rem';
    document.body.appendChild(tooltipContent);

    function updateTooltip() {
      tooltip.style.left = (mouseX - 25) + 'px';
      tooltip.style.top = (mouseY - 25) + 'px';
      tooltipContent.style.left = (mouseX + 25) + 'px';
      tooltipContent.style.top = (mouseY+ 25) + 'px';
      tooltipContent.innerHTML = `X: ${mouseX}px, Y: ${mouseY}px. <br>
     ${document.body.scrollWidth}px ✕ ${document.body.scrollHeight}px`;
      requestAnimationFrame(updateTooltip);
    }

    requestAnimationFrame(updateTooltip);

    var elements = [];

    elements = Array.from(document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"]), img, p, h1, h2, h3, h4, h5, h6, ol, ul, li'));

    elements.forEach(element => {
      element.style.setProperty("filter", "blur(5px)");
    })


    document.onmousemove = function(e) {
      mouseX = e.pageX;
      mouseY = e.pageY;

      elements.forEach(element => {
        distance = calculateDistance(element, mouseX, mouseY);
        if (distance > 10) {
        
        } else {
          element.style.setProperty("filter", "blur(0)");
        }
      });
    }
  }
}
function calculateDistance(elem, mouseX, mouseY) {
  const rect = elem.getBoundingClientRect();
  const elemX = rect.left + (rect.width / 2);
  const elemY = rect.top + (rect.height / 2);
  const deltaX = mouseX - elemX;
  const deltaY = mouseY - elemY;
  return Math.floor(Math.sqrt(deltaX * deltaX + deltaY * deltaY));
}


