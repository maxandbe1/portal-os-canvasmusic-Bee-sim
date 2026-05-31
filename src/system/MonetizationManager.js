export const Monetization = {
  premium: false,
  unlocked: new Set(),

  unlock(feature) {
    // TODO: replace with real checkout
    alert(`Unlocking premium feature: ${feature}`);
    this.premium = true;
    this.unlocked.add(feature);
  },

  isUnlocked(feature) {
    return this.premium || this.unlocked.has(feature);
  }
};
