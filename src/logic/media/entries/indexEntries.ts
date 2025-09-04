// src/logic/media/entries/indexEntries.ts
import type { Entry } from './types';

import { ENTRIES_ANIMAL }    from './entriesAnimal';
import { ENTRIES_EPCOT }     from './entriesEpcot';
import { ENTRIES_EPIC }      from './entriesEpic';
import { ENTRIES_HOLLYWOOD } from './entriesHollywood';
import { ENTRIES_ISLANDS }   from './entriesIslands';
import { ENTRIES_MAGIC }     from './entriesMagic';
import { ENTRIES_UNIVERSAL } from './entriesUniversal';

const A = (v: unknown): Entry[] => (Array.isArray(v) ? v : []);

export const ENTRIES: Entry[] = [
  ...A(ENTRIES_ANIMAL),
  ...A(ENTRIES_EPCOT),
  ...A(ENTRIES_EPIC),
  ...A(ENTRIES_HOLLYWOOD),
  ...A(ENTRIES_ISLANDS),
  ...A(ENTRIES_MAGIC),
  ...A(ENTRIES_UNIVERSAL),
];

export {
  ENTRIES_ANIMAL,
  ENTRIES_EPCOT,
  ENTRIES_EPIC,
  ENTRIES_HOLLYWOOD,
  ENTRIES_ISLANDS,
  ENTRIES_MAGIC,
  ENTRIES_UNIVERSAL,
};
