import { LS_KEYS } from "./localStorageKeys";

export function getUsers(type) {
  try {
    const data = localStorage.getItem(type === "vets" ? LS_KEYS.vets : LS_KEYS.consumers);
    if (!data) return [];
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveUsers(type, users) {
  localStorage.setItem(type === "vets" ? LS_KEYS.vets : LS_KEYS.consumers, JSON.stringify(users));
}

export function simpleHash(str) {
  let hash = 0,
    i,
    chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash.toString();
}
