

export function capitalizeFirstLetter(str) {
  if (typeof str !== 'string' || str.length === 0) {
    return ""; // Handle empty or non-string input
  }

  const firstLetter = str.charAt(0).toUpperCase();
  const restOfString = str.slice(1).toLowerCase();

  return firstLetter + restOfString;
}