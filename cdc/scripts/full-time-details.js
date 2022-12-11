// Count Down Calendar
let currentDate = new Date(); // gets todays date based on computer system
let year = currentDate.getFullYear();
document.getElementById("year").innerHTML = "Count Down Calendar &copy; " + year;
let month = currentDate.getMonth() + 1; // makes months list as 1-12, rather than 0-11
let day = currentDate.getDate();
let today = year + "-" + month + "-" + day;
document.getElementById("today").innerText = today;
let country = document.getElementById("country");
document.getElementById("countryHolidays").textContent = country.innerText + " Major Holidays: Full Time Details"; // defaults to US Holidays
let holiday = "Holiday";
let calendarList = [];
let holidayList = [];
let dateList = [];
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

function outputHoliday(changeHoliday) { // combines the data from the url into usable objects inside calendarList array, along with filling arrays holidayList and dateList
    for (const holiday of changeHoliday) {
        const newHoliday = document.createElement("option");
        newHoliday.setAttribute("id","holiday");
        newHoliday.innerText = holiday.name
        holidayName = holiday.name
        holidayList.push(holidayName)
        document.getElementById("changeHoliday").appendChild(newHoliday)
        const newHolidayDate = document.createElement("option");
        newHolidayDate.setAttribute("id","holidayDate");
        newHolidayDate.innerText = holiday.date
        holidayDates = holiday.date
        dateList.push(holidayDates)
        document.getElementById("changeHoliday").appendChild(newHolidayDate)
    }
}

const holidayUrl = "https://date.nager.at/api/v3/NextPublicHolidays/" + country.innerText;

async function getHolidays(holidayUrl) { // fetches url above, then parses data into usable format
    const response = await fetch(holidayUrl);
    if (response.ok) {
        const results = await response.json();
        calendarList.push(results)
        outputHoliday(results);
    }
}

getHolidays(holidayUrl); // calls function

function daysUntilHoliday() { // determine the time between holidayDate and today's date into usable format that can be calculated
    let select = document.getElementById("changeHoliday")
    let option = select.options[select.selectedIndex+1].text;
    let minute = 1000 * 60;
    let hour = minute * 60;
    let day = hour * 24;
    let week = day * 7
    let month = day * 31
    let year = month * 12;
    let thisDate = Date.parse(currentDate)
    let convertHolidayDate = Date.parse(option);

    let timeMinute = Math.round(convertHolidayDate / minute);
    let calMinutes = Math.round(thisDate / minute);
    let totalMinutes = timeMinute - calMinutes;
    let minutesUntil = document.getElementById("minutesUntil").innerText = "Minutes: " + totalMinutes;

    let timeHour = Math.round(convertHolidayDate / hour);
    let calHours = Math.round(thisDate / hour);
    let totalHours = timeHour - calHours;
    let hoursUntil = document.getElementById("hoursUntil").innerText = "Hours: " + totalHours;
    
    let timeDay = Math.round(convertHolidayDate / day);
    let calDays = Math.round(thisDate / day);
    let totalDays = timeDay - calDays;
    let daysUntil = document.getElementById("daysUntil").innerText = "Days: " + totalDays;

    let timeWeek = Math.round(convertHolidayDate / week);
    let calWeeks = Math.round(thisDate / week);
    let totalWeeks = timeWeek - calWeeks;
    let weeksUntil = document.getElementById("weeksUntil").innerText = "Weeks: " + totalWeeks;

    let timeMonth = Math.round(convertHolidayDate / month);
    let calMonths = Math.round(thisDate / month);
    let totalMonths = timeMonth - calMonths;
    let monthsUntil = document.getElementById("monthsUntil").innerText = "Months: " + totalMonths;

    // let timeYear = Math.round(convertHolidayDate / year);
    // let calYears = Math.round(thisDate / year);
    // let totalYears = timeYear - calYears;
    // let yearsUntil = document.getElementById("yearsUntil").innerText = "Years: " + totalYears;
};

function changeCountry() { // clears previous entries to allow default country to be other than US, such as AU
    calendarList.length = 0;
    holidayList.length = 0;
    dateList.length = 0;
    let newCountry = document.getElementById("country");
    newCountry.textContent = this.value;
    document.getElementById("countryHolidays").textContent = newCountry.innerText + " Major Holidays: Full Time Details";
    const newUrl = "https://date.nager.at/api/v3/NextPublicHolidays/" + newCountry.innerText;
    for (holiday in changeHoliday) {
        document.getElementById("changeHoliday").innerHTML = "";
        document.getElementById("minutesUntil").innerHTML = "Minutes: ";
        document.getElementById("daysUntil").innerHTML = "Days: ";
        document.getElementById("hoursUntil").innerHTML = "Hours: ";
        document.getElementById("weeksUntil").innerHTML = "Weeks: ";
        document.getElementById("monthsUntil").innerHTML = "Months: ";
    }
    const templateHoliday = document.createElement("option");
    templateHoliday.setAttribute("id","templateHoliday");
    templateHoliday.innerText = "Choose Holiday"
    document.getElementById("changeHoliday").appendChild(templateHoliday)
    
    getHolidays(newUrl)
}

document.getElementById("changeCountry").addEventListener("change", changeCountry);

document.getElementById("changeHoliday").addEventListener("change", daysUntilHoliday);

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