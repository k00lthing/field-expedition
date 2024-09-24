console.log("Hello from background.js");
// Send message to the content script
chrome.action.onClicked.addListener(extensionActivated);


function extensionActivated(tab) {
  console.log("Extension activated on tab with id: " + tab.id);

  let message = { 
	message: "Hello from your friendly service worker",
	isActive: true
 };
  chrome.tabs.sendMessage(tab.id, message);

}