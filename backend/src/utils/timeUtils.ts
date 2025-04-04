// Converts an expiration string (like "2h", "30m") to milliseconds for cookie maxAge.
export const getMilliseconds = (expiresIn: string): number => {
  const num = parseInt(expiresIn, 10);
  if (expiresIn.includes("h")) return num * 60 * 60 * 1000; // Hours to ms
  if (expiresIn.includes("d")) return num * 24 * 60 * 60 * 1000; // Days to ms
  if (expiresIn.includes("m")) return num * 60 * 1000; // Minutes to ms
  return num * 1000; // Default to seconds
};
