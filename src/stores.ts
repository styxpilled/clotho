import { writable } from "svelte/store";

export const clicked = writable(false);
export const active = writable(false);
export const view = writable(false);

export function toggle() {
  clicked.set(true);
  active.set(true);
}

export function close() {
  clicked.set(false);
  active.set(false);
}

export function viewSaved() {
  view.set(true);
}