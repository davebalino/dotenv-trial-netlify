const button = document.getElementById('know-more-button');
const hiddenDiv = document.getElementById('know-more');

button.addEventListener('click', () => {
    hiddenDiv.classList.toggle('visible-content')
    if(hiddenDiv.classList.contains('visible-content')) {
        button.innerHTML = '<div class="arrow-up"></div>';
    } else {
        button.innerHTML = '<div class="arrow-down"></div>';
    }
});


//Video script
// Get the video elements
const videos = document.querySelectorAll(".background-video");

// Function to play the videos in sequence
function playVideosInSequence(index) {
    if (index >= videos.length) {
        // If index is greater than or equal to the number of videos, reset to the first video
        index = 0;
    }

    // Play the video at the specified index
    videos[index].play();

    // Pause the previous video (if any)
    if (index > 0) {
        videos[index - 1].pause();
    }

    // Set up the next video to play after the current video ends
    videos[index].addEventListener("ended", function () {
        playVideosInSequence(index + 1);
    });
}

// Start playing the videos from the first one
playVideosInSequence(0);