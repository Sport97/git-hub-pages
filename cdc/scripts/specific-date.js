// Count Down Calendar
let currentDate = new Date(); // gets todays date based on computer system
let year = currentDate.getFullYear();
document.getElementById("year").innerHTML = "Count Down Calendar &copy; " + year;
let month = currentDate.getMonth() + 1; // makes months list as 1-12, rather than 0-11
let day = currentDate.getDate();
let today = year + "-" + month + "-" + day;
document.getElementById("today").innerText = today;
let countryList =[];

function outputCountry(countries) { // combines the data from the url into usable objects inside countryList array
    for (country of countries) {
        const newOption = document.createElement("option");
        newOption.setAttribute("class","country");
        newOption.innerText = country.countryCode
        countryCode = country.countryCode
        countryList.push(countryCode)
        document.getElementById("changeCountry").appendChild(newOption)
    }
}

const countryUrl = "https://date.nager.at/api/v3/AvailableCountries/";

async function getCountries(countryUrl) { // fetches url above, then parses data into usable format
    const response = await fetch(countryUrl);
    if (response.ok) {
        const results = await response.json();
        countryList.push(results)
        outputCountry(results);
    }
}

getCountries(countryUrl); // calls function

function timeUntilDate() { // determine the time between holidayDate and today's date into usable format that can be calculated
    let eventDate = document.getElementById("eventDate").value;
    let minute = 1000 * 60;
    let hour = minute * 60;
    let day = hour * 24;
    let week = day * 7
    let month = day * 31
    let year = month * 12;
    let thisDate = Date.parse(currentDate)
    let convertEventDate = Date.parse(eventDate);
    let timeMinute = Math.round(convertEventDate / minute);
    let calMinutes = Math.round(thisDate / minute);
    let totalMinutes = timeMinute - calMinutes;
    let minutesUntil = document.getElementById("minutesUntil").innerText = "Minutes: " + totalMinutes;

    let timeHour = Math.round(convertEventDate / hour);
    let calHours = Math.round(thisDate / hour);
    let totalHours = timeHour - calHours;
    let hoursUntil = document.getElementById("hoursUntil").innerText = "Hours: " + totalHours;
    
    let timeDay = Math.round(convertEventDate / day);
    let calDays = Math.round(thisDate / day);
    let totalDays = timeDay - calDays;
    let daysUntil = document.getElementById("daysUntil").innerText = "Days: " + totalDays;

    let timeWeek = Math.round(convertEventDate / week);
    let calWeeks = Math.round(thisDate / week);
    let totalWeeks = timeWeek - calWeeks;
    let weeksUntil = document.getElementById("weeksUntil").innerText = "Weeks: " + totalWeeks;

    let timeMonth = Math.round(convertEventDate / month);
    let calMonths = Math.round(thisDate / month);
    let totalMonths = timeMonth - calMonths;
    let monthsUntil = document.getElementById("monthsUntil").innerText = "Months: " + totalMonths;

    let timeYear = Math.round(convertEventDate / year);
    let calYears = Math.round(thisDate / year);
    let totalYears = timeYear - calYears;
    let yearsUntil = document.getElementById("yearsUntil").innerText = "Years: " + totalYears;
};

document.getElementById("eventDate").addEventListener("change", timeUntilDate);

// JavaScript For Scroll Back To Top Button

// Get the button:
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}