export default obfuscateInput;
function obfuscateInput(input) {
  if (typeof input !== 'string') {
    return input; // Return input as-is if it's not a string
  }

  // Remove leading and trailing whitespace
  input = input.trim();

  // Check if the input is an email address
  if (/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(input)) {
    const atIndex = input.indexOf('@');
    const obfuscatedPart = input.substring(0, atIndex).replace(/[A-Za-z0-9]/g, '*');
    return obfuscatedPart + input.substring(atIndex);
  }

  // Check if the input is a phone number
  if (/^[\d\s.-]+$/.test(input)) {
    const digitsOnly = input.replace(/[^\d]/g, '');
    let obfuscatedString = '';
    for (let i = 0; i < digitsOnly.length; i++) {
      obfuscatedString += '*';
    }
    return obfuscatedString;
  }

  // If it's not an email or phone number, obfuscate the whole string
  return input.replace(/[A-Za-z0-9+]/g, '*');
}
