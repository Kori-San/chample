import { lose } from "./game.js";

const timerElement = document.getElementById("timer");
let intervalID;

/**
 * It sets the width of the timer bar to the percentage of time left
 * 
 * Args:
 *   combo: The current combo of the player.
 * 
 * Returns:
 *   Nothing.
 */
function timer(combo) {
    /* Getting the timer bar and setting the interval to 1. */
    const interval = 1;

    /* Checking if the combo is greater than 5. If it is, it will set the penality to 15. If it is not, it
    will set the penality to 3 times the combo. */
    const penality = combo > 5 ? 15 : 3 * combo;

    /* Calculating the maximum time the player has to answer the question. */
    const maxTime = 30 - penality;

    /* Setting the expiration time to the current time plus the maximum time. */
    const expirationTime = new Date();
    expirationTime.setSeconds(expirationTime.getSeconds() + maxTime);

    /* Clearing the interval that was set in the `timer` function. */
    window.clearInterval(intervalID);

    /* Setting the background of the timer bar to a gradient. */
    timerElement.style.background = "linear-gradient(#33d9b2 0%, #218c74 100%)";

    /* Setting the width of the timer bar to the percentage of time left. */
    intervalID = window.setInterval(async () => {
        /* Calculating the difference between the current time and the expiration time. */
        const currentTime = new Date();
        const diffSecond = ((expirationTime - currentTime) / 1000);

        /* Setting the width of the timer bar to the percentage of time left. */
        timerElement.style.width = ((diffSecond / maxTime) * 100) + "%";

        /* This is checking if the time is up. If it is, it will stop the timer and call the lose function. */
        if (Math.floor(diffSecond) < 0) {
            timerElement.style.width = "0%";
            window.clearInterval(intervalID);
            lose(true);
            return;
        }

        /* Changing the color of the timer bar when it reaches 2/3 and 1/3 of the time left. */
        if (Math.round(diffSecond) === (2 / 3) * maxTime) {
            timerElement.style.background = "linear-gradient(#ff793f 0%, #cd6133 100%)"
        }
        else if (Math.round(diffSecond) === (1 / 3) * maxTime) {
            timerElement.style.background = "linear-gradient(#ff5252 0%, #b33939 100%)"
        }

        return;
    }, interval);

    return;
}

/**
 * The function `resetTimer` takes a `combo` as an argument and calls the `timer` function with the
 * `combo` as an argument
 * 
 * Args:
 *   combo: The combo that you want to reset the timer for.
 * 
 * Returns:
 *   Nothing.
 */
export function resetTimer(combo) {
    timer(combo);
}

/**
 * Disable the timer, setting it's width to 0% and clearing the window interval.
 * 
 * Returns:
 *   Nothing.
 */
export function disableTimer() {
    window.clearInterval(intervalID);
    timerElement.style.width = "0%";
    return;
}