const MAIN_PATH = "http://127.0.0.1:3000/api/";

const date = new Date();
let currentDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

fetch(MAIN_PATH + "dates/" + currentDate)
  .then(res => {
    if (!res.ok) {
      throw new Error('Network response was not ok ' + res.statusText);
    }
    return res.json();
  })
  .then(data => {
    if (data != null) {
      const currentDateFormatted = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      const announcement = `🌹 ${data.NAMECAL}  ${currentDateFormatted} 🌹`;
      displayAnnouncement(announcement);
    } else {
      console.error("No se encontraron datos para la fecha actual.");
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });

function displayAnnouncement(announcement) {
    const marqueeContainer = document.getElementById("marqueeContainer");
    const p = document.createElement("p");
    p.textContent = announcement;
    marqueeContainer.appendChild(p);
    console.log(announcement);
}