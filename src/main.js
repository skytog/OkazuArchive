// Import services
import { generateOkazu, getOkazuHistory, addOkazuToHistory, fetchOkazuList , clearOkazuHistory} from './okazuService.js';
const categorySelect = document.getElementById('category-select');

document.addEventListener('DOMContentLoaded', async (event) => {

    // Get DOM elements
    let selectedLanguage = document.getElementById('language-select').value;
    const generateBtn = document.getElementById('generate-btn');
    const okazuDisplay = document.getElementById('okazu-display');
    const historyList = document.getElementById('history-list');
    const clearHistoryBtn = document.getElementById('clear-history-btn');

    // Check if the elements exist
    if (!generateBtn || !okazuDisplay || !historyList) {
        console.error('One or more HTML elements are missing');
        return;
    }
    // Fetch okazu list
    await fetchOkazuList(categorySelect.value, selectedLanguage);

    // Event listeners
    categorySelect.addEventListener('change', async () => {
        const selectedLanguage = document.getElementById('language-select').value;
        const selectedCategory = categorySelect.value;
        await fetchOkazuList(selectedCategory, selectedLanguage);
    });

    // Event listeners
    generateBtn.addEventListener('click', () => {
        const currentOkazu = generateOkazu();
        console.log(currentOkazu);
        okazuDisplay.textContent = currentOkazu;
        addOkazuToHistory(currentOkazu);
        displayOkazuHistory();
    });

    clearHistoryBtn.addEventListener('click', () => {
        clearOkazuHistory();
        displayOkazuHistory();
    });

    // Display okazu history
    function displayOkazuHistory() {
        const history = getOkazuHistory();
        historyList.innerHTML = '';
        for (let okazu of history) {
            const li = document.createElement('li');
            li.textContent = okazu;
            historyList.appendChild(li);
        }
    }

    // Initial display
    displayOkazuHistory();
});

// Language selection
document.getElementById('language-select').addEventListener('change', function() {
    let selectedLanguage = this.value;
    fetch(`/locales/labels_${selectedLanguage}.json`)
        .then(response => response.json())
        .then(data => {
            // Update the page content based on the selected language
            document.getElementById('language-select').previousElementSibling.innerText = data["languageSelect"];
            document.getElementById('category-select').previousElementSibling.innerText = data["categorySelect"];
            document.getElementById("okazuGenerator").innerText = data["okazuGenerator"];
            document.getElementById('generate-btn').innerText = data["generateOkazuBtn"];
            document.getElementById("OkazuHistory").innerText = data["OkazuHistory"];
            document.getElementById('clear-history-btn').innerText = data["clearHistoryBtn"];
            // Update the category list
            const categorySelect = document.getElementById('category-select');
            for (let i = 0; i < categorySelect.options.length; i++) {
                let option = categorySelect.options[i];
                option.text = data["categories"][option.value];
            }
        });
    fetchOkazuList(categorySelect.value, selectedLanguage);
});