// okazuService.js

// List of okazu
let okazuList = [];

// Okazu history
let okazuHistory = [];

// Function to fetch okazu list
export async function fetchOkazuList(categories, selectedLanguage) {
    console.log(selectedLanguage);
    const response = await fetch(`/data/OkazuList_${selectedLanguage}.json`);
    const data = await response.json();

    if (categories == "all") {
        okazuList = [...data.bodyParts, ...data.playStyle, ...data.fetish];
    } else {
        okazuList = data[categories];
    }
}

// Function to generate okazu
export function generateOkazu() {
    const index = Math.floor(Math.random() * okazuList.length);
    return okazuList[index];
}

// Function to add okazu to history
export function addOkazuToHistory(okazu) {
    okazuHistory.push(okazu);
}

// Function to get okazu history
export function getOkazuHistory() {
    return [...okazuHistory]; // Return a copy of the history
}

// Function to clear okazu history
export function clearOkazuHistory() {
    okazuHistory = [];
}