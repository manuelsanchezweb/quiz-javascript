const form = document.querySelector("form");
const list = document.querySelector(".list");

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnReset = document.querySelector(".btn-reset");

// STEP 1: we have to do is to render the questions from the json
const getQuestions = async () => {
  const response = await fetch("questions.json");
  const data = await response.json();
  return data;
};

// STEP 2: we have to put all the questions inside the form
const createListAndPutItIntoTheForm = async () => {
  const allQuestions = await getQuestions();
  // console.log(allQuestions); This already gives us the list of questions

  Array.from(allQuestions).forEach((question, index) => {
    // We create the wrapper of the question
    const questionWrapper = document.createElement("div");
    questionWrapper.classList.add("question");

    const questionTitle = document.createElement("div");
    questionTitle.innerText = question;

    const questionAnswers = document.createElement("div");
    questionAnswers.innerHTML = `
    <input type="radio" checked class="input-yes" id="yes${index}" name="question${index}" value="yes" />
    <label for="yes${index}">Yes</label>
    <input type="radio" id="no${index}" name="question${index}" value="no" />
    <label for="no${index}">No</label>
    `;

    questionWrapper.appendChild(questionTitle);
    questionWrapper.appendChild(questionAnswers);

    list.appendChild(questionWrapper);
  });

  const inputs = document.querySelectorAll(".input-yes"); // 10 inputs

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
};

function resetPage() {
  modal.classList.remove("active");
  overlay.classList.remove("active");
  location.reload();
}

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

const initQuiz = () => {
  createListAndPutItIntoTheForm();
};

initQuiz();
