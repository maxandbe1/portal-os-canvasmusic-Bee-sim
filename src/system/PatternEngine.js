export function analyzePatterns(sessions) {
  if (!sessions || sessions.length < 3) {
    return {
      message: "Not enough data for pattern analysis.",
      identityMode: null,
      emotionalTrend: null,
      relationalTrend: null
    };
  }

  const identities = sessions.map(s => s.identity.identity);
  const emotionals = sessions.map(s => s.identity.emotional);
  const relations = sessions.map(s => s.meaning.us);

  function mostCommon(arr) {
    return arr.sort((a, b) =>
      arr.filter(v => v === a).length - arr.filter(v => v === b).length
    ).pop();
  }

  return {
    message: "Pattern analysis complete.",
    identityMode: mostCommon(identities),
    emotionalTrend: mostCommon(emotionals),
    relationalTrend: mostCommon(relations)
  };
}
