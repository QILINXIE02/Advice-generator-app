document.getElementById('getAdviceBtn').addEventListener('click', fetchAdvice);
document.getElementById('getJokeBtn').addEventListener('click', fetchJoke);

function fetchAdvice() {
    fetch('https://api.adviceslip.com/advice')
        .then(response => response.json())
        .then(data => {
            document.getElementById('output').innerText = data.slip.advice;
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
            document.getElementById('output').innerText = `${data.setup} - ${data.punchline}`;
        })
        .catch(error => {
            console.error('Error fetching joke:', error);
            document.getElementById('output').innerText = 'Failed to get a joke. Please try again later.';
        });
}
