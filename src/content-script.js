// Example: Log a message when the extension runs on a Twitter page
console.log("This is the Twitter Extension.");
const initSvelte = () => {
  var div = document.createElement("div");
  document.body.appendChild(div);

  div.setAttribute('id', 'bookmarksPro')

  // document.body.appendChild(document.createElement('script')).src = './assets/index-63ec5bb8.js'
}

// Your extension's functionality goes here
// ...
function isTweetPage() {
  const urlPattern = /^https?:\/\/twitter.com\/[^/]+\/status\/\d+/;
  console.log('is it', urlPattern.test(window.location.href))
  return urlPattern.test(window.location.href);
}

function attachBookmarkButtonListener() {
  const bookmarkButton = document.querySelector('[data-testid=bookmark]');
  if (bookmarkButton) {
    bookmarkButton.addEventListener('click', handleBookmarkButtonClick);
  }
}

// Function to remove event listener from the bookmark button
function removeBookmarkButtonListener() {
  const bookmarkButton = document.querySelector('[data-testid=bookmark]');
  if (bookmarkButton) {
    bookmarkButton.removeEventListener('click', handleBookmarkButtonClick);
  }
}

// Function to handle the bookmark button click event
function handleBookmarkButtonClick(event) {
  // Capture necessary tweet data here
  // ...

  // Send the tweet data to the background script
  console.log(document.querySelector('[data-testid=tweet]'))
}

// function handlePageNavigation() {
//   // Check if the current URL matches the format where the bookmark button should be attached
//   console.log(isTweetPage(), 'hello ')
//   if (isTweetPage()) {

//   } else {
//     removeBookmarkButtonListener();
//   }
// }

// // Attach the page navigation event listener
// window.addEventListener('hashchange', handlePageNavigation);

// Initial setup when the content script is injected
// handlePageNavigation();

const checkIfIsTweetPage = setInterval(() => {
  if (isTweetPage()) {
    console.log('yeeeees')
    let bookmarkButton = document.querySelector('[data-testid=bookmark]');
    if (bookmarkButton) {
      console.log(bookmarkButton)
      attachBookmarkButtonListener();
      clearInterval(checkIfIsTweetPage)
    }
    // let myInterval = setInterval(() => {
    //   clearInterval(myInterval)
    // }, 500)
    // clearInterval(checkIfIsTweetPage)
  } else {
    console.log('not yet')
    removeBookmarkButtonListener();
  }
}, 500)

function cloneElementWithNodes(originalElement) {
  const clonedElement = originalElement.cloneNode(false); // Clone the element without its children
  clonedElement.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default behavior of the anchor tag
    console.log('bookmarksPro clicked')
    // Perform any custom actions or logic here
  });
  // Clone and append each child node (including nodes of nodes)
  for (let i = 0; i < originalElement.childNodes.length; i++) {
    const childNode = originalElement.childNodes[i];

    if (childNode.nodeType === Node.TEXT_NODE) {
      // Clone text nodes
      if (childNode.nodeValue === 'Bookmarks') {
        const clonedText = document.createTextNode('Bookmarks Pro');
        clonedElement.appendChild(clonedText);
      }
    } else if (childNode.nodeType === Node.ELEMENT_NODE) {
      // Clone element nodes
      if (childNode.tagName.toLowerCase() === 'svg') {
        // Replace the SVG element with another SVG
        const clonedSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const originalSvgClasses = childNode.getAttribute('class');
        if (originalSvgClasses) {
          clonedSvg.setAttribute('class', originalSvgClasses);
        }

        // Create an SVG element with the content of the SVG file
        const svgContent = `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="7" y="4.66667" width="15.1667" height="19.8333" rx="2" stroke="#F9F1F1" stroke-width="2"/>
        <path d="M17.5 11.6667V9.33333" stroke="#F9F1F1" stroke-width="2" stroke-linecap="round"/>
        <path d="M4.66663 10.5H9.33329" stroke="#F9F1F1" stroke-width="2" stroke-linecap="round"/>
        <path d="M4.66663 15.1667H9.33329" stroke="#F9F1F1" stroke-width="2" stroke-linecap="round"/>
        <path d="M4.66663 19.8333H9.33329" stroke="#F9F1F1" stroke-width="2" stroke-linecap="round"/>
        </svg>`; // Replace '...' with the actual content of the SVG file
        clonedSvg.innerHTML = svgContent; // Insert the SVG content into the cloned SVG element

        clonedElement.appendChild(clonedSvg);
      } else {
        // Clone regular element nodes
        const clonedChild = cloneElementWithNodes(childNode); // Recursively clone child element
        const importedNode = document.importNode(clonedChild, true); // Import the cloned child element
        clonedElement.appendChild(importedNode);
      }
    }
  }

  return clonedElement;
}

const addBookmarksPro = setInterval(() => {

  let nativeBookmarkButton = document.querySelector("a[href='/i/bookmarks']")
  // let nativeBookmarkButtonStyles = window.getComputedStyle(nativeBookmarkButton)
  if (nativeBookmarkButton && nativeBookmarkButton.childNodes.length > 0) {
    let bookmarksPro = cloneElementWithNodes(nativeBookmarkButton)
    bookmarksPro.setAttribute('id', 'bookmarksProATag')
    var div = document.createElement("div");
    bookmarksPro.appendChild(div);
    div.setAttribute('id', 'bookmarksPro')
    console.log(bookmarksPro)
    // bookmarksPro.textContent = 'Bookmarks Pro'

    // nativeBookmarkButton.classList.forEach((className) => {
    //   bookmarksPro.classList.add(className);
    // });
    nativeBookmarkButton.parentNode.insertBefore(bookmarksPro, nativeBookmarkButton)
    clearInterval(addBookmarksPro)
  }
}, 500)




