import calendar from "./calendar.js";
import { openWindowAddEvent } from "../../utils/utils_ipc.js";

// Display Calendar
calendar();

// Handle Add Event Button
const addEventButton = document?.querySelector("#calendar-addEvent");
addEventButton?.addEventListener('click', () => openWindowAddEvent());
