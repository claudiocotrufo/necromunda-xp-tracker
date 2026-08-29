export function sanitizeName(str) {
  return str.trim().slice(0, 80);
}
