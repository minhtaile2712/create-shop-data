export default function delayMs(ms = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
