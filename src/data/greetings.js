// The heading above the contact details, as a list of lines, since it is set large and breaks where
// it reads best.
//
// Just one for now. We tried picking a different greeting on each load (welcome!, good
// morning/afternoon/evening by the visitor's clock, nice to meet you!, glad you’re here!); add
// more functions to GREETINGS to bring that back.

const GREETINGS = [() => ['hello there,', 'fellow traveler']];

// Picked once, when the page loads, so moving around the site doesn't reshuffle it.
export const greeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)]();
