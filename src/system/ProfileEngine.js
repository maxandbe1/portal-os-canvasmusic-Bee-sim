export function generateSongIdentityProfile(sessions, patterns) {
  if (!sessions || sessions.length === 0) {
    return {
      title: "Song Identity Profile",
      summary: "Not enough data to generate a profile.",
      identityModes: [],
      emotionalTrends: [],
      relationalTrends: [],
      coreIdentity: "Unknown",
      description: "Play more songs to unlock your profile."
    };
  }

  const identityModes = sessions.map(s => s.identity.identity);
  const emotionalTrends = sessions.map(s => s.identity.emotional);
  const relationalTrends = sessions.map(s => s.meaning.us);

  function mostCommon(arr) {
    return arr.sort((a, b) =>
      arr.filter(v => v === a).length - arr.filter(v => v === b).length
    ).pop();
  }

  return {
    title: "Your Song Identity Profile",
    summary: "A psychological portrait generated from your music sessions.",
    identityModes,
    emotionalTrends,
    relationalTrends,
    coreIdentity: mostCommon(identityModes),
    description: `
Your music reveals a consistent identity mode: ${mostCommon(identityModes)}.
Emotionally, you tend to move through: ${mostCommon(emotionalTrends)}.
Relationally, your songs suggest: ${mostCommon(relationalTrends)}.

This profile reflects how you process emotion, how you relate to others,
and how you move through the world — all through the lens of your music.
    `
  };
}
