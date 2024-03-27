"use strict";

// To add more song, just copy the following code and paste inside the array

//   {
//     name: "Here is the music name",
//     artist: "Here is the artist name",
//     img: "image name here - remember img must be in .jpg formate and it's inside the images folder of this project folder",
//     src: "music name here - remember img must be in .mp3 formate and it's inside the songs folder of this project folder"
//   }

//paste it inside the array as more as you want music then you don't need to do any other thing

let allMusic = [
  {
    name: "Harley Bird - Home",
    artist: "Jordan Schor",
    img: "music-1",
    src: "music-1",
  },
  {
    name: "Ikson Anywhere – Ikson",
    artist: "Audio Library",
    img: "music-2",
    src: "music-2",
  },
  {
    name: "Beauz & Jvna - Crazy",
    artist: "Beauz & Jvna",
    img: "music-3",
    src: "music-3",
  },
  {
    name: "Hardwind - Want Me",
    artist: "Mike Archangelo",
    img: "music-4",
    src: "music-4",
  },
  {
    name: "Jim - Sun Goes Down",
    artist: "Jim Yosef x Roy",
    img: "music-5",
    src: "music-5",
  },
  {
    name: "Lost Sky - Vision NCS",
    artist: "NCS Release",
    img: "music-6",
    src: "music-6",
  },
  // like this paste it and remember to give comma after ending of this bracket }
  // {
  //   name: "Here is the music name",
  //   artist: "Here is the artist name",
  //   img: "image name here - remember img must be in .jpg formate and it's inside the images folder of this project folder",
  //   src: "music name here - remember img must be in .mp3 formate and it's inside the songs folder of this project folder"
  // }
];

const wrapper = document.querySelector(".wrapper");
const musicImg = wrapper.querySelector(".img-area img");
const musicName = wrapper.querySelector(".song-details .name");
const musicArtist = wrapper.querySelector(".song-details .artist");
const mainAudio = wrapper.querySelector("#main-audio");
const playPauseBtn = wrapper.querySelector(".play-pause");
const playPauseEl = wrapper.querySelector(".play-pause i");
const prevBtn = wrapper.querySelector("#prev");
const nextBtn = wrapper.querySelector("#next");
const progressBar = wrapper.querySelector(".progress-bar");
const progressArea = wrapper.querySelector(".progress-area");
const musicList = wrapper.querySelector(".music-list");
const showMoreBtn = wrapper.querySelector("#more-music");
const hideMusicBtn = wrapper.querySelector("#close");
const ulElListMusic = wrapper.querySelector(".music-list ul");
let check = true;

let musicIndex = 1;

window.addEventListener("load", () => {
  loadMusic(musicIndex); //calling load music function once window
});

// load music function
function loadMusic(indexNumb) {
  musicName.innerText = allMusic[indexNumb - 1].name;
  musicArtist.innerText = allMusic[indexNumb - 1].artist;
  musicImg.src = `./assets/images/${allMusic[indexNumb - 1].img}.jpg`;
  mainAudio.src = `./assets/songs/${allMusic[indexNumb - 1].src}.mp3`;
}

// play music function
function playMusic() {
  mainAudio.play();
  playPauseEl.innerHTML = "pause";
}

// pause music function
function pauseMusic() {
  mainAudio.pause();
  playPauseEl.innerHTML = "play_arrow";
}

// Play or pause music button event
playPauseBtn.addEventListener("click", () => {
  check === true ? playMusic() : pauseMusic();
  check = check ? false : true;
});

// next music function
function nextMusic() {
  musicIndex === allMusic.length ? (musicIndex = 1) : musicIndex++;
  loadMusic(musicIndex);
  playMusic();
  check = false;
}

// prev music function
function prevMusic() {
  musicIndex === 1 ? (musicIndex = allMusic.length) : musicIndex--;
  loadMusic(musicIndex);
  playMusic();
  check = false;
}

// Next song music button event
nextBtn.addEventListener("click", function () {
  nextMusic();
});

// Prev song music button event
prevBtn.addEventListener("click", function () {
  prevMusic();
});

// Update progress bar width according to music current time
mainAudio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime; //getting current time of song
  const durationTime = e.target.duration; //getting current time of song
  let progressWidth = (currentTime / durationTime) * 100;
  progressBar.style.width = `${progressWidth}%`;

  // Update current time
  let current = wrapper.querySelector(".current");
  let minute = Math.trunc(currentTime / 60);
  let second = Math.trunc(currentTime - minute * 60);
  current.innerText = `${minute >= 10 ? minute : `0${minute}`}:${
    second >= 10 ? second : `0${second}`
  }`;

  // Update duration time
  mainAudio.addEventListener("loadeddata", function () {
    let duration = wrapper.querySelector(".duration");
    let audioDuration = this.duration;
    duration.innerText = `${
      Math.trunc(audioDuration / 60) >= 10
        ? Math.trunc(audioDuration / 60)
        : `0${Math.trunc(audioDuration / 60)}`
    }:${
      Math.trunc(audioDuration % 60) >= 10
        ? Math.trunc(audioDuration % 60)
        : `0${Math.trunc(audioDuration % 60)}`
    }`;
  });
});

// Random song

// Let's update playing song current time according to the progress bar width

progressArea.addEventListener("click", (e) => {
  let progressWidthVal = progressArea.clientWidth; //getting width of progress bar
  let clickedOffSetX = e.offsetX; //getting offset x value
  let songDuration = mainAudio.duration; //getting song total duration
  mainAudio.currentTime = (clickedOffSetX / progressWidthVal) * songDuration;
  playMusic();
});

// Let's work on repeat, shuffle song according to the icon

const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", function () {
  // First we get the innerText of the icon then we'll change accordingly
  let getText = repeatBtn.innerText;
  // let's go different changes on different icon click using switch
  switch (getText) {
    case "repeat": //if this icon is repeat
      repeatBtn.innerText = "repeat_one";
      repeatBtn.setAttribute("title", "Song looped");
      break;
    case "repeat_one": //if icon icon is repeat_one then change it to shuffle
      repeatBtn.innerText = "shuffle";
      repeatBtn.setAttribute("title", "Playback shuffle");
      break;
    case "shuffle": //if icon icon is shuffle then change it to repeat
      repeatBtn.innerText = "repeat";
      repeatBtn.setAttribute("title", "Playlist looped");
      break;
  }
});

// above we just changed the icon, now let's work on what to do
// after the song ended

mainAudio.addEventListener("ended", () => {
  // we'll do according to the icon means if user has set icon to loop then we'll repeat
  // the current song and will do further accordingly
  let getText = repeatBtn.innerText;
  switch (getText) {
    case "repeat": //if this icon is repeat then simply we call nextMusic function so th next song will play
      nextMusic();
      break;
    case "repeat_one": //if icon icon is repeat_one then we'll change the current playing song current time to 0 so song play
      mainAudio.currentTime = 0;
      loadMusic(musicIndex);
      playMusic();
      break;
    case "shuffle": //if icon icon is shuffle then change it to repeat
      // generating random index between the max range of array length
      let randomIndex = Math.trunc(Math.random() * allMusic.length + 1);
      //   do {
      //     musicIndex = Math.trunc(Math.random() * allMusic.length + 1);
      //   } while ((musicIndex = randomIndex)); //this loop run until the next random number won't be the same of current musicIndex
      musicIndex = randomIndex; //passing randomIndex to musicIndex
      loadMusic(musicIndex); //call loadMusic function
      playMusic(); //call playMusic function
      break;
  }
});

// Show Music list
showMoreBtn.addEventListener("click", () => {
  musicList.classList.add("show");
});

hideMusicBtn.addEventListener("click", () => {
  musicList.classList.remove("show");
});

// Render Music list

for (let i = 0; i < allMusic.length; i++) {
  let html = `
        <li data-index=${i + 1}>
            <div class="row">
            <span>${allMusic[i].name}</span>
            <p>${allMusic[i].artist}</p>
            </div>
            <audio src="./assets/songs/${allMusic[i].src}.mp3" class="${
    allMusic[i].src
  }"></audio>
            <span class="audio-duration" id="${allMusic[i].src}">3:40</span>
        </li>
    `;
  ulElListMusic.insertAdjacentHTML("beforeend", html);

  let liAudioDuration = ulElListMusic.querySelector(`#${allMusic[i].src}`);
  let liAudioTag = ulElListMusic.querySelector(`.${allMusic[i].src}`);

  liAudioTag.addEventListener("loadeddata", () => {
    let audioDuration = liAudioTag.duration;
    liAudioDuration.innerText = `${
      Math.trunc(audioDuration / 60) >= 10
        ? Math.trunc(audioDuration / 60)
        : `0${Math.trunc(audioDuration / 60)}`
    }:${
      Math.trunc(audioDuration % 60) >= 10
        ? Math.trunc(audioDuration % 60)
        : `0${Math.trunc(audioDuration % 60)}`
    }`;
  });
}

// Let's work onplay particular song on click

const allLiTag = ulElListMusic.querySelectorAll("li");
for (let i = 0; i < allLiTag.length; i++) {
  if (allLiTag[i].getAttribute("data-index") == musicIndex) {
    allLiTag[i].classList.add("playing");
  }

  allLiTag[i].setAttribute("onclick", "clicked(this)");
}

function clicked(element) {
  let getIndex = element.getAttribute("data-index");
  musicIndex = getIndex;
  loadMusic(musicIndex);
  playMusic();

  for (let i = 0; i < allLiTag.length; i++) {
    if (allLiTag[i].getAttribute("data-index") == musicIndex) {
      allLiTag[i].classList.add("playing");
    } else {
      allLiTag[i].classList.remove("playing");
    }
  }
}
