import { TERRAIN } from "@/lib/wwn/world-tables";
import { val } from "@/lib/wwn/world";
import type { WorldData } from "@/lib/wwn/types";

type Pt = { x: number; y: number };
type Rect = { x: number; y: number; w: number; h: number };

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function terrainMeta(feature: WorldData["features"][number]) {
  const byId = TERRAIN.find((t) => t.id === val(feature.terrainId) || t.name === val(feature.terrainId));
  if (byId) return byId;
  const name = val(feature.name).toLowerCase();
  return TERRAIN.find((t) => name.includes(t.name.split(" ")[0]!.toLowerCase())) ?? TERRAIN[0]!;
}

function isHighland(id: string) {
  return /mountain|hill|volcano|canyon|pit/.test(id);
}

function displace(a: Pt, b: Pt, rng: () => number, depth: number, amp: number): Pt[] {
  if (depth <= 0) return [a, b];
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const off = (rng() - 0.5) * 2 * amp;
  const mid = { x: mx + nx * off, y: my + ny * off };
  const left = displace(a, mid, rng, depth - 1, amp * 0.55);
  const right = displace(mid, b, rng, depth - 1, amp * 0.55);
  return [...left.slice(0, -1), ...right];
}

function partition(rect: Rect, count: number, rng: () => number): { cells: Rect[]; walls: Pt[][] } {
  if (count <= 1) return { cells: [rect], walls: [] };
  const leftN = Math.max(1, Math.floor(count / 2));
  const rightN = count - leftN;
  const vertical = rect.w >= rect.h * 0.92;
  const t = 0.36 + rng() * 0.28;
  let a: Pt;
  let b: Pt;
  let left: Rect;
  let right: Rect;
  if (vertical) {
    const x = rect.x + rect.w * t;
    a = { x, y: rect.y };
    b = { x, y: rect.y + rect.h };
    left = { x: rect.x, y: rect.y, w: x - rect.x, h: rect.h };
    right = { x, y: rect.y, w: rect.x + rect.w - x, h: rect.h };
  } else {
    const y = rect.y + rect.h * t;
    a = { x: rect.x, y };
    b = { x: rect.x + rect.w, y };
    left = { x: rect.x, y: rect.y, w: rect.w, h: y - rect.y };
    right = { x: rect.x, y, w: rect.w, h: rect.y + rect.h - y };
  }
  const amp = Math.min(rect.w, rect.h) * 0.14;
  const wall = displace(a, b, rng, 3, amp);
  const L = partition(left, leftN, rng);
  const R = partition(right, rightN, rng);
  return { cells: [...L.cells, ...R.cells], walls: [wall, ...L.walls, ...R.walls] };
}

