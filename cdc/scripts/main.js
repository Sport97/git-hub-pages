// Count Down Calendar
let currentDate = new Date(); // gets todays date based on computer system
let year = currentDate.getFullYear();
document.getElementById("year").innerHTML = "Count Down Calendar &copy; " + year;
let month = currentDate.getMonth() + 1; // makes months list as 1-12, rather than 0-11
let day = currentDate.getDate();
let today = year + "-" + month + "-" + day;
document.getElementById("today").innerHTML = today;
let country = document.getElementById("country");
document.getElementById("countryHolidays").textContent = country.value + " Holidays"; // defaults to US Holidays
let holiday = "";
let calendarList = [];
let holidayList = [];
let dateList = [];
let countryList =[];

function outputCountry(countries) { // combines the data from the url into usable objects inside countryList array
    for (country of countries) {
        const newOption = document.createElement("option");
        newOption.setAttribute("id","country");
        newOption.innerHTML = country.countryCode
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

function outputHoliday(holidays) { // combines the data from the url into usable objects inside calendarList array, along with filling arrays holidayList and dateList
    for (const holiday of holidays) {
        const newArticle = document.createElement("article");
        const newHeading = document.createElement("h2");
        newHeading.innerText = holiday.name
        holidayName = holiday.name
        holidayList.push(holidayName)
        let secondHeading = document.createElement("h3");
        secondHeading.setAttribute("class","holidayDate");
        secondHeading.innerText = holiday.date
        holidayDates = holiday.date
        dateList.push(holidayDates)
        let thirdHeading = document.createElement("h3");
        thirdHeading.setAttribute("class","daysUntil");
        thirdHeading.innerText = daysUntilHoliday()
        newArticle.appendChild(newHeading);
        newArticle.appendChild(secondHeading);
        newArticle.appendChild(thirdHeading);
        document.getElementById("holidays").appendChild(newArticle);
    }
}

const holidayUrl = "https://date.nager.at/api/v3/PublicHolidays/" + year + "/" + country.value;

async function getHolidays(holidayUrl) { // fetches url above, then parses data into usable format
    const response = await fetch(holidayUrl);
    if (response.ok) {
        const results = await response.json();
        calendarList.push(results)
        outputHoliday(results);
    }
}

getHolidays(holidayUrl); // calls function

let holidayDates = document.querySelectorAll(".holidayDate");
function daysUntilHoliday() { // determine the time between holidayDate and today's date into usable format that can be calculated
    for (i = 0; i < holidayDates.length; ++i) {
        let minute = 1000 * 60;
        let hour = minute * 60;
        let day = hour * 24;
        let year = day * 365;
        let thisDate = Date.parse(today)
        let convertHolidayDate = Date.parse(holidayDates);
        let time = Math.round(convertHolidayDate / day);
        let days = Math.round(thisDate / day);
        let total = time - days;
        return total + " Days";
    };
};

function changeCountry() { // clears previous entries to allow default country to be other than US, such as AU
    calendarList.length = 0;
    holidayList.length = 0;
    dateList.length = 0;
    let newCountry = document.getElementById("country");
    newCountry.textContent = this.value;
    document.getElementById("countryHolidays").textContent = newCountry.value + " Holidays";
    const newUrl = "https://date.nager.at/api/v3/PublicHolidays/" + year + "/" + newCountry.value;
    for (holiday in holidays) {
        document.getElementById("holidays").innerHTML = "";
    }

    getHolidays(newUrl)
}

document.getElementById("changeCountry").addEventListener("change", changeCountry);