
const siteSelectors = {
    "www.amazon.in": {
        productName: "#productTitle",
        productPrice: ".a-price-whole",
        productImage: ".imgTagWrapper img",
        imageSrcAttr: "src",
        imageFallbackAttr: "data-old-hires"
    }
}
const currentHostname = window.location.hostname;
const selectors = siteSelectors[currentHostname];
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getProductDetails") {
        if (selectors) {
            
            setTimeout(() => {
                let productName = document.querySelector(selectors.productName)?.textContent.trim();
                let productPrice = document.querySelector(selectors.productPrice)?.textContent.trim();
                let productImage = document.querySelector(selectors.productImage)?.getAttribute(selectors.imageSrcAttr) || 
                                  document.querySelector(selectors.productImage)?.getAttribute(selectors.imageFallbackAttr);
                sendResponse({
                    productName: productName,
                    productPrice: productPrice,
                    productImage: productImage
                });
            }, 3000);
        } else {
            sendResponse({ error: "not support" });
        }
    }
    return true;
});
