export const id = "identity";
export const name = "Identity";

let state = {
  userId: "guest",
  sessionId: crypto.randomUUID()
};

export function load() {
  return state;
}

export function update(next) {
  state = { ...state, ...next };
  return state;
}

export function reset() {
  state = {
    userId: "guest",
    sessionId: crypto.randomUUID()
  };
  return state;
}
