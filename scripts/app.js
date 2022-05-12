// Elements

let bodyElement = document.querySelector("body");
let contentElement = document.querySelector(".content");
let audioCard = document.querySelector(".audio-card");
let topPart = document.querySelector(".top-part");
let backgroundImage = document.querySelector(".background-image");
let background = document.querySelector(".background");

let rangeSlider = document.querySelector(".bottom-part-slider-input");


let startButton =  document.querySelector(".bottom-part-info-start-btn");

let leftArrow = document.querySelector(".bottom-part-info-arrow-left");
let rightArrow = document.querySelector(".bottom-part-info-arrow-right");

let newMusic = new Audio();

let currentText = document.querySelector(".input-text-current");

// Data

let currentNumber = "first";
let isPlay = false;

let photo = {
  first: "img/lemonade.png",
  second: "img/dontstartnow.png"
};

let playPhoto = { 
  first: "img/play.png",
  second: "img/pause.png"
};

let musicData = {
  first: "mp3/beyonce.mp3",
  second: "mp3/dontstartnow.mp3"
};

let duration = {
  first: "3:53",
  second: "3:23"
};

let musicText =  {
  first: {
    title: "Beyonce",
    descr: `Don"t Hurt Yourself`
  },
  second: {
    title: "Dua Lipa",
    descr: `Don't Start Now`
  }
};

let sliderPosition = {
  first: {
    current: "0",
    max: "233",
    add: "1"
  }, 
  second: {
    current: "0",
    max: "203",
    add: "1"
  }
};

rangeSlider.max = sliderPosition.first.max;

let currentPlayTime = "0:00";

let changeCurrent = setInterval(() => {
  return 
}, 1000);

// Events

startButton.addEventListener("click", (event) => {
  topPart.classList.toggle("top-part-animation");
  backgroundImage.classList.toggle("background-image-animation");
  if(isPlay) {
    startButton.src = `${playPhoto.first}`;
    isPlay = !isPlay;
    stopMusic();
    clearInterval(changeCurrent);
  } else {
    changeCurrent = setInterval(() => {
      sliderChange();
      changeCurrentText();
    }, 1000);
    playMusic();
    startButton.src = `${playPhoto.second}`;    
    isPlay = !isPlay;
  }
});

function playMusic() {
  if(currentNumber === "first") {
    newMusic.src = `${musicData.first}`;
    newMusic.play();
    newMusic.addEventListener("loadedmetadata", (event) => {
      let musicDuration = newMusic.duration;
      let minutes = Math.floor(musicDuration / 60);
      let seconds = Math.floor(musicDuration - minutes * 60);
    });
    newMusic.currentTime = sliderPosition[currentNumber].current;
  } else if (currentNumber === "second") {
    newMusic.src = `${musicData.second}`;
    newMusic.play();
  };
}


function changeCurrentText() {
  if(currentPlayTime === duration[currentNumber]) {
    changeImages();
    currentPlayTime = "0:00";
    playMusic();
    startButton.src = `${playPhoto.second}`;
  };
  changeCurrentTextUI();
}


function stopMusic() {
  newMusic.pause();
}

function changeCurrentTextUI() {
  let currentTime = rangeSlider.value;
  let result = convertNumbersToTimeFormat(currentTime);
  currentPlayTime = result;
  currentText.textContent = result;
}

function convertNumbersToTimeFormat(time) {
  return `${Math.trunc(time/60)}:${String(time%60).padStart(2, 0)}`;
};

// function session () {
 

//   labelTimer.textContent = ${`${Math.trunc(timer/60)}.padStart(2,0)}
//   :${`${timer%60}`.padStart(2,0)}`;
//   if(timer<=0){
//     clearInterval(interval);

//   }
//   timer -= 1;
 
// }
// session();
// let interval = setInterval(session, 1000);

leftArrow.addEventListener("click", (event) => {
  changeImages();
  currentPlayTime = "0:00";
  playMusic();
  startButton.src = `${playPhoto.second}`;
  rangeSlider.value = "0";
  sliderPosition[currentNumber].current = "0";
  sliderChange();
});

rightArrow.addEventListener("click", (event) => {
  changeImages();
  currentPlayTime = "0:00";
  playMusic();
  startButton.src = `${playPhoto.second}`;
  rangeSlider.value = "0";
  sliderPosition[currentNumber].current = "0";
  sliderChange();
});

contentElement.addEventListener("mouseover", (event) => {
  backgroundImage.classList.add("background-image-transform");
  audioCard.classList.add("audio-card-transform");
});

contentElement.addEventListener("mouseout", (event) => {
  backgroundImage.classList.remove("background-image-transform");
  audioCard.classList.remove("audio-card-transform");
});

function sliderChange() {
  if(currentNumber === "first") {
    rangeSlider.max = sliderPosition.first.max;
    sliderPosition.first.current = String(+sliderPosition.first.current + +sliderPosition.first.add);
    rangeSlider.value = sliderPosition.first.current; 
  } else if (currentNumber === "second") {
    rangeSlider.max = sliderPosition.second.max;
    sliderPosition.second.current = String(+sliderPosition.second.current + +sliderPosition.second.add);
    rangeSlider.value = sliderPosition.second.current; 
  }
}

backgroundImage.animate([
  {
    opacity: 0,  
  },
  {
    opacity: 0,
  },
  {
    opacity: 0,
  },
  {
    opacity: 1,
  },
], {
  duration: 500,
  iterations: 1
});

// Functions

function changeImages() {
  if(currentNumber === "first") {
    topPart.style.backgroundImage = `url(${photo.second})`;
    backgroundImage.src = `${photo.second}`;
    background.src = `${photo.second}`;
    currentNumber = "second";
  } else if (currentNumber === "second") {
    topPart.style.backgroundImage = `url(${photo.first})`;
    backgroundImage.src = `${photo.first}`;
    background.src = `${photo.first}`;
    currentNumber = "first";
  }
}

function convertStringToTime(time) {
  let splitted = time.split("");
  let minute = splitted[0];
  let secondTwo = splitted[2];
  let second = splitted[3];
  let number = splitted.filter(item => item !== ":").join("");
  let convertedNumber = Number(number);
  if(String(convertedNumber).length === 1) {
    return `0:0${convertedNumber}`;
  } else if(String(convertedNumber).length === 2) {
    if(convertedNumber < 60) {
      return `0:${convertedNumber}`;
    } else if (convertedNumber >= 60) {
      if((convertedNumber % 60) < 10) {
        return `${1}:0${convertedNumber % 60}`;
      } else {
        return `${1}:${convertedNumber % 60}`;
      }
    }
  } else if (String(convertedNumber).length === 3) {
    let lastTwo = number.split("")[1] + number.split("")[2];
    if(lastTwo >= 60) {
      return `${number.split("")[0] + 1}:${lastTwo % 60}`;
    }
  }
}

function newSliderPosition() {
  let rangePosition = rangeSlider.value;
  
}