import { State } from './store.js';
import { EventHandler } from './Event/Events.js';

const state = new State();
EventHandler(state);

// updateToDoListUI(state);
