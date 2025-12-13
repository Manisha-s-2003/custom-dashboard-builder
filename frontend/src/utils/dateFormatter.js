/**
 * Format date with time in US locale
 * @param {string|Date} dateString - Date string or Date object
 * @returns {string} Formatted date string (e.g., "Dec 02, 2025 4:10 PM")
 */
export const formatDate = (dateString) => {
  if (!dateString) return "N/A";

  const date = new Date(dateString);

  // Check if date is valid
  if (isNaN(date.getTime())) return "Invalid Date";

  const dateStr = date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  const timeStr = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${dateStr} ${timeStr}`;
};

/**
 * Format date only (without time)
 * @param {string|Date} dateString - Date string or Date object
 * @returns {string} Formatted date string (e.g., "Dec 02, 2025")
 */
export const formatDateOnly = (dateString) => {
  if (!dateString) return "N/A";

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "Invalid Date";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

/**
 * Format time only
 * @param {string|Date} dateString - Date string or Date object
 * @returns {string} Formatted time string (e.g., "4:10 PM")
 */
export const formatTimeOnly = (dateString) => {
  if (!dateString) return "N/A";

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "Invalid Time";

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};