function polyPath(pts: Pt[], close = false): string {
  if (!pts.length) return "";
  const [first, ...rest] = pts;
  let d = `M ${first!.x.toFixed(1)} ${first!.y.toFixed(1)}`;
  for (const p of rest) d += ` L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
  if (close) d += " Z";
  return d;
}

function curvePath(pts: Pt[]): string {
  if (pts.length < 2) return "";
  if (pts.length === 2) return `M ${pts[0]!.x} ${pts[0]!.y} L ${pts[1]!.x} ${pts[1]!.y}`;
  let d = `M ${pts[0]!.x.toFixed(1)} ${pts[0]!.y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i += 1) {
    const p0 = pts[Math.max(0, i - 1)]!;
    const p1 = pts[i]!;
    const p2 = pts[i + 1]!;
    const p3 = pts[Math.min(pts.length - 1, i + 2)]!;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

function meander(start: Pt, end: Pt, rng: () => number): Pt[] {
  const steps = 7 + Math.floor(rng() * 6);
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const freq = 1.2 + rng() * 2.8;
  const phase = rng() * Math.PI * 2;
  const amp = 18 + rng() * 36;
  const side = rng() < 0.5 ? -1 : 1;
  const pts: Pt[] = [start];
  for (let i = 1; i < steps; i += 1) {
    const t = i / steps;
    const envelope = Math.sin(t * Math.PI);
    const wobble = Math.sin(t * Math.PI * freq + phase) * amp * side * envelope;
    const wander = (rng() - 0.5) * amp * 0.45 * envelope;
    pts.push({
      x: start.x + dx * t + nx * (wobble + wander),
      y: start.y + dy * t + ny * (wobble + wander),
    });
  }
  pts.push(end);
  return pts;
}

function lakePoly(cx: number, cy: number, rx: number, ry: number, rng: () => number): Pt[] {
  const n = 8 + Math.floor(rng() * 4);
  const pts: Pt[] = [];
  for (let i = 0; i < n; i += 1) {
    const a = (i / n) * Math.PI * 2 + rng() * 0.2;
    const jr = 0.72 + rng() * 0.45;
    pts.push({ x: cx + Math.cos(a) * rx * jr, y: cy + Math.sin(a) * ry * jr });
  }
  return pts;
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function seedOf(world: WorldData): number {
  return hash(
    [
      val(world.worldName),
      val(world.regionName),
      val(world.oceanSides, 0),
      val(world.riverCount, 0),
      val(world.lakeCount, 0),
      ...world.features.map((f) => val(f.name)),
      ...world.nations.map((n) => val(n.name)),
    ].join("|"),
  );
}

export function RegionMap({ world, className }: { world: WorldData; className?: string }) {
  const W = 720;
  const H = 460;
  const pad = 26;
  const ocean = val(world.oceanSides, 0);
  const region = val(world.regionName);
  const rng = mulberry32(seedOf(world));

  const land: Rect = { x: pad, y: pad, w: W - pad * 2, h: H - pad * 2 };
  const band = 22;
  if (ocean >= 1) {
    land.y += band;
    land.h -= band;
  }
  if (ocean >= 2) land.w -= band;
  if (ocean >= 3) land.h -= band;
  if (ocean >= 4) {
    land.x += band;
    land.w -= band;
  }

  const nations = world.nations.slice(0, 8);
  const nationCount = Math.max(nations.length, 1);
  const { cells, walls } = partition(land, nationCount, rng);
  const nationTint = ["#8a6a4a", "#4a6a52", "#6a5a48", "#4a5a6a", "#6a4a4a", "#5a5a3a", "#4a4a5a", "#6a5848"];

  const features = world.features.slice(0, 8);
  const cols = features.length <= 4 ? 2 : 3;
  const rows = Math.max(1, Math.ceil(features.length / cols));
  const cellW = land.w / cols;
  const cellH = land.h / rows;

  const blobs = features.map((f, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const home: Rect = {
      x: land.x + col * cellW,
      y: land.y + row * cellH,
      w: cellW,
      h: cellH,
    };
    const n = 2 + Math.floor(rng() * 3);
    const shapes: { cx: number; cy: number; rx: number; ry: number; rot: number }[] = [];
    for (let k = 0; k < n; k += 1) {
      const ox = (rng() - 0.35) * home.w * (k === 0 ? 0.22 : 0.48);
      const oy = (rng() - 0.35) * home.h * (k === 0 ? 0.22 : 0.48);
      const scale = k === 0 ? 0.92 : 0.55 + rng() * 0.28;
      shapes.push({
        cx: clamp(home.x + home.w * (0.42 + rng() * 0.16) + ox, land.x + 16, land.x + land.w - 16),
        cy: clamp(home.y + home.h * (0.42 + rng() * 0.16) + oy, land.y + 16, land.y + land.h - 16),
        rx: home.w * (0.38 + rng() * 0.16) * scale,
        ry: home.h * (0.36 + rng() * 0.18) * scale,
        rot: (rng() - 0.5) * 50,
      });
    }
    const label = { cx: home.x + home.w / 2, cy: home.y + home.h / 2 };
    return { f, meta: terrainMeta(f), shapes, label };
  });

  const lakeN = Math.max(0, Math.min(4, val(world.lakeCount, 1)));
  const lakes = Array.from({ length: lakeN }, () => {
    const cx = land.x + 40 + rng() * (land.w - 80);
    const cy = land.y + 36 + rng() * (land.h - 72);
    const rx = 22 + rng() * 28;
    const ry = 14 + rng() * 20;
    return { pts: lakePoly(cx, cy, rx, ry, rng), cx, cy };
  });

  const highlands = blobs.filter((b) => isHighland(b.meta.id));
  const riverN = Math.max(0, Math.min(8, val(world.riverCount, 3)));
  const oceanPorts: Pt[] = [];
  if (ocean >= 1) oceanPorts.push({ x: land.x + rng() * land.w, y: pad - 2 });
  if (ocean >= 2) oceanPorts.push({ x: W - pad + 2, y: land.y + rng() * land.h });
  if (ocean >= 3) oceanPorts.push({ x: land.x + rng() * land.w, y: H - pad + 2 });
  if (ocean >= 4) oceanPorts.push({ x: pad - 2, y: land.y + rng() * land.h });
  if (!oceanPorts.length) {
    oceanPorts.push({ x: land.x + rng() * land.w, y: land.y });
    oceanPorts.push({ x: land.x + land.w, y: land.y + rng() * land.h });
  }

  const rivers = Array.from({ length: riverN }, (_, i) => {
    const highland = highlands[i % Math.max(highlands.length, 1)];
    const start: Pt = highland
      ? { x: highland.label.cx + (rng() - 0.5) * 24, y: highland.label.cy + (rng() - 0.5) * 18 }
      : { x: land.x + 30 + rng() * (land.w - 60), y: land.y + 24 + rng() * (land.h * 0.45) };
    let end: Pt;
    if (lakes.length && i % 3 === 1) {
      const lake = lakes[i % lakes.length]!;
      end = { x: lake.cx, y: lake.cy };
    } else {
      end = oceanPorts[i % oceanPorts.length]!;
      end = { x: end.x + (rng() - 0.5) * 40, y: end.y + (rng() - 0.5) * 16 };
    }
    return { d: curvePath(meander(start, end, rng)), w: 1.6 + rng() * 1.1 };
  });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} role="img" aria-label={`Map of ${region}`}>
      <rect width={W} height={H} fill="#12151a" />
      {ocean >= 1 && <rect x={0} y={0} width={W} height={pad + 8} fill="#1c3038" />}
      {ocean >= 2 && <rect x={W - pad - 8} y={0} width={pad + 8} height={H} fill="#1c3038" />}
      {ocean >= 3 && <rect x={0} y={H - pad - 8} width={W} height={pad + 8} fill="#1c3038" />}
      {ocean >= 4 && <rect x={0} y={0} width={pad + 8} height={H} fill="#1c3038" />}
      <rect x={land.x} y={land.y} width={land.w} height={land.h} fill="#1a1812" />

      {cells.map((c, i) => (
        <rect
          key={`tint-${i}`}
          x={c.x}
          y={c.y}
          width={c.w}
          height={c.h}
          fill={nationTint[i % nationTint.length]}
          opacity="0.11"
        />
      ))}

      {blobs.map(({ f, meta, shapes }) => (
        <g key={f.id} opacity="0.88">
          {shapes.map((s, i) => (
            <ellipse
              key={`${f.id}-${i}`}
              cx={s.cx}
              cy={s.cy}
              rx={s.rx}
              ry={s.ry}
              fill={meta.color}
              transform={`rotate(${s.rot} ${s.cx} ${s.cy})`}
              opacity={i === 0 ? 0.9 : 0.72}
            />
          ))}
        </g>
      ))}

      {lakes.map((lake, i) => (
        <path key={`lake-${i}`} d={polyPath(lake.pts, true)} fill="#243844" stroke="#3d5a62" strokeWidth="1" />
      ))}

      {rivers.map((r, i) => (
        <path key={`river-${i}`} d={r.d} fill="none" stroke="#3d6a74" strokeWidth={r.w} strokeLinecap="round" />
      ))}

      {walls.map((wall, i) => (
        <path
          key={`wall-${i}`}
          d={polyPath(wall)}
          fill="none"
          stroke="#c45c4a"
          strokeWidth="1.7"
          strokeDasharray="7 5"
          strokeLinecap="round"
        />
      ))}
      <rect
        x={land.x}
        y={land.y}
        width={land.w}
        height={land.h}
        fill="none"
        stroke="#c45c4a"
        strokeWidth="1.2"
        strokeDasharray="7 5"
        opacity="0.55"
      />

      {blobs.map(({ f, label }) => (
        <text
          key={`${f.id}-label`}
          x={label.cx}
          y={label.cy}
          textAnchor="middle"
          fill="#ece6d8"
          fontSize="10"
          fontFamily="Outfit, sans-serif"
          style={{ paintOrder: "stroke", stroke: "#12100c", strokeWidth: 3 }}
        >
          {val(f.name).split(" of ")[0]}
        </text>
      ))}

      {nations.map((n, i) => {
        const c = cells[i] ?? cells[0]!;
        return (
          <text
            key={n.id}
            x={c.x + c.w / 2}
            y={c.y + 16}
            textAnchor="middle"
            fill="#ece6d8"
            fontSize="12"
            fontFamily="Cormorant Garamond, serif"
            style={{ paintOrder: "stroke", stroke: "#12100c", strokeWidth: 3 }}
          >
            {val(n.name)}
          </text>
        );
      })}

      <text x={14} y={16} textAnchor="start" fill="#9a9284" fontSize="11" fontFamily="Outfit, sans-serif">
        {region}
      </text>
      <text x={14} y={H - 8} textAnchor="start" fill="#6e675c" fontSize="9" fontFamily="Outfit, sans-serif">
        dashed red — national borders
      </text>
    </svg>
  );
}
