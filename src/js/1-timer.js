import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let timeDeadline;

const dataStart = document.querySelector("[data-start]");
const dataDays = document.querySelector("[data-days]");
const dataHours = document.querySelector("[data-hours]");
const dataMinutes = document.querySelector("[data-minutes]");
const dataSeconds = document.querySelector("[data-seconds]");

dataStart.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const userSelectedDate = selectedDates[0];
        if (userSelectedDate < options.defaultDate) {
            iziToast.show({
                message: 'Please choose a date in the future',
                position: 'topRight',
                messageColor: 'white',
                backgroundColor: '#f90909',
            });
            dataStart.disabled = true;
        } else {
            dataStart.disabled = false;
            timeDeadline = userSelectedDate;
        }
    },
};

flatpickr("#datetime-picker", options);

dataStart.addEventListener('click', () => {
    if (!timeDeadline) {
        return;
    }

    dataStart.disabled = true;
    startTimer();
});

function startTimer() {
    const intervalId = setInterval(() => {
        const currentDate = Date.now();
        const timeDifference = timeDeadline - currentDate;
        const timeLeft = convertMs(timeDifference);
        updateTimerInterface(timeLeft);

        if (timeDifference <= 1000) {
            clearInterval(intervalId);
            dataStart.disabled = false;
        }
    }, 1000);
}

function updateTimerInterface({ days, hours, minutes, seconds }) {
    dataDays.textContent = addLeadingZero(days);
    dataHours.textContent = addLeadingZero(hours);
    dataMinutes.textContent = addLeadingZero(minutes);
    dataSeconds.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}