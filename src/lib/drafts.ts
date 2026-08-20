import type { CharacterData, WorldData } from "@/lib/wwn/types";
import { normalizeWorld } from "@/lib/wwn/world";

const WORLD_DRAFT = "codex.world.draft";
const WORLD_AUTOSAVE = "codex.world.autosave";
const CHAR_DRAFT = "codex.character.draft";
const CHAR_AUTOSAVE = "codex.character.autosave";

function readJson<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function writeJson(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full or blocked */
  }
}

function drop(key: string): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

export function saveWorldDraft(world: WorldData): void {
  writeJson(WORLD_DRAFT, world);
}

export function loadWorldDraft(): WorldData | null {
  const raw = readJson<unknown>(WORLD_DRAFT);
  if (!raw) return null;
  try {
    return normalizeWorld(raw);
  } catch {
    return null;
  }
}

export function clearWorldDraft(): void {
  drop(WORLD_DRAFT);
  drop(WORLD_AUTOSAVE);
}

export function markWorldPendingSave(): void {
  writeJson(WORLD_AUTOSAVE, true);
}

export function worldPendingSave(): boolean {
  return readJson<boolean>(WORLD_AUTOSAVE) === true;
}

export function saveCharacterDraft(data: CharacterData): void {
  writeJson(CHAR_DRAFT, data);
}

export function loadCharacterDraft(): CharacterData | null {
  return readJson<CharacterData>(CHAR_DRAFT);
}

export function clearCharacterDraft(): void {
  drop(CHAR_DRAFT);
  drop(CHAR_AUTOSAVE);
}

export function markCharacterPendingSave(): void {
  writeJson(CHAR_AUTOSAVE, true);
}

export function characterPendingSave(): boolean {
  return readJson<boolean>(CHAR_AUTOSAVE) === true;
}

export function safeReturnPath(next: unknown, fallback = "/"): string {
  if (typeof next !== "string") return fallback;
  if (!next.startsWith("/") || next.startsWith("//")) return fallback;
  return next;
}

const RETURN_PATH = "codex.auth.next";

export function saveReturnPath(path: string): void {
  writeJson(RETURN_PATH, safeReturnPath(path, "/"));
}

export function consumeReturnPath(): string {
  const stored = readJson<string>(RETURN_PATH);
  drop(RETURN_PATH);
  return safeReturnPath(stored, "/");
}

export function peekReturnPath(): string | null {
  const stored = readJson<string>(RETURN_PATH);
  if (!stored) return null;
  return safeReturnPath(stored, "/");
}
