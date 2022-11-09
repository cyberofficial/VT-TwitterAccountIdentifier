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


console.log("Service Worker Working")