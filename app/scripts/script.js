let timer = null;
let counter = 0;

function updateUsageTime() {
    document.getElementById('usage-time').innerText = `Usage Time: ${counter} seconds`;
}

function startTimer() {
    if (!timer) {
        timer = setInterval(() => {
            counter++;
            localStorage.setItem('screenRestCounter', counter);
            updateUsageTime();
            if (counter === 900) {
                alert('Time for a screen break!');
                counter = 0;
            }
        }, 1000); // Update every second
    }
}

function resetTimer() {
    clearInterval(timer);
    timer = null;
    counter = 0;
    localStorage.setItem('screenRestCounter', counter);
    updateUsageTime();
}

function fetchStoredTimer() {
    const storedCounter = localStorage.getItem('screenRestCounter');
    // Check if a stored value exists and is a valid number
    if (storedCounter !== null && !isNaN(storedCounter)) {
        counter = parseInt(storedCounter);
    }
    updateUsageTime();
}

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        fetchStoredTimer(); // Retrieve stored counter on page load/visibility
        startTimer();
    } else {
        clearInterval(timer);
        timer = null;
    }
});

document.getElementById('reset-button').addEventListener('click', resetTimer);

// Fetch stored timer on initial page load
fetchStoredTimer();
