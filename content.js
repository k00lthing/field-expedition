console.log("Hello from content.js");

// Receive message from the background script
chrome.runtime.onMessage.addListener(gotMessage);

// If Message is received, check if it is active
function gotMessage(message) {

  if (message.isActive) {
    var mouseX, mouseY, distance;
    // Create a tooltip element
    const tooltip = document.createElement('div');
    tooltip.id = 'tooltip';
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
    tooltipContent.id = 'tooltipContent';
    tooltipContent.style.position = 'absolute';
    tooltipContent.style.backgroundColor = 'whitesmoke';
    tooltipContent.style.color = 'red';
    tooltipContent.style.padding = '5px';
    tooltipContent.style.fontSize = '12px';
    tooltipContent.style.borderRadius = '5px';
    document.body.appendChild(tooltipContent);

    var elements = [];

    elements = Array.from(document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"]), img, svg, p, h1, h2, h3, h4, h5, h6, ol, ul, pre, table, blockquote, dd, figcaption, abbr, b, bdi, bdo, cite, code, data,  dfn, em, i, mark, q, strong, s, u, sub, sup, time, area, audio, map, video, iframe, object, embed, portal, canvas, caption, label, legend, progress, datalist, option'));

    elements.forEach(element => {
      element.style.setProperty("filter", "blur(10px)");
      element.style.setProperty("transition", "filter 0.25s ease-in");
    })


    document.onmousemove = function (e) {
      mouseX = e.pageX;
      mouseY = e.pageY;

      elements.forEach(element => {
        distance = calculateDistance(element, mouseX, mouseY);

        console.log(`element: ${element.tagName}, distance: ${distance}`);

        const maxBlur = 10;
        const minBlur = 0;
        // Calculate the maximum possible distance from the center of the element to any point on the screen
      const maxDistance = Math.sqrt(window.innerWidth * window.innerWidth + window.innerHeight * window.innerHeight);
      const minDistance = 10;

      if (distance > maxDistance) {
        blurValue = maxBlur;
      } else if (distance < minDistance) {
        blurValue = minBlur;
      } else {
        blurValue = maxBlur * (distance / maxDistance);
      }
      element.style.setProperty("filter", `blur(${blurValue}px)`);
      });

    }
  }


  function updateTooltip() {
    tooltip.style.left = (mouseX - 25) + 'px';
    tooltip.style.top = (mouseY - 25) + 'px';
    tooltipContent.style.left = (mouseX + 30) + 'px';
    tooltipContent.style.top = (mouseY + 30) + 'px';
    tooltipContent.innerHTML = `Field area: ${document.body.scrollWidth}px ✕ ${document.body.scrollHeight}px<br> Current X: ${mouseX}px, Y: ${mouseY}px.`;
    requestAnimationFrame(updateTooltip);
  }

  requestAnimationFrame(updateTooltip);
}

function calculateDistance(elem, mouseX, mouseY) {
  const rect = elem.getBoundingClientRect();
  const elemX = rect.left + window.scrollX + (rect.width / 2);
  const elemY = rect.top + window.scrollY + (rect.height / 2);
  const deltaX = mouseX - elemX;
  const deltaY = mouseY - elemY;
  return Math.floor(Math.sqrt(deltaX * deltaX + deltaY * deltaY));
}



