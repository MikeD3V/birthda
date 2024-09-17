function blowOutCandle() {
    console.log("Happy birthday Winit!");

    // Stop the flame animation
    const flames = document.querySelectorAll('.fuego');
    flames.forEach(flame => {
        flame.style.animation = 'none';  // Stop the flame animation
        flame.style.opacity = 0;         // Make the flames disappear
    });

    // Play the birthday song
    const audio = document.getElementById('birthday-song');
    audio.play();

    // Start confetti effect
    const duration = 5000; // Duration of confetti (in milliseconds)
    const endTime = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 100, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    function emitConfetti() {
        const timeLeft = endTime - Date.now();

        if (timeLeft <= 0) {
            return;
        }

        const particleCount = 50; // Fixed particle count per interval

        // Generate confetti
        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            })
        );
        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            })
        );

        // Schedule next confetti emission
        setTimeout(emitConfetti, 100); // Adjust timeout for frequency
    }

    emitConfetti(); // Start the emission
}
