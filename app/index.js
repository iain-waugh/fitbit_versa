import { me } from "appbit";
import clock from "clock";
import document from "document";
import * as fs from "fs";
import * as messaging from "messaging";
import { preferences } from "user-settings";
import * as util from "../common/utils";

const SETTINGS_TYPE = "cbor";
const SETTINGS_FILE = "settings.cbor";

const DIGIT_SMALL  = "26x51"
const DIGIT_MEDIUM = "36x75"
const DIGIT_LARGE  = "46x96"

let settings = loadSettings();
applyTheme(settings.background, settings.foreground);

// TIME
let separator = document.getElementById("separator");
let hours1 = document.getElementById("hours1");
let hours2 = document.getElementById("hours2");
let mins1 = document.getElementById("mins1");
let mins2 = document.getElementById("mins2");
let secs1 = document.getElementById("secs1");
let secs2 = document.getElementById("secs2");
let pm    = document.getElementById("pm");

// DATE
//let day = document.getElementById("day");
//let date1 = document.getElementById("date1");
//let date2 = document.getElementById("date2");

clock.granularity = "seconds";

clock.ontick = evt => {
  let d = evt.date;

  // DATE
//  setDate(d.getDate());

  // DAY NAME
//  setDay(d.getDay());

  // HOURS
  let hours = d.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    if (hours > 11) {
      setPM(1)
    } else {
      setPM(0)
    }
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  setHours(hours);

  // MINUTES
  let minutes = ("0" + d.getMinutes()).slice(-2);
  setMins(minutes);

  // SECONDS
  let seconds = ("0" + d.getSeconds()).slice(-2);
  setSecs(seconds);

  // BLINK SEPARATOR
  //setSeparator(d.getSeconds());
}

// Apply theme colors to elements
function applyTheme(background, foreground) {
//  let items = document.getElementsByClassName("background");
//  items.forEach(function(item) {
//    item.style.fill = background;
//  });
  console.log("Aplying Background=" + background + ", Foreground=" + foreground)
  let elements = document.getElementsByClassName("decals");
  elements.forEach(function(element) {
    element.style.fill = foreground;
  });
//  settings.background = background;
  settings.foreground = foreground;
}

// Blink time separator (0 = off, 1 = on)
function setSeparator(val) {
  separator.style.display = (val % 2 === 1 ? "inline" : "none");
}

// Show PM symbol (0 = off, 1 = on)
function setPM(val) {
  pm.style.display = (val % 2 === 1 ? "inline" : "none");
}

function setHours(val) {
  if (val > 9) {
    drawDigit(Math.floor(val / 10), hours1, DIGIT_LARGE);
  } else {
    drawDigit("Blank", hours1, DIGIT_LARGE);
  }
  drawDigit(Math.floor(val % 10), hours2, DIGIT_LARGE);
}

function setMins(val) {
  drawDigit(Math.floor(val / 10), mins1, DIGIT_LARGE);
  drawDigit(Math.floor(val % 10), mins2, DIGIT_LARGE);
}

function setSecs(val) {
  drawDigit(Math.floor(val / 10), secs1, DIGIT_SMALL);
  drawDigit(Math.floor(val % 10), secs2, DIGIT_SMALL);
}

//function setDate(val) {
//  drawDigit(Math.floor(val / 10), date1);
//  drawDigit(Math.floor(val % 10), date2);
//}

//function setDay(val) {
//  day.image = getDayImg(val);
//}

function drawDigit(val, place, size) {
  place.image = `${val}_${size}.png`;
}

function getDayImg(index) {
  let days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  return `day_${days[index]}.png`;
}

// Listen for the onmessage event
messaging.peerSocket.onmessage = evt => {
  applyTheme(evt.data.background, evt.data.foreground);
}

// Register for the unload event
me.onunload = saveSettings;

function loadSettings() {
  try {
    return fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
  } catch (ex) {
    // Defaults
    return {
      background: "#000000",
      foreground: "#3380cc"
    }
  }
}

function saveSettings() {
  fs.writeFileSync(SETTINGS_FILE, settings, SETTINGS_TYPE);
}
