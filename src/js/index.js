fetch("http://quotes.rest/qod.json")
  .then(response => response.json())
  .then(data => {
    quote = data.contents.quotes[0].quote;
    const renderQuote = `"${quote}"`;
    document.querySelector(".quote").innerHTML = renderQuote;
  });
let date = new Date();
let showTime = () => {
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  let month = date.getMonth();
  let number = date.getDate();
  let year = date.getFullYear();
  let day = date.getDay();
  let session = "";
  let prefix = "th";
  if (h < 12) {
    session = "Good morning!";
  }
  if (h >= 12 && h < 17) {
    h = h - 12;
    session = "Good afternoon!";
  }
  if (h >= 17) {
    h = h - 12;
    session = "Good evening";
  }
  if (h == 0) {
    h = 12;
  }
  switch (number) {
    case 1:
    case 21:
    case 31:
      prefix = "st";
      break;
    case 2:
    case 22:
      prefix = "nd";
      break;
    case 3:
    case 23:
      prefix = "rd";
      break;
  }
  switch (month) {
    case 0:
      month = "January";
      break;
    case 1:
      month = "February";
      break;
    case 2:
      month = "March";
      break;
    case 3:
      month = "April";
      break;
    case 4:
      month = "May";
      break;
    case 5:
      month = "June";
      break;
    case 6:
      month = "July";
      break;
    case 7:
      month = "August";
      break;
    case 8:
      month = "September";
      break;
    case 9:
      month = "October";
      break;
    case 10:
      month = "November";
      break;
    case 11:
      month = "December";
      break;
  }
  switch (day) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
      break;
  }

  m = m < 10 ? "0" + m : m;
  let time = h + ":" + m;
  let todayDate = `Today is ${day}, ${month} ${number}${prefix}, ${year}.`;
  document.querySelector(".clock").innerText = time;
  document.querySelector(".clock").innerContext = time;
  document.querySelector(".session").innerHTML = session;
  document.querySelector(".date").innerText = todayDate;

  setTimeout(showTime, 1000);
};
showTime();

// fetch("http://numbersapi.com/42").then(data => console.log(data));
let holidays = () => {
  let date = new Date();
  fetch(
    `https://holidayapi.pl/v1/holidays?year=${date.getFullYear()}&country=US&month=${date.getMonth() +
      1}&day=${date.getDate()}&upcoming=1`
  )
    .then(res => res.json())
    .then(data => {
      let holidayDate = data.holidays[0].date;
      let holidayNumber = holidayDate.substr(holidayDate.lastIndexOf("-") + 1);
      let daysLeft;
      let s;
      let holidayMonth = holidayDate.substr(5, 2);
      holidayMonth = parseInt(holidayMonth);
      if (date.getMonth() + 1 === holidayMonth) {
        daysLeft = holidayNumber - date.getDate();
      } else {
        daysLeft =
          parseInt(holidayNumber) +
          (daysInMonth(date.getMonth() + 1, date.getFullYear()) -
            date.getDate());
      }
      if (daysLeft > 1) {
        s = "s";
      } else {
        s = "";
      }
      document.querySelector(".holiday").innerText = `${
        data.holidays[0].name
      } is in ${daysLeft} day${s}.`;
    });
};
holidays();

const daysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
}

const input = document.querySelector('.search_field').value;
const weatherSearch = () =>{
  const input = document.querySelector('.search_field').value;
  try {
     fetch(`http://api.openweathermap.org/data/2.5/weather?q=${input}&appid=ef9050de840057584e26e8f773ac8a40`)
     //fetch(`http://api.openweathermap.org/data/2.5/weather?q=south%20pasadena&appid=ef9050de840057584e26e8f773ac8a40`)
    .then(res => res.json())
    .then(data => {
      const celcius = Math.round(data.main.temp - 273.15);
      const fahrenheit = Math.round(celcius * 1.8) + 32;
      document.querySelector(".temp").innerText = fahrenheit;
      let condition = data.weather[0].main;
      const description = data.weather[0].description;
      let icon = "fas fa-sun";
      switch(condition) {
        case "Thunderstorm":
        icon = "fas fa-bolt";
        break;
        case "Drizzle":
        icon = "fas fa-cloud-rain";
        break;
        case "Rain":
        icon = "fas fa-cloud-showers-heavy";
        break;
        case "Snow":
        icon ="far fa-snowflake";
        break;
        case "Clouds":
        icon = "fas fa-cloud";
        break;
      }


      document.querySelector(".icon_div").innerHTML = `<i class="${icon}"></i>`;
      document.querySelector(".weather_description").innerHTML = description;
    });
  }
  catch(err){
    console.log(err)
    
  }
  // document.querySelector('.search_field').value = "";
}
weatherSearch();

const articles = () => {
  fetch(`https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=aOZxZ1X7YKtrGx4hHr3XRrXgs4spKA0W`)
    .then(res => res.json())
    .then(data => {

      for ( i = 1; i <4; i++) {
    
        let title = data.results[i].title;
        let abstract = data.results[i].abstract;
        let url = data.results[i].url;
        let img = data.results[i].multimedia[0].url;
        let caption = data.results[i].multimedia.caption;
  
        document.querySelector(".articles").insertAdjacentHTML('afterbegin', `
        <div class="article">
        <a href="${url}" class="title">${limitTitle(title, 50)}</a>
        <img src="${img}" alt="${caption}"/>
        <div class="article_abstract">${limitTitle(abstract, 100)}</div>
      </div>
        `)
      }
    })
}
articles();

let x = document.querySelector(".search_field");
x.addEventListener('keyup', e => {
  if(event.keyCode === 13){
    e.preventDefault();
    weatherSearch();
    x.blur();
  }
 
})
const limitTitle = (title, limit) => {
  let newTitle = [];
  if(title.length > limit){
      title.split(' ').reduce((acc,cur) => {
          if(acc + cur.length <=limit || acc == 0) {
              newTitle.push(cur);
          }
          return acc + cur.length;
      }, 0);

      return `${newTitle.join(' ')}...`;
  }
  return title;
};