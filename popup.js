document.addEventListener('DOMContentLoaded', function() {
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const tab = tabs[0];
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            func: extractProductInfo
        }, (results) => {
            if (results && results[0]) {
                const { title, price, image } = results[0].result;
                document.getElementById('product-name').textContent = title || 'N/A';
                document.getElementById('product-price').textContent = price || 'N/A';
                document.getElementById('product-image').src = image || '';
            }
        });
    });
 });
 
 function extractProductInfo() {
    const title = document.getElementById('productTitle')?.innerText; 
    const price = document.getElementsByClassName('a-price-whole')[0]?.innerText; 
    const image = document.querySelector('.imgTagWrapper img')?.src;
 
    return { title, price, image };
 }

