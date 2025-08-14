document.addEventListener('DOMContentLoaded', function() {
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;
    
    // Try to autoplay (may be blocked by browser)
    bgMusic.volume = 0.5;
    const playPromise = bgMusic.play();
    
    if (playPromise !== undefined) {
        playPromise.then(_ => {
            isPlaying = true;
            musicToggle.innerHTML = '<i class="fas fa-pause"></i> Pause Music';
        })
        .catch(error => {
            isPlaying = false;
            musicToggle.innerHTML = '<i class="fas fa-music"></i> Play Music';
        });
    }
    
    musicToggle.addEventListener('click', function() {
        if (isPlaying) {
            bgMusic.pause();
            musicToggle.innerHTML = '<i class="fas fa-music"></i> Play Music';
        } else {
            bgMusic.play();
            musicToggle.innerHTML = '<i class="fas fa-pause"></i> Pause Music';
        }
        isPlaying = !isPlaying;
    });
});