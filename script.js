// Smooth scrolling for navigation links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
const text1 = "Hi there! I am Nithish Patel Varala";
const text2 = "An Aspiring IT Professional";

function typeText(element, text, delay) {
    element.innerHTML = "";
    let i = 0;
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, 100);
        } else {
            setTimeout(() => eraseText(element, text, delay), 2000);
        }
    }
    typing();
}

function eraseText(element, text, delay) {
    let i = text.length;
    function erasing() {
        if (i > 0) {
            element.innerHTML = text.substring(0, i - 1);
            i--;
            setTimeout(erasing, 50);
        } else {
            setTimeout(() => startTypingLoop(), delay);
        }
    }
    erasing();
}

function startTypingLoop() {
    typeText(document.querySelector(".text1"), text1, 500);
    setTimeout(() => typeText(document.querySelector(".text2"), text2, 500), 4000);
}

startTypingLoop();

const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent the form from submitting normally

  // Show loading message
  result.innerHTML = "Please wait...";

  const formData = new FormData(form); // Collect form data
  const object = Object.fromEntries(formData); // Convert form data to an object

  // Add your email address to the object (Web3Forms should send emails based on this)
  object['email'] = 'patelnithish@gmail.com';  // Replace with your email address
  
  const json = JSON.stringify(object); // Convert object to JSON format

  console.log("Sending form data:", json);  // Log the data being sent

  // Fetch request to Web3Forms API
  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: json, // Send the data as JSON
  })
  .then(async (response) => {
    let jsonResponse = await response.json();  // Parse JSON response
    console.log("Response from Web3Forms:", jsonResponse);  // Log the response to console
    if (response.status === 200) {
      result.innerHTML = jsonResponse.message; // Show success message
    } else {
      result.innerHTML = "Failed to submit form. Please try again."; // Show failure message
    }
  })
  .catch((error) => {
    console.log("Error:", error);  // Log any errors
    result.innerHTML = "Something went wrong!";  // Show error message
  })
  .then(function () {
    form.reset();  // Reset the form after submission
    setTimeout(() => {
      result.style.display = "none";  // Hide the result message after 3 seconds
    }, 3000);
  });
});


