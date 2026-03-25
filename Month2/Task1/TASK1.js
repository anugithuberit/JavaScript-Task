const quotes = [
  "Success is not final, failure is not fatal.",
  "Believe in yourself.",
  "Hard work beats talent.",
  "Stay positive and strong.",
  "Dream big and work hard."
];

function getRandomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

module.exports = { getRandomQuote };
