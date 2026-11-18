/* =========================================
   OUR FIRST YEAR
   STAGE 01.4.3 — LIVING COVER
   Real-Time Handwriting Effect
========================================= */


/* ---------- WRITING SETTINGS ---------- */

const WRITING_SETTINGS = {

    initialDelay: 900,

    titleSpeed: 115,

    dateSpeed: 170,

    pauseBetweenLines: 850,

    punctuationPause: 350

};


/* ---------- SMALL DELAY FUNCTION ---------- */

function wait(milliseconds) {

    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });

}


/* ---------- CHARACTER WRITING ENGINE ---------- */

async function writeText(element, text, speed) {

    if (!element || !text) return;

    const characters = Array.from(text);

    element.textContent = "";

    for (const character of characters) {

        element.textContent += character;

        let delay = speed;

        if (character === " ") {
            delay = speed * 0.45;
        }

        if ([".", ",", "•"].includes(character)) {
            delay = WRITING_SETTINGS.punctuationPause;
        }

        await wait(delay);

    }

}


/* ---------- COVER WRITING SEQUENCE ---------- */

async function beginCoverWriting() {

    const title = document.getElementById("coverTitle");

    const date = document.getElementById("coverDate");

    if (!title || !date) {
        console.error("Cover writing elements could not be found.");
        return;
    }

    const titleText = title.dataset.text;

    const dateText = date.dataset.text;

    /* Keep both lines empty before writing */

    title.textContent = "";

    date.textContent = "";

    /* Initial anticipation */

    await wait(WRITING_SETTINGS.initialDelay);


    /* Write the book title */

    await writeText(
        title,
        titleText,
        WRITING_SETTINGS.titleSpeed
    );


    /* Pause before writing the anniversary date */

    await wait(WRITING_SETTINGS.pauseBetweenLines);


    /* Write the anniversary date */

    await writeText(
        date,
        dateText,
        WRITING_SETTINGS.dateSpeed
    );


    /* Cover writing completed */

    console.log("The anniversary cover has been written.");

}


/* ---------- START EXPERIENCE ---------- */

async function initialiseBook() {

    /* Wait for decorative fonts to load when available */

    if (document.fonts && document.fonts.ready) {

        await document.fonts.ready;

    }

    await beginCoverWriting();

}


/* ---------- INITIALISE AFTER PAGE LOAD ---------- */

initialiseBook();
