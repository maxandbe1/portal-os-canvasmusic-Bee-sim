// src/modules/dashboard/bridge.js

import {
  initDashboard,
  setActiveView,
  setWidgets,
  getDashboardState
} from "./engine.js";

export const DashboardBridge = {
  init: initDashboard,
  setView: setActiveView,
  setWidgets,
  state: getDashboardState
};

export default DashboardBridge;

