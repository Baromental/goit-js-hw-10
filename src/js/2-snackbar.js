import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.querySelector(".form").addEventListener("submit", (event) => {
  event.preventDefault();

  const delayInput = document.querySelector('input[name="delay"]');
  const stateInputs = document.querySelectorAll('input[name="state"]');
  
  const delay = parseInt(delayInput.value, 10);
  const selectedState = Array.from(stateInputs).find((input) => input.checked).value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (selectedState === "fulfilled") {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then((delay) => {
      iziToast.success({
        title: "Fulfilled promise",
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch((delay) => {
      iziToast.error({
        title: "Rejected promise",
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
});