function buildPrompt({ destination, days }) {
  if (!destination || !days) {
    return "Please provide destination and number of days.";
  }

  return `Plan a ${days}-day trip to ${destination}. Include famous attractions, best food spots, and travel tips.`;
}

module.exports = buildPrompt;
