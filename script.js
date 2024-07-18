document.getElementById('getAdviceBtn').addEventListener('click', fetchAdvice);
document.getElementById('getJokeBtn').addEventListener('click', fetchJoke);
document.getElementById('clearFavoritesBtn').addEventListener('click', confirmClearFavorites);

document.addEventListener('DOMContentLoaded', () => {
    loadFavorites();
    loadHistory();
});

function fetchAdvice() {
    fetch('https://api.adviceslip.com/advice')
        .then(response => response.json())
        .then(data => {
            const advice = data.slip.advice;
            document.getElementById('output').innerText = advice;
            addToHistory(advice, 'advice');
        })
        .catch(error => {
            console.error('Error fetching advice:', error);
            document.getElementById('output').innerText = 'Failed to get advice. Please try again later.';
        });
}

function fetchJoke() {
    fetch('https://official-joke-api.appspot.com/random_joke')
        .then(response => response.json())
        .then(data => {
            const joke = `${data.setup} - ${data.punchline}`;
            document.getElementById('output').innerText = joke;
            addToHistory(joke, 'joke');
        })
        .catch(error => {
            console.error('Error fetching joke:', error);
            document.getElementById('output').innerText = 'Failed to get a joke. Please try again later.';
        });
}

function addToHistory(text, type) {
    const historyList = document.getElementById('historyList');
    const li = document.createElement('li');
    li.innerHTML = `${type}: ${text} <span class="heart" onclick="toggleFavorite(this, '${text.replace(/'/g, "\\'")}', '${type}')">&#10084;</span>`;
    historyList.insertBefore(li, historyList.firstChild); // Prepend new item
    saveToLocalStorage('history', { text, type });

    // Limit the history display to the last 5 items
    while (historyList.children.length > 5) {
        historyList.removeChild(historyList.lastChild);
    }
}

function toggleFavorite(element, text, type) {
    const isFavorited = element.classList.toggle('favorited');
    if (isFavorited) {
        addToFavorites(text, type);
    } else {
        removeFromFavorites(text, element);
    }
}

function addToFavorites(text, type) {
    const favoritesList = document.getElementById('favoritesList');
    const li = document.createElement('li');
    li.innerHTML = `${type}: ${text} <span class="heart favorited" onclick="toggleFavorite(this, '${text.replace(/'/g, "\\'")}', '${type}')">&#10084;</span>`;
    favoritesList.appendChild(li);
    saveToLocalStorage('favorites', { text, type });
}

function removeFromFavorites(text, element) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(item => item.text !== text);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    if (element.parentElement.parentElement.id === 'favoritesList') {
        element.parentElement.remove(); // Only remove if it's from favorites
    }
}

function saveToLocalStorage(key, data) {
    let items = JSON.parse(localStorage.getItem(key)) || [];
    items.push(data);

    // Limit the stored history to the last 5 items
    if (key === 'history' && items.length > 5) {
        items = items.slice(-5);
    }

    localStorage.setItem(key, JSON.stringify(items));
}

function loadFavorites() {
    const favoritesList = document.getElementById('favoritesList');
    favoritesList.innerHTML = ''; // Clear the current list
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `${item.type}: ${item.text} <span class="heart favorited" onclick="toggleFavorite(this, '${item.text.replace(/'/g, "\\'")}', '${item.type}')">&#10084;</span>`;
        favoritesList.appendChild(li);
    });
}

function loadHistory() {
    const historyList = document.getElementById('historyList');
    const history = JSON.parse(localStorage.getItem('history')) || [];
    history.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `${item.type}: ${item.text} <span class="heart" onclick="toggleFavorite(this, '${item.text.replace(/'/g, "\\'")}', '${item.type}')">&#10084;</span>`;
        historyList.appendChild(li);
    });
}

function confirmClearFavorites() {
    if (confirm('Are you sure you want to clear all favorites?')) {
        localStorage.removeItem('favorites');
        loadFavorites(); // Clear favorites list
    }
}
