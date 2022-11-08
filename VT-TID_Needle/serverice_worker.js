try {

    //On page change
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
        if(changeInfo.status == 'complete'){
            chrome.scripting.executeScript({
                files: ['TwitterIdentifier.js'],
                target: {tabID: tab.id}
            });
        }
    });
} catch(e){
    console.log(e);
}

//chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//    if (request.type == "click_event") {
//      console.log("Save Button was pressed!");
//      // Call the callback passed to chrome.action.onClicked
//    }
//});

console.log("Service Worker Working")