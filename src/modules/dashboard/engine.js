export const id = "dashboard";
export const name = "Dashboard";

let state = {
  bootTime: new Date().toISOString()
};

export function load() {
  return state;
}

export function reset() {
  state = { bootTime: new Date().toISOString() };
  return state;
}
