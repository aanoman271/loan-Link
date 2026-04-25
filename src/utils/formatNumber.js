/**
 * Formats a number into a short string representation (e.g., 1.3k, 1M, 10B, 2T).
 * Uses floor logic for decimal places.
 * 
 * @param {number} num - The number to format.
 * @returns {string} - The formatted string.
 */
export const formatNumberShort = (num) => {
  if (num === null || num === undefined || isNaN(num)) return "0";
  
  const absNum = Math.abs(num);
  const sign = num < 0 ? "-" : "";

  if (absNum < 1000) return sign + absNum.toString();

  const units = [
    { value: 1e12, symbol: "T" },
    { value: 1e9, symbol: "B" },
    { value: 1e6, symbol: "M" },
    { value: 1e3, symbol: "k" },
  ];

  for (let i = 0; i < units.length; i++) {
    if (absNum >= units[i].value) {
      // Use floor logic for 1 decimal place
      const scaled = absNum / units[i].value;
      const floored = Math.floor(scaled * 10) / 10;
      
      // Remove trailing .0 and format string
      const formatted = floored.toString().replace(/\.0$/, "");
      return sign + formatted + units[i].symbol;
    }
  }

  return sign + absNum.toString();
};
