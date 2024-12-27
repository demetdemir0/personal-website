var submitCount = localStorage.getItem("submitCount") || 1;

function validateForm() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var phoneNumber = document.getElementById("phone").value;
  var date = document.getElementById("date").value;
  var time = document.getElementById("time").value;
  var subject = document.getElementById("subject").value;
  var message = document.getElementById("message").value;

  name = name.toLowerCase();
  email = email.toLowerCase();
  subject = subject.toLowerCase();
  message = message.toLowerCase();
  surname = message.toLowerCase();

  if (name === "" || surname === "" || email === "" || subject === "" || message === "") {
    alert("Please fill in all required fields (Name, Surname, Email, Subject, and Message).");
  } else {
    displaySuccessMessage();
    submitCount++;
    localStorage.setItem("submitCount", submitCount);
    saveFormData(name, email, subject, message);
    document.getElementById("contactForm").style.display = "none";
    return true;
  }
}

function submitForm() {
  if (validateForm()) {
    document.getElementById("contactForm").style.display = "none";
  }
}

function displaySuccessMessage() {
  var successMessageDiv = document.getElementById("successMessage");
  var date = new Date();
  var formattedDate = date.toLocaleDateString();
  var formattedTime = date.toLocaleTimeString();

  var lastFormData = getLastFormData();
  var lastFormMessage = lastFormData ? `<br>Last Message: ${lastFormData.message}` : '';

  successMessageDiv.innerHTML = "Message sent successfully!<br>" +
    "Date: " + formattedDate + "<br>" +
    "Time: " + formattedTime + "<br>" +
    "Submissions: " + submitCount + lastFormMessage + "<br>" +
    '<a href="#" onclick="showOldForm()">Send another message</a>';

  successMessageDiv.style.display = "block";
  displayHistoryMessages();
}

function showOldForm() {
  document.getElementById("contactForm").style.display = "block";
  document.getElementById("successMessage").style.display = "none";
  document.getElementById("historyMessages").style.display = "none";
}

function saveFormData(name, email, subject, message) {
  var formData = {
    name: name,
    email: email,
    subject: subject,
    message: message,
    date: new Date().toLocaleString()
  };
  localStorage.setItem("lastFormData", JSON.stringify(formData));

  updateHistoryMessages(formData);
}

function getLastFormData() {
  var lastFormData = localStorage.getItem("lastFormData");
  return lastFormData ? JSON.parse(lastFormData) : null;
}

function updateHistoryMessages(formData) {
  var historyMessages = localStorage.getItem("historyMessages");
  historyMessages = historyMessages ? JSON.parse(historyMessages) : [];

  historyMessages.push({
    message: formData.message,
    date: formData.date
  });

  localStorage.setItem("historyMessages", JSON.stringify(historyMessages));
}

function displayHistoryMessages() {
  var historyMessages = localStorage.getItem("historyMessages");
  historyMessages = historyMessages ? JSON.parse(historyMessages) : [];

  var historyMessagesDiv = document.getElementById("historyMessages");
  historyMessagesDiv.innerHTML = "<h3>Message History</h3>";
  if (historyMessages.length > 0) {
    historyMessages.forEach(function (msg) {
      historyMessagesDiv.innerHTML += `<p>${msg.message} - ${msg.date}</p>`;
    });
  } else {
    historyMessagesDiv.innerHTML += "<p>No messages in history.</p>";
  }
  historyMessagesDiv.style.display = "block";
}

document.getElementById('myLink').addEventListener('mouseover', function () {
  this.style.backgroundColor = 'lightblue';
});

document.getElementById('myLink').addEventListener('mouseout', function () {
  this.style.backgroundColor = '';
});
document.addEventListener("DOMContentLoaded", function () {
  const welcomeText = document.getElementById("welcome-text");

  setInterval(function () {
    welcomeText.style.opacity = (welcomeText.style.opacity === "0" || welcomeText.style.opacity === "") ? "1" : "0";
  }, 1000);
});

const englishFlag = document.querySelector('.languages img[src="assets/images/Eng.png"]');
const turkishFlag = document.querySelector('.languages img[src="assets/images/Tur.png"]');

englishFlag.addEventListener('mouseover', function () {
  englishFlag.setAttribute('title', 'English');
});

turkishFlag.addEventListener('mouseover', function () {
  turkishFlag.setAttribute('title', 'Turkish');
});
