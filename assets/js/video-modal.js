let greetWrapper = document.getElementById("greet_wrapper");
let greetVideo = document.getElementById("greet_video");
let greetToggler = document.querySelector(".greet_toggler");
let greetFullPlay = document.getElementById("greet_full-play");
let greetFullReplay = document.getElementById("greet_full-replay");
let greetFullVolume = document.getElementById("greet_full-volume");
let greetFullMute = document.getElementById("greet_full-mute");
let greetFullExpand = document.getElementById("greet_full-expand");
let greetFullBtn = document.getElementById("greet_full-btn");
let greetText = document.getElementById("greet_text");

let greetAddFrom = document.querySelector(".greet_add-form");
let emailForm = document.querySelector(".greet_email-form");
let greetEmailSubmit = document.querySelector(".greet_email-submit");

/* change video start */
let video = document.getElementById("playVideo");
/* change video end */

greetVideo.autoplay = true;
greetVideo.muted = true;
greetVideo.loop = true;
greetFullExpand.addEventListener("click", () => {
  greetVideo.requestFullscreen();
});

// Pause video on borwser tab switch
var frontend_scripts = { pause_on_switch: "1" };
if (frontend_scripts.pause_on_switch) {
  document.addEventListener("visibilitychange", () => {
    if (document["hidden"] || (emailForm && emailForm.classList.contains("email-form-active"))) {
      greetVideo.pause();
    } else {
      greetVideo.play();
      greetFullPlay.style.display = "none";
      greetWrapper.classList.add("play-video");
    }
  });
}

// REPLAY GREET
greetFullReplay.addEventListener("click", () => {
  greetVideo.currentTime = 0;
});
// VOLUME UP
greetFullVolume.addEventListener("click", () => {
  greetFullMute.style.display = "flex";
  greetFullVolume.style.display = "none";
  greetVideo.muted = true;
});
// VOLUME MUTE
greetFullMute.addEventListener("click", () => {
  greetFullVolume.style.display = "flex";
  greetFullMute.style.display = "none";
  greetVideo.muted = false;
});
// VIDEO PLAY
greetFullPlay.addEventListener("click", () => {
  greetVideo.play();
  greetFullPlay.style.display = "none";
  greetWrapper.classList.toggle("play-video");
});
// CLOSE TOTAL GREET
greetClose = () => {
  greetWrapper.style.display = "none";
};

// CLOSE FULL GREET
greetFullClose = () => {
  greetWrapper.classList.remove("greet_wrapper-full");
  greetWrapper.classList.remove("play-video");
  greetVideo.muted = true;
  greetVideo.play();
  greetFullBtn.style.display = "none";
};
// OPEN FULL GREET
const videoModal = () => {
  if (!greetWrapper.classList.contains("greet_wrapper-full")) {
    greetVideo.currentTime = 0;
  }
  greetWrapper.classList.add("greet_wrapper-full");
  greetWrapper.classList.toggle("play-video");
  greetVideo.muted = false;

  greetFullMute.style.display = "none";
  greetFullVolume.style.display = "flex";
  if (greetWrapper.classList.contains("play-video")) {
    greetVideo.play();
    greetFullPlay.style.display = "none";
  } else {
    greetVideo.pause();
    greetFullPlay.style.display = "flex";
  }
  greetFullBtn.style.display = "block";
};

greetVideo.addEventListener("click", () => {
  videoModal();
});
greetText.addEventListener("click", () => {
  videoModal();
});
/* change video start */
function videoChange(videoUrl) {
  video.setAttribute("src", videoUrl);
  greetVideo.load();
  greetVideo.play();
  greetFullPlay.style.display = "none";
  greetWrapper.classList.toggle("play-video");
}
/* change video end */

/* Email form */
if (greetAddFrom) {
  greetAddFrom.addEventListener("click", () => {
    emailForm.classList.add("email-form-active");
    greetVideo.pause();
  });
}
greetFormClose = () => {
  emailForm.classList.remove("email-form-active");
  greetVideo.play();
  greetFullPlay.style.display = "none";
};
if (emailForm) {
  emailForm.addEventListener("submit", function (e) {
    const formData = new FormData(emailForm);
    e.preventDefault();
    let object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });
    let json = JSON.stringify(object);
    greetEmailSubmit.innerHTML = "Please wait...";

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    })
      .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
          greetEmailSubmit.innerHTML = json.message;
        } else {
          greetEmailSubmit.innerHTML = json.message;
        }
      })
      .catch((error) => {
        console.log(error);
        greetEmailSubmit.innerHTML = "Something went wrong!";
      })
      .then(function () {
        emailForm.reset();
        setTimeout(() => {
          greetEmailSubmit.innerHTML = "Send email";
        }, 5000);
      });
  });
}

// ON SCROLL SIZE CHANGE
window.addEventListener("scroll", function (event) {
  let scroll = scrollY;
  if (scroll > 1) {
    greetWrapper.classList.add("greet_wrapper-resize");
  } else {
    greetWrapper.classList.remove("greet_wrapper-resize");
  }
});
