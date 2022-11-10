//try {
//
//    //On page change
//    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//        if(changeInfo.status == 'complete'){
//            chrome.scripting.executeScript({
//                files: ['TwitterIdentifier.js'],
//                target: {tabID: tab.id}
//            });
//        }
//    });
//} catch(e){
//    console.log(e);
//}

var testvar = "test!";


try {
    // This is the background script for the extension
  
    // A listener for when the user clicks on the extension button
    //   chrome.action.onClicked.addListener(buttonClicked);
  
    chrome.action.onClicked.addListener(buttonClicked);
  
    // Handle that click
    function buttonClicked(tab) {
      // Send a message to the active tab
      console.log("button clicked!");
  
      // Send a message to the tab that is open when button was clicked
      console.log("sending message");
      chrome.tabs.sendMessage(tab.id, { message: "browser action" });
    }
  
    // Listening for messages
    chrome.runtime.onMessage.addListener(receiver);
  
    function receiver(request, sender, sendResponse) {
      if (request.message === "thank you") {
        // Not doing anything for messages received but I could!
      }
    }
  } catch (err) {
    console.log(err);
  }


console.log("Service Worker Working")