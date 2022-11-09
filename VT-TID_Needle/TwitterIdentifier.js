if (typeof init === 'undefined')
{
	const init = function ()
	{
		var debugmode = false;
		console.log('vt needle loaded');
		var icon = document.createElement('div');
		icon.innerHTML =
			`<div dir="auto"><svg  style="color: lightgreen" viewBox="0 0 24 24" aria-label="vtchecked replaceme" role="img" class="r-13v1u17 r-4qtqp9 r-yyyyoo r-1xvli5t r-9cviqr r-f9ja8p r-og9te1 r-bnwqim r-1plcrui r-lrvibr"><g><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"></path></g></svg></div>`;
		var icon2 =
			`<svg  style="color: lightgreen" viewBox="0 0 24 24" aria-label="vtchecked replaceme" role="img" class="r-13v1u17 r-4qtqp9 r-yyyyoo r-1xvli5t r-9cviqr r-f9ja8p r-og9te1 r-bnwqim r-1plcrui r-lrvibr"><g><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"></path></g></svg>`;
		// returns true if the anchor is a profile link by checking its attributes.
		function isProfileLink(a)
		{
			try
			{
				// non profile links have other attributes
				const valid = ['href', 'role', 'class', undefined];
				for (const attr of a.attributes)
				{
					if (typeof (attr) == 'function') continue;
					if (valid.includes(attr.name) == false) return false;
					// status or other type of link
					if (attr.name == 'href' && attr.value.split('/').length != 2) return false;
				}
				return true;
			}
			catch (e)
			{}
		}
		// returns true if the user screen name contained in the anchor is in the database.
		function isvtcheckedLink(a)
		{
			try
			{
				var screen_name = a.getAttribute('href').substring(1).toLowerCase();
				return vtchecked_users.includes(screen_name);
			}
			catch (e)
			{}
		}
		// adds the verified svg badge to the html element.
		function decoratevtchecked(element)
		{
			try
			{
				// skip if already decorated
				if (element.hasAttribute('vtchecked') || element.querySelectorAll('*[vtchecked]').length > 0) return;
				// this will allow us to skip it for the next iteration
				element.setAttribute('vtchecked', 'true');
				// locate the child element containing the screen name
				for (const child of element.getElementsByTagName('*'))
				{
					// find the first child containing the display name text
					if (child.childNodes.length == 1 && child.textContent.length > 0)
					{
						// add the icon
						// TODO: use better css to align element especially on profile pages
						child.innerHTML += icon.innerHTML;
						break;
					}
				}
			}
			catch (e)
			{}
		}

		function decoratevtchecked_workarround(element)
		{
			try
			{
				// skip if already decorated
				if (element.hasAttribute('vtchecked') || element.querySelectorAll('*[vtchecked]').length > 0) return;
				// this will allow us to skip it for the next iteration
				element.setAttribute('vtchecked', 'true');
				// locate the child element containing the screen name
				for (const child of element.getElementsByTagName('*'))
				{
					// find the first child containing the display name text
					if (child.childNodes.length == 1 && child.textContent.length > 0)
					{
						// add the icon
						// TODO: use better css to align element especially on profile pages
						child.outerHTML += icon2;
						break;
					}
				}
			}
			catch (e)
			{}
		}
		// returns true if the user screen name contained in the div is in the database.
		function isvtcheckedDiv(div)
		{
			try
			{
				for (const span of div.querySelectorAll('span'))
				{
					if (span.textContent.length > 0 && span.textContent[0] == '@')
					{
						var screen_name = span.textContent.substring(1).toLowerCase();
						return vtchecked_users.includes(screen_name);
					}
				}
				return false;
			}
			catch (e)
			{}
		}
		window.setInterval(function ()
		{
			var docurl = document.URL;
			docurl = docurl.split("/");
			docurl_or = docurl[3];
			docurl = docurl[3].toLowerCase();
			var errormessage = `
	-------------------------------------------------
	There was was an error
	You can use this info below and create an issue over at: https://github.com/cyberofficial/VT-TwitterAccountIdentifier/issues

	Error Message: 

	`;
			//try
			//{
			//	for (const span of document.querySelectorAll('div[role="link"] div[dir="ltr"] > span'))
			//	{
			//		if (!span.textContent.startsWith('@')) continue;
			//		if (!span.innerHTML.includes('aria-label="vtchecked retweetcard"'))
			//		{
			//			span.innerHTML = span.innerHTML + icon2.replace("replaceme", "retweetcard");
			//		}
			//	}
			//}
			//catch (ex)
			//{}
			// profile links
			try
			{
				for (const a of document.querySelectorAll(`a[role='link'], div[data-testid="cellInnerDiv"], div[tabindex]`))
				{
					// skip non profile links
					if (!isProfileLink(a)) continue;
					// add decoration if this profile is in the database
					if (isvtcheckedLink(a))
					{
						decoratevtchecked(a);
					}
				}
			}
			catch (ex)
			{
				if (debugmode)
				{
					console.warn(errormessage);
					console.warn("Error Section: Profile Links\n");
					console.warn(ex);
				}
			}
			// private messages
			try
			{
				for (const div of document.querySelectorAll('div[data-testid="conversation"]'))
				{
					var conv_div_4 = div;
					var conv_div_4_1 = conv_div_4.childNodes[0];
					var conv_div_4_1_2 = conv_div_4_1.childNodes[1];
					if (isvtcheckedDiv(conv_div_4_1_2))
					{
						decoratevtchecked(conv_div_4_1_2);
					}
				}
			}
			catch (ex)
			{
				if (debugmode)
				{
					console.warn(errormessage);
					console.warn("Error Section: Private Messages \n");
					console.warn(ex);
				}
			}
			// User Cells
			try
			{
				for (const div of document.querySelectorAll(
						'div[data-testid="UserCell"], div[data-testid="TypeaheadUser"], span[data-testid="socialContext"], div[role="link"] > div > div > div > div > div > div > div > div'))
				{
					if (isvtcheckedDiv(div))
					{
						decoratevtchecked(div);
					}
				}
			}
			catch (ex)
			{
				if (debugmode)
				{
					console.warn(errormessage);
					console.warn("Error Section: User Cells \n");
					console.warn(ex);
				}
			}
			// Main Twitter Bio
			try
			{
				try
				{
					var mainprofile_innerhtml = document.querySelector("main").querySelector('div[aria-label="Home timeline"]').lastElementChild
						.firstElementChild.querySelector('div').firstElementChild.lastElementChild.querySelector(
							'div[data-testid="UserName"] > div > div').lastElementChild.querySelector('span').innerHTML;
				}
				catch (ex)
				{
					if (debugmode)
					{
						console.warn(errormessage);
						console.warn("Error Section: Main Profile Inner HTML Error \n");
						console.warn(ex);
					}
				}
				try
				{
					var handle_or = mainprofile_innerhtml.split("@")[1].split(" ")[0];
					var handle = mainprofile_innerhtml.split("@")[1].split(" ")[0].toLowerCase();
				}
				catch (ex)
				{
					if (debugmode)
					{
						console.warn(errormessage);
						console.warn("Error Section: Main Profile Splitting Info\n");
						console.warn(ex);
					}
				}
				if (handle != docurl)
				{
					//console.log("Normal handle: " + docurl_or)
					document.querySelector("main").querySelector('div[aria-label="Home timeline"]').lastElementChild.firstElementChild
						.querySelector('div').firstElementChild.lastElementChild.querySelector('div[data-testid="UserName"] > div > div')
						.lastElementChild.querySelector('span').innerHTML = mainprofile_innerhtml.replace(handle_or, docurl_or);
				}
				// Main Twitter Bio Section 2
				try
				{
					if (!mainprofile_innerhtml.includes(`aria-label="vtchecked main profile"`))
					{
						//console.log("Icon was NOT found. Adding it now.");
						// lets check to see if the user is in the list if so add it
						if (vtchecked_users.includes(docurl) && !mainprofile_innerhtml.includes(`aria-label="vtchecked main profile"`))
						{
							//console.log("------------------- User is in the list -------------------");
							document.querySelector("main").querySelector('div[aria-label="Home timeline"]').lastElementChild.firstElementChild
								.querySelector('div').firstElementChild.lastElementChild.querySelector('div[data-testid="UserName"] > div > div')
								.lastElementChild.querySelector('span').innerHTML = mainprofile_innerhtml + ` ` + icon2.replace("replaceme",
									"main profile");
						}
					}
					else
					{
						// If the icon was found, lets double check to make sure it belongs
						if (!vtchecked_users.includes(docurl))
						{
							//console.log("------------------- User isn't in the list removing badge -------------------");
							document.querySelector("main").querySelector('div[aria-label="Home timeline"]').lastElementChild.firstElementChild
								.querySelector('div').firstElementChild.lastElementChild.querySelector('div[data-testid="UserName"] > div > div')
								.lastElementChild.querySelector('span').querySelector(`svg`).outerHTML = "";
						}
						else
						{
							if (!mainprofile_innerhtml.includes(`aria-label="vtchecked main profile"`))
							{
								//console.log("------------------- User is the list -------------------");
								document.querySelector("main").querySelector('div[aria-label="Home timeline"]').lastElementChild.firstElementChild
									.querySelector('div').firstElementChild.lastElementChild.querySelector(
										'div[data-testid="UserName"] > div > div').lastElementChild.querySelector('span').innerHTML =
									mainprofile_innerhtml + ` ` + icon2.replace("replaceme", "main profile");
							}
						}
					}
					//console.log("Found Profile Handle: " + handle);
				}
				catch (ex)
				{
					if (debugmode)
					{
						console.warn(errormessage);
						console.warn("Error Section: Main Twitter Bio Section 2\n");
						console.warn(ex);
					}
				}
			}
			catch (ex)
			{
				if (debugmode)
				{
					console.warn(errormessage);
					console.warn("Error Section: Main Twitter Bio Section  1\n");
					console.warn(ex);
				}
			}
			// Check all @s
			try
			{
				for (const a of document.querySelectorAll(`div[tabindex="-1"]`))
				{
					try
					{
						var b = a.querySelector('span').innerHTML.replace("@", "");
						//console.log(b.toLowerCase());
						if (vtchecked_users.includes(b.toLowerCase()))
						{
							//console.log("Member found in database.");
							if (!a.innerHTML.includes(`aria-label="vtchecked tabindex"`) && !b == docurl)
							{
								decoratevtchecked_workarround(a);
							}
						}
					}
					catch (ex)
					{
						break;
					}
				}
			}
			catch (ex)
			{
				if (debugmode)
				{
					console.warn(errormessage);
					console.warn("Error Section: Checking for @s Section Whole\n");
					console.warn(ex);
				}
			}
		}, 300)
	}
	init();
}