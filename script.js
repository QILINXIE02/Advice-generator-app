document.getElementById('getAdviceBtn').addEventListener('click', fetchAdvice);

function fetchAdvice() {
    fetch('https://api.adviceslip.com/advice')
        .then(response => response.json())
        .then(data => {
            document.getElementById('advice').innerText = data.slip.advice;
        })
        .catch(error => {
            console.error('Error fetching advice:', error);
            document.getElementById('advice').innerText = 'Failed to get advice. Please try again later.';
        });
}
