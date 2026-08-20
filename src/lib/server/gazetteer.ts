import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import type { WorldData } from "@/lib/wwn/types";
import { val } from "@/lib/wwn/world";

export const writeGazetteer = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { world: WorldData }) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: false as const, error: "Gazetteer is unavailable in this environment." };
    }

    const w = data.world;
    const ocean = val(w.oceanSides, 0);
    const prompt = `Write a compact campaign gazetteer (450-700 words) for a Worlds Without Number sandbox. Tone: twilight-age, concrete, no purple prose, no gold-and-glory clichés. Use the facts below as canon — do not invent a different map.

World: ${val(w.worldName)}
Scope: ${val(w.scope)}
Physics: ${val(w.physics)}
Cosmology: ${val(w.cosmology)}
Distant power: ${val(w.empires)}
Travel: ${val(w.interconnected)}
Recent event: ${val(w.recentEvent)}

Region: ${val(w.regionName)} (ocean on ${ocean} side${ocean === 1 ? "" : "s"})
Terrain:
${w.features.map((f) => `- ${val(f.name)}: ${val(f.description)} / ${val(f.danger)} / ${val(f.use)} / last: ${val(f.lastEvent)} / antagonist: ${val(f.antagonist)} / quirk: ${val(f.quirk)}`).join("\n")}

Nations:
${w.nations.map((n) => `- ${val(n.name)} (${val(n.theme)}; values: ${(n.values ?? []).map((v) => v.value).join(" / ")}): ${val(n.blurb)} Wants ${val(n.wants)}. History: ${n.history.map((h) => h.value).join("; ")}`).join("\n")}

Relationships:
${w.relationships.map((r) => `- ${val(r.from)} → ${val(r.to)}: ${val(r.text)}`).join("\n")}

Kingdom of first play: ${val(w.kingdom.name)}
Language: ${val(w.kingdom.language)}
Ruler: ${val(w.kingdom.ruler)} — ${val(w.kingdom.rulerStyle)}
Form of rule: ${val(w.kingdom.formOfRule)}; ${val(w.kingdom.rulerCount)}; ${val(w.kingdom.rulingClass)}; ${val(w.kingdom.legitimacy)}
Density / stability: ${val(w.kingdom.density)} / ${val(w.kingdom.stability)}
Values: ${(w.kingdom.values ?? []).map((v) => v.value).join("; ")}
Organization: ${val(w.kingdom.organization)}
Aesthetic: ${val(w.kingdom.aesthetic)}
Enemy: ${val(w.kingdom.enemy)}
Problems: ${w.kingdom.problems.map((p) => p.value).join("; ")}
Fortune: ${val(w.kingdom.fortune)}
Society: ${val(w.kingdom.society)}
${val(w.kingdom.ethnicNotes)}
Cities: ${w.kingdom.cities.map((c) => `${val(c.name)} (${val(c.size)}; ${c.tags.map((t) => t.value).join(", ")})`).join("; ")}
Courts: ${(w.kingdom.courts ?? []).map((c) => `${val(c.name)} (${val(c.type)}; ${c.tags.map((t) => t.value).join(", ")}): ${val(c.theme)}`).join("; ")}
Ruins: ${(w.kingdom.ruins ?? []).map((r) => `${val(r.name)} — ${val(r.kind)} [${r.tags.map((t) => t.value).join(", ")}]`).join("; ")}

Structure the piece as:
1. A 3-sentence opening a GM can read aloud.
2. How the region feels to travel (roads, sea, arratu).
3. What each nation wants this season.
4. Three ready adventure hooks rooted in the kingdom.
No bullet-only dump — prose a GM can lift.`;

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        max_tokens: 900,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) {
      return { ok: false as const, error: `Gazetteer failed (${res.status}).` };
    }
    const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const text = body.choices?.[0]?.message?.content?.trim() ?? "";
    if (!text) return { ok: false as const, error: "The gazetteer came back empty." };
    return { ok: true as const, text };
  });
