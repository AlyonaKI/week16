const form = document.querySelector("form");
const submitButton = document.querySelector("button[type='submit']");
const inputs = form.querySelectorAll("input, select");
const agreementCheckbox = document.getElementById("agreement");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let isValid = true;

  inputs.forEach((input) => {
    const errorMessage = input.nextElementSibling;

    if (errorMessage && errorMessage.classList.contains("error-message")) {
      errorMessage.remove(); // Здесь я сама не справилась
    }

    if (!input.checkValidity()) {
      isValid = false;
      const message = document.createElement("span");
      message.classList.add("error-message");
      message.style.color = "red";
      message.textContent = input.validationMessage;
      input.after(message);
    }
  });

  if (!agreementCheckbox.checked) {
    isValid = false;
    if (
      !agreementCheckbox.nextElementSibling ||
      !agreementCheckbox.nextElementSibling.classList.contains("error-message")
    ) {
      const message = document.createElement("span");
      message.classList.add("error-message");
      message.style.color = "red";
      message.textContent = "Необходимо принять условия.";
      agreementCheckbox.after(message);
    }
  }

  submitButton.disabled = !isValid;

  if (isValid) {
    const formData = new FormData(form); // Как и здесь
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    form.reset();
    submitButton.disabled = true;
  }
});

inputs.forEach((input) => {
  input.addEventListener("input", () => validateForm());
});
agreementCheckbox.addEventListener("change", () => validateForm());

const validateForm = () => {
  let isValid = form.checkValidity() && agreementCheckbox.checked;
  submitButton.disabled = !isValid;
};

//Честно говоря, решая задачи в практикуме, мне казалось, что я относительно
//поняла тему, но решая практическое, я запуталась и без помощи не справилась бы
