// Function to request microphone permission first
function requestMicPermission() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        console.log("Requesting microphone permission...");

        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(function (stream) {
                console.log("Microphone access granted.");
                startBlowDetection(stream); // Start blow detection if permission is granted
            })
            .catch(function (err) {
                console.log("Microphone access denied: " + err);
            });
    } else {
        console.log("getUserMedia not supported on your browser.");
    }
}

// Function to start blow detection after permission is granted
function startBlowDetection(stream) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const microphone = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();

    microphone.connect(analyser);

    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function detectBlow() {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;

        for (let i = 0; i < bufferLength; i++) {
            sum += dataArray[i];
        }
        const averageVolume = sum / bufferLength;

        if (averageVolume > 40) {  // Threshold can be adjusted
            blowOutCandle();
        }

        requestAnimationFrame(detectBlow);
    }

    detectBlow();
}

// Function to run when the candle is blown out
function blowOutCandle() {
