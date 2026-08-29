export function sanitizeName(str: string): string {
  return str.trim().slice(0, 80);
}
