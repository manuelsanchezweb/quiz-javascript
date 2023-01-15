// STEPS: count the number of yes when submitting, need to watch the click of the button and then we need the form

const form = document.querySelector("form");
const inputs = document.querySelectorAll(".input-yes"); // 10 inputs

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnReset = document.querySelector(".btn-reset");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let counterOfYes = 0;
  inputs.forEach((input) => {
    if (input.checked === true) {
      counterOfYes++;
    }
  });

  modal.classList.add("active"); // We apply styling
  modal.innerHTML = `
        <h2>${renderMessage(counterOfYes)}</h2>
        <button onclick="resetPage()">Do the test again</button>
    `; // We render the message depending on the number of checked yes inputs
  overlay.classList.add("active"); // We apply styling
});

function renderMessage(number) {
  let message;
  if (number > 9) {
    message = "You are fluent as fuck";
  } else if (number > 6) {
    message = "You are pretty good with that language";
  } else if (number > 3) {
    message = "It seems you have to learn a bit, dude";
  } else {
    message = "Have you ever spoken that language?";
  }

  return message;
}

function resetPage() {
  modal.classList.remove("active");
  overlay.classList.remove("active");
  location.reload();
}
