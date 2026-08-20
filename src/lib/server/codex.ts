import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { classLabel } from "@/lib/wwn/core";
import type { CharacterData, CharacterRecord, WorldData, WorldRecord } from "@/lib/wwn/types";
import { normalizeWorld } from "@/lib/wwn/world";
import { uid } from "@/lib/utils";

type CharacterRow = {
  id: string;
  user_id: string;
  name: string;
  class_label: string;
  level: number;
  data: string;
  created_at: string;
  updated_at: string;
};

type WorldRow = {
  id: string;
  user_id: string;
  name: string;
  region: string;
  data: string;
  created_at: string;
  updated_at: string;
};

function parseCharacter(row: CharacterRow): CharacterRecord {
  return {
    id: row.id,
    user_id: row.user_id,
    name: row.name,
    class_label: row.class_label,
    level: Number(row.level),
    data: JSON.parse(row.data) as CharacterData,
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
  };
}

function parseWorld(row: WorldRow): WorldRecord {
  return {
    id: row.id,
    user_id: row.user_id,
    name: row.name,
    region: row.region,
    data: normalizeWorld(JSON.parse(row.data)),
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
  };
}

export const listCharacters = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<CharacterRow>`
      select id, user_id, name, class_label, level, data, created_at, updated_at
      from characters
      where user_id = ${context.userId}
      order by updated_at desc
    `;
    return rows.map(parseCharacter);
  });

export const getCharacter = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((id: string) => id)
  .handler(async ({ context, data: id }) => {
    const sql = await getSql();
    const rows = await sql<CharacterRow>`
      select id, user_id, name, class_label, level, data, created_at, updated_at
      from characters
      where id = ${id} and user_id = ${context.userId}
      limit 1
    `;
    return rows[0] ? parseCharacter(rows[0]) : null;
  });

export const saveCharacter = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { id?: string; data: CharacterData }) => input)
  .handler(async ({ context, data: input }) => {
    const sql = await getSql();
    const id = input.id || uid();
    const label = classLabel(input.data.classId, input.data.traditions);
    const payload = JSON.stringify(input.data);
    const existing = await sql<{ id: string }>`
      select id from characters where id = ${id} and user_id = ${context.userId} limit 1
    `;
    if (existing[0]) {
      await sql`
        update characters
        set name = ${input.data.name},
            class_label = ${label},
            level = ${input.data.level},
            data = ${payload},
            updated_at = now()
        where id = ${id} and user_id = ${context.userId}
      `;
    } else {
      await sql`
        insert into characters (id, user_id, name, class_label, level, data)
        values (${id}, ${context.userId}, ${input.data.name}, ${label}, ${input.data.level}, ${payload})
      `;
    }
    return { id };
  });

export const deleteCharacter = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: string) => id)
  .handler(async ({ context, data: id }) => {
    const sql = await getSql();
    await sql`delete from characters where id = ${id} and user_id = ${context.userId}`;
    return { ok: true as const };
  });

export const listWorlds = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<WorldRow>`
      select id, user_id, name, region, data, created_at, updated_at
      from worlds
      where user_id = ${context.userId}
      order by updated_at desc
    `;
    return rows.map(parseWorld);
  });

export const getWorld = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((id: string) => id)
  .handler(async ({ context, data: id }) => {
    const sql = await getSql();
    const rows = await sql<WorldRow>`
      select id, user_id, name, region, data, created_at, updated_at
      from worlds
      where id = ${id} and user_id = ${context.userId}
      limit 1
    `;
    return rows[0] ? parseWorld(rows[0]) : null;
  });

export const saveWorld = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { id?: string; data: WorldData }) => input)
  .handler(async ({ context, data: input }) => {
    const sql = await getSql();
    const id = input.id || uid();
    const payload = JSON.stringify(input.data);
    const worldName = input.data.worldName.value;
    const regionName = input.data.regionName.value;
    const existing = await sql<{ id: string }>`
      select id from worlds where id = ${id} and user_id = ${context.userId} limit 1
    `;
    if (existing[0]) {
      await sql`
        update worlds
        set name = ${worldName},
            region = ${regionName},
            data = ${payload},
            updated_at = now()
        where id = ${id} and user_id = ${context.userId}
      `;
    } else {
      await sql`
        insert into worlds (id, user_id, name, region, data)
        values (${id}, ${context.userId}, ${worldName}, ${regionName}, ${payload})
      `;
    }
    return { id };
  });

export const deleteWorld = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: string) => id)
  .handler(async ({ context, data: id }) => {
    const sql = await getSql();
    await sql`delete from worlds where id = ${id} and user_id = ${context.userId}`;
    return { ok: true as const };
  });
