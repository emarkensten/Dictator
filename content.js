// Function to replace text in text nodes
function replaceText(node) {
    if (node.nodeType === Node.TEXT_NODE) {
        let text = node.textContent;
        
        // Define regex patterns for different variations
        const patterns = [
            // Handle various title combinations
            {
                pattern: /\b(Mr\.|President|Former President|Donald|Trump|The Donald)\s*(J\.?)?\s*Trump\b/gi,
                replacement: (match) => match.charAt(0) === match.charAt(0).toUpperCase() ? 'Dictator Trump' : 'dictator trump'
            },
            // Handle standalone "Trump" references
            {
                pattern: /\b(?<!Dictator\s|Melania\s|Ivanka\s)Trump\b/g,
                replacement: 'Dictator Trump'
            }
        ];

        // Apply each replacement pattern
        patterns.forEach(({pattern, replacement}) => {
            text = text.replace(pattern, replacement);
        });

        // Only update if there were changes
        if (text !== node.textContent) {
            node.textContent = text;
            console.log('Replaced text:', text); // Debug log
        }
    } else {
        // Skip script and style elements
        if (node.tagName === 'SCRIPT' || node.tagName === 'STYLE') {
            return;
        }
        
        for (let child of node.childNodes) {
            replaceText(child);
        }
    }
}

// Log when extension starts
console.log('Trump Word Replacer extension loaded');

// Initial replacement
window.addEventListener('load', () => {
    console.log('Running initial replacement');
    replaceText(document.body);
});

// Create a MutationObserver to handle dynamically loaded content
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
                replaceText(node);
            }
        });
    });
});

// Start observing the document
observer.observe(document.body, {
    childList: true,
    subtree: true
});
  