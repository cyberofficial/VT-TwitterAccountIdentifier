try {
    function injectScript(file_path, tag) {
        var node = document.getElementsByTagName(tag)[0];
        var script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', file_path);
        node.appendChild(script);
    }
    injectScript(chrome.extension.getURL('content.js'), 'body');
} catch (ex) {}

//personal use
var debugmode = false;

console.log('%cStop!', 'color: red; font-size: 30px; font-weight: bold;');
console.log('%cAs a friendly reminder never paste stuff in here!', 'color: red; font-size: 30px; font-weight: bold;');
console.log('%cUnless you know what you are doing. Close the console.', 'color: red; font-size: 15px; font-weight: bold;');
console.log(` \n \nConsole will be cleared every few moments.\n
IF you are making a report then click the gear on the upper right of console and tick preserve log.`)

window.setInterval(function () {
	if (!debugmode) {
	console.clear();
    }
}, 30000);

window.setInterval(function () {
    if (!debugmode)
    {
        console.log('%cStop!', 'color: red; font-size: 30px; font-weight: bold;');
        console.log('%cAs a friendly reminder never paste stuff in here!', 'color: red; font-size: 30px; font-weight: bold;');
        console.log('%cUnless you know what you are doing. Close the console.', 'color: red; font-size: 15px; font-weight: bold;');
        console.log(` \n \nConsole will be cleared every few moments.\n
        IF you are making a report then click the gear on the upper right of console and tick preserve log.`)
	}
}, 30000);
