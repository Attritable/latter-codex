import { useNavigate } from "@tanstack/react-router";
import { Dices, Loader2, Save } from "lucide-react";
import { useMemo, useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import {
  characterPendingSave,
  clearCharacterDraft,
  loadCharacterDraft,
  markCharacterPendingSave,
  saveCharacterDraft,
  saveReturnPath,
} from "@/lib/drafts";
import { saveCharacter } from "@/lib/server/codex";
import { cn, pick } from "@/lib/utils";
import { BACKGROUNDS, backgroundById } from "@/lib/wwn/backgrounds";
import {
  applyBackgroundSkills,
  applyTraditionSkills,
  blankCharacter,
  derive,
  generateCharacter,
  gainSkill,
  languageList,
  rollAttributes,
  rollHitPoints,
} from "@/lib/wwn/character";
import { CLASSES, TRADITIONS, allowedTraditions } from "@/lib/wwn/classes";
import { ALL_SKILLS, ARRAY_SCORES, ATTRIBUTE_LABELS, ATTRIBUTES, COMBAT_SKILLS, formatMod, isExpertLike, isWarriorLike } from "@/lib/wwn/core";
import { PACKAGES, applyPackage } from "@/lib/wwn/equipment";
import { FOCI, focusById, focusSlotCost, isRepeatableFocus } from "@/lib/wwn/foci";
import { artsForTradition, spellsForTraditions, startingArtCount, startingSpellCount } from "@/lib/wwn/magic";
import { GOALS, TIES, personName } from "@/lib/wwn/names";
import type { Attribute, CharacterData, ClassId, SkillName } from "@/lib/wwn/types";
import { CharacterRail, CharacterSheet } from "./sheet";

const STEPS = ["Attributes", "Past", "Class", "Foci", "Arts", "Kit", "Name"] as const;

function focusSlots(classId: ClassId) {
  return {
    any: 1,
    expert: isExpertLike(classId) ? 1 : 0,
    warrior: isWarriorLike(classId) ? 1 : 0,
  };
}

function kindUsed(foci: CharacterData["foci"], kind: "combat" | "noncombat") {
  return foci
    .filter((f) => focusById(f.id)?.kind === kind)
    .reduce((n, f) => n + f.level, 0);
}

function canSpend(def: NonNullable<ReturnType<typeof focusById>>, foci: CharacterData["foci"], slots: ReturnType<typeof focusSlots>, extra: number) {
  const max = slots.any + slots.expert + slots.warrior;
  if (focusSlotCost(foci) + extra > max) return false;
  if (def.kind === "combat") return kindUsed(foci, "combat") + extra <= slots.warrior + slots.any;
  if (def.kind === "noncombat") return kindUsed(foci, "noncombat") + extra <= slots.expert + slots.any;
  return true;
}

type FocusIntent = "take" | "raise" | "copy" | "clear" | "blocked";

function focusIntent(
  def: NonNullable<ReturnType<typeof focusById>>,
  foci: CharacterData["foci"],
  slots: ReturnType<typeof focusSlots>,
): FocusIntent {
  const taken = foci.filter((f) => f.id === def.id);
  if (isRepeatableFocus(def)) {
    if (canSpend(def, foci, slots, 1)) return taken.length ? "copy" : "take";
    return taken.length ? "clear" : "blocked";
  }
  const existing = taken[0];
  if (!existing) return canSpend(def, foci, slots, 1) ? "take" : "blocked";
  if (existing.level < def.maxLevel && canSpend(def, foci, slots, 1)) return "raise";
  return "clear";
}

const INTENT_LABEL: Record<FocusIntent, string> = {
  take: "Next click: take I",
  raise: "Next click: raise to II",
  copy: "Next click: another I",
  clear: "Next click: reset to off",
  blocked: "No free picks",
};
