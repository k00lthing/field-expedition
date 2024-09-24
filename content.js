console.log("Hello from content.js");

// Receive message from the background script
chrome.runtime.onMessage.addListener(gotMessage);

// If Message is received, check if it is active
function gotMessage(message, sender, sendResponse) {
  let summary = {};

  if (message.isActive) {
    var mouseX, mouseY, distance;
    var element = document.body.querySelector("h1")
    element.style.setProperty("filter", "blur(10px)");

    document.onmousemove = function(e) {
      mouseX = e.pageX;
      mouseY = e.pageY;

        distance = calculateDistance(element, mouseX, mouseY);
        if(distance > 10)
        	console.log(distance + "px");
        else {
         element.style.setProperty("filter", "blur(0)");
        }
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

