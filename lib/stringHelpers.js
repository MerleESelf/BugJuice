export const truncateText = (text, truncateLength = 80) => {
  if (text.length > 80) {
    return text.slice(0, truncateLength) + "..."
  }
  return text
}