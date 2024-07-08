function checkUrl() {
    const url = document.getElementById('url').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = 'Checking...';

    fetch('/check_url', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: url })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'legitimate') {
            resultDiv.innerHTML = `<p class="legitimate">Legitimate URL</p>`;
        } else {
            resultDiv.innerHTML = `<p class="phishing">Phishing URL</p>`;
        }
        const explanations = data.explanation.map(exp => `<li>${exp}</li>`).join('');
        resultDiv.innerHTML += `<ul>${explanations}</ul>`;
    })
    .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = '<p class="phishing">An error occurred. Please try again.</p>';
    });
}