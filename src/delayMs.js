function delayMs(ms = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = delayMs;
