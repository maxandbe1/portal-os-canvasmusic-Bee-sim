// src/modules/dashboard/engine.js

let dashboardState = {
  activeView: "home",
  widgets: []
};

export function initDashboard() {
  return dashboardState;
}

export function setActiveView(view) {
  dashboardState = { ...dashboardState, activeView: view };
  return dashboardState;
}

export function setWidgets(widgets) {
  dashboardState = { ...dashboardState, widgets: widgets || [] };
  return dashboardState;
}

export function getDashboardState() {
  return dashboardState;
}

