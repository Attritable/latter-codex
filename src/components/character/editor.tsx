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
