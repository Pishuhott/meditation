document.addEventListener("DOMContentLoaded", function () {
    const doc = document,
        song = doc.querySelector('.song'),
        play = doc.querySelector('.play'),
        replay = doc.querySelector('.replay'),
        outline = doc.querySelector('.moving-outline circle'),
        video = doc.querySelector('.video-container video'),
        sounds = doc.querySelectorAll('.sound-picker button'),
        timeDisplay = doc.querySelector('.time-display'),
        timeSelect = doc.querySelectorAll('.time-select button'),
        outlineLength = outline.getTotalLength();

    let fackeDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

        // Pick different sounds
    sounds.forEach(sound => {
        sound.addEventListener('click', function () {
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaing(song);
        });
    });

        // Create a function specific to stop and play yhe sounds
    const checkPlaing = (song) => {
        if (song.paused) {
            song.play();
            video.play();
            play.src = './img/pause.svg';
        } else {
            song.pause();
            video.pause();
            play.src = "./img/play.svg";
        };
    };

        // Play soud
    play.addEventListener('click', () => {
        checkPlaing(song);
    });

    replay.addEventListener("click", () => {
        restartSong(song);
    });

    restartSong = song => {
        let currentTime = song.currentTime;
        song.currentTime = 0;
    };

        // Add Zero animate the time
    addZero = (n) => {
        return (parseInt(n, 10) < 10 ? '0' : '') + n;
    };

        // Slect sound
    timeSelect.forEach(option => {
        option.addEventListener('click', function () {
            fackeDuration = this.getAttribute('data-time');
            timeDisplay.textContent = `${addZero(Math.floor(fackeDuration / 60))}:${addZero(Math.floor(fackeDuration % 60))}`;
        });
    });

        // We can animated the circle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime,
            elapsed = fackeDuration - currentTime,
            sec = Math.floor(elapsed % 60),
            min = Math.floor(elapsed / 60),

            // Animate the crircle
            progress = outlineLength - (currentTime / fackeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

            // Animate the time
        timeDisplay.textContent = `${addZero(min)}:${addZero(sec)}`;

        if (currentTime >= fackeDuration) {
            song.pause();
            video.pause();
            song.currentTime = 0;
            play.src = './img/play.svg';
        }
    };
});
