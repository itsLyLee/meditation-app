const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    //Sounds
    const sounds = document.querySelectorAll('.sound-picker button');
    //Time Display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');
    //Get the length of the outline
    const outlineLength = outline.getTotalLength();
    //Duration
    let fakeDuration = 600;

        outline.style.strokeDasharray = outlineLength;
        outline.style.strokeDashoffset = outlineLength;


    //Play sound
    play.addEventListener('click', () =>{
        checkPlaying(song);
    });

    //Select sound
    timeSelect.forEach(option => {
        option.addEventListener('click', function (){
            fakeDuration = this.getAttribute('data-time');
        })
    })

    //A function specific to stop and play the sound
    const checkPlaying = song =>{
        if(song.paused){
        song.play();
        video.play();
        play.src = './svg/pause.svg';
        }else{
            song.pause();
            video.pause();
            play.src = './svg/play.svg';
        }
    
    };
    //Animated circle
    song.ontimeupdate = ()=> {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

    //Circle
    let progress = outlineLength - (currentTime / fakeDuration * outlineLength);
    outline.style.strokeDashoffset = progress;

    //Animated text
    timeDisplay.textContent = '${minutes}:${seconds}'
    }
};

app();