export function interpret(identity) {
  const { bass, mid, high, emotional, motion } = identity;

  // ME — personal meaning
  let me = "You feel deeply but quietly.";
  if (bass > high && bass > mid)
    me = "You are grounded, steady, and processing from the core.";
  if (high > bass && high > mid)
    me = "Your mind is active, scanning, reaching outward.";
  if (mid > bass && mid > high)
    me = "You are centered, balanced, and internally aligned.";

  // US — relational meaning
  let us = "There is connection without pressure.";
  if (motion.includes("Build"))
    us = "There is tension building between you and someone else.";
  if (emotional.includes("expansion"))
    us = "There is openness and curiosity in your connections.";
  if (emotional.includes("grounding"))
    us = "There is stability and trust in your relationships.";

  // WE — world meaning
  let we = "You move differently than the environment.";
  if (high > 180)
    we = "The world feels loud, fast, and you are adapting quickly.";
  if (bass > 180)
    we = "The world feels heavy, and you are anchoring yourself.";
  if (mid > 180)
    we = "The world feels balanced, and you are in sync with it.";

  return { me, us, we };
}
