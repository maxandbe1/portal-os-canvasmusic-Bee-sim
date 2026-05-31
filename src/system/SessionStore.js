export const SessionStore = {
  sessions: [],

  addSession(session) {
    this.sessions.push({
      ...session,
      timestamp: Date.now()
    });
  },

  getSessions() {
    return this.sessions;
  },

  getLast(n) {
    return this.sessions.slice(-n);
  }
};
