var statusdiv = document.getElementById("statusdiv"),
  key1 = document.getElementById("key1"),
  sound1 = document.getElementById("sound1"),
  key2 = document.getElementById("key2"),
  sound2 = document.getElementById("sound2");
//   key3 = document.getElementById("key3"),
//   sound3 = document.getElementById("sound3"),
//   key4 = document.getElementById("key4"),
//   sound4 = document.getElementById("sound4"),
//   key5 = document.getElementById("key5"),
//   sound5 = document.getElementById("sound5"),
//   key6 = document.getElementById("key6"),
//   sound6 = document.getElementById("sound6"),
//   key7 = document.getElementById("key7"),
//   sound7 = document.getElementById("sound7"),
//   key8 = document.getElementById("key8"),
//   sound8 = document.getElementById("sound8"),
//   key9 = document.getElementById("key9"),
//   sound9 = document.getElementById("sound9"),
//   key10 = document.getElementById("key10"),
//   sound10 = document.getElementById("sound10"),
//   key11 = document.getElementById("key11"),
//   sound11 = document.getElementById("sound11"),
//   key12 = document.getElementById("key12"),
//   sound12 = document.getElementById("sound12"),
//   key13 = document.getElementById("key13"),
//   sound13 = document.getElementById("sound13"),
//   key14 = document.getElementById("key14"),
//   sound14 = document.getElementById("sound14"),
//   key15 = document.getElementById("key15"),
//   sound15 = document.getElementById("sound15");

var audio = new Audio();
audio.src = "1.1.mp3";
audio.preload = "auto";

document.querySelector(".key1").addEventListener("touchstart", function() {
  // ping clicked, play ping sound:
  audio.currentTime = 0;
  audio.play();
});

// key1.addEventListener(
//   "touchstart",
//   function(e) {
//     statusdiv.innerHTML = "key 1 down";
//     audio.currentTime = 0;
//     audio.play();
//     e.preventDefault();
//   },
//   true
// );
// touchend
// key1.addEventListener(
//   "touchend",
//   function(e) {
//     statusdiv.innerHTML = "key 1 up";
//     sound1.pause();
//     sound1.currentTime = 0;
//     e.preventDefault();
//   },
//   true
// );
key2.addEventListener(
  "touchstart",
  function(e) {
    statusdiv.innerHTML = "key 2";
    sound2.play();
    e.preventDefault();
  },
  true
);

// key3.addEventListener(
//   "touchstart",
//   function(e) {
//     statusdiv.innerHTML = "key 3";
//     sound3.play();
//     e.preventDefault();
//   },
//   true
// );

// key4.addEventListener(
//   "touchstart",
//   function(e) {
//     statusdiv.innerHTML = "key 4";
//     sound4.play();
//     e.preventDefault();
//   },
//   true
// );

// key5.addEventListener(
//   "touchstart",
//   function(e) {
//     statusdiv.innerHTML = "key 5";
//     sound5.play();
//     e.preventDefault();
//   },
//   true
// );
// key6.addEventListener(
//   "touchstart",
//   function(e) {
//     statusdiv.innerHTML = "key 6";
//     sound6.play();
//     e.preventDefault();
//   },
//   true
// );

// key7.addEventListener(
//   "touchstart",
//   function(e) {
//     statusdiv.innerHTML = "key 7";
//     sound7.play();
//     e.preventDefault();
//   },
//   true
// );
// key8.addEventListener(
//   "touchstart",
//   function(e) {
//     statusdiv.innerHTML = "key 8";
//     sound8.play();
//     e.preventDefault();
//   },
//   true
// );

// key9.addEventListener(
//   "touchstart",
//   function(e) {
//     statusdiv.innerHTML = "key 9";
//     sound9.play();
//     e.preventDefault();
//   },
//   true
// );
// key10.addEventListener(
//   "touchstart",
//   function(e) {
//     statusdiv.innerHTML = "key 10";
//     sound10.play();
//     e.preventDefault();
//   },
//   true
// );
// key11.addEventListener(
//   "touchstart",
//   function(e) {
//     statusdiv.innerHTML = "key 11";
//     sound11.play();
//     e.preventDefault();
//   },
//   true
// );

// key12.addEventListener(
//   "touchstart",
//   function(e) {
//     statusdiv.innerHTML = "key 12";
//     sound12.play();
//     e.preventDefault();
//   },
//   true
// );
// key13.addEventListener(
//   "touchstart",
//   function(e) {
//     statusdiv.innerHTML = "key 13";
//     sound13.play();
//     e.preventDefault();
//   },
//   true
// );

// key14.addEventListener(
//   "touchstart",
//   function(e) {
//     statusdiv.innerHTML = "key 14";
//     sound14.play();
//     e.preventDefault();
//   },
//   true
// );
// key15.addEventListener(
//   "touchstart",
//   function(e) {
//     statusdiv.innerHTML = "key 15";
//     sound15.play();
//     e.preventDefault();
//   },
//   true
// );
