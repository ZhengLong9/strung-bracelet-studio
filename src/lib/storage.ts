import type { SavedBraceletEntry } from "../types/bracelet";

const SAVED_KEY = "bracelet-maker:savedBracelets";

function readList(key: string): SavedBraceletEntry[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as SavedBraceletEntry[]) : [];
  } catch {
    return [];
  }
}

function writeList(key: string, list: SavedBraceletEntry[]) {
  localStorage.setItem(key, JSON.stringify(list));
}

export function saveBracelet(entry: SavedBraceletEntry) {
  writeList(SAVED_KEY, [...readList(SAVED_KEY), entry]);
}

export function getSavedBracelets(): SavedBraceletEntry[] {
  return readList(SAVED_KEY);
}

export function deleteSavedBracelet(id: string) {
  writeList(
    SAVED_KEY,
    readList(SAVED_KEY).filter((entry) => entry.id !== id),
  );
}
