import type { ReadingPlan } from '@/types/bible';

export const readingPlans: ReadingPlan[] = [
  {
    id: 'bible-in-year',
    name: 'Bible in a Year',
    description: 'Read the entire Bible in 365 days',
    duration: 365,
    readings: generateBibleInYearPlan(),
  },
  {
    id: 'new-testament-90',
    name: 'New Testament in 90 Days',
    description: 'Complete the New Testament in 3 months',
    duration: 90,
    readings: generateNT90Plan(),
  },
  {
    id: 'psalms-proverbs-30',
    name: 'Psalms & Proverbs',
    description: '30-day devotional through Psalms and Proverbs',
    duration: 30,
    readings: generatePsalmsProverbsPlan(),
  },
  {
    id: 'gospels-30',
    name: 'The Gospels',
    description: 'Read all four Gospels in 30 days',
    duration: 30,
    readings: generateGospelsPlan(),
  },
];

function generateBibleInYearPlan() {
  const readings = [];
  const books = [
    { id: 'gen', chapters: 50 }, { id: 'exo', chapters: 40 }, { id: 'lev', chapters: 27 },
    { id: 'num', chapters: 36 }, { id: 'deu', chapters: 34 }, { id: 'jos', chapters: 24 },
    { id: 'jdg', chapters: 21 }, { id: 'rut', chapters: 4 }, { id: '1sa', chapters: 31 },
    { id: '2sa', chapters: 24 }, { id: '1ki', chapters: 22 }, { id: '2ki', chapters: 25 },
    { id: '1ch', chapters: 29 }, { id: '2ch', chapters: 36 }, { id: 'ezr', chapters: 10 },
    { id: 'neh', chapters: 13 }, { id: 'est', chapters: 10 }, { id: 'job', chapters: 42 },
    { id: 'psa', chapters: 150 }, { id: 'pro', chapters: 31 }, { id: 'ecc', chapters: 12 },
    { id: 'sos', chapters: 8 }, { id: 'isa', chapters: 66 }, { id: 'jer', chapters: 52 },
    { id: 'lam', chapters: 5 }, { id: 'eze', chapters: 48 }, { id: 'dan', chapters: 12 },
    { id: 'hos', chapters: 14 }, { id: 'joe', chapters: 3 }, { id: 'amo', chapters: 9 },
    { id: 'oba', chapters: 1 }, { id: 'jon', chapters: 4 }, { id: 'mic', chapters: 7 },
    { id: 'nah', chapters: 3 }, { id: 'hab', chapters: 3 }, { id: 'zep', chapters: 3 },
    { id: 'hag', chapters: 2 }, { id: 'zac', chapters: 14 }, { id: 'mal', chapters: 4 },
    { id: 'mat', chapters: 28 }, { id: 'mar', chapters: 16 }, { id: 'luk', chapters: 24 },
    { id: 'joh', chapters: 21 }, { id: 'act', chapters: 28 }, { id: 'rom', chapters: 16 },
    { id: '1co', chapters: 16 }, { id: '2co', chapters: 13 }, { id: 'gal', chapters: 6 },
    { id: 'eph', chapters: 6 }, { id: 'php', chapters: 4 }, { id: 'col', chapters: 4 },
    { id: '1th', chapters: 5 }, { id: '2th', chapters: 3 }, { id: '1ti', chapters: 6 },
    { id: '2ti', chapters: 4 }, { id: 'tit', chapters: 3 }, { id: 'phm', chapters: 1 },
    { id: 'heb', chapters: 13 }, { id: 'jam', chapters: 5 }, { id: '1pe', chapters: 5 },
    { id: '2pe', chapters: 3 }, { id: '1jo', chapters: 5 }, { id: '2jo', chapters: 1 },
    { id: '3jo', chapters: 1 }, { id: 'jud', chapters: 1 }, { id: 'rev', chapters: 22 },
  ];
  
  let day = 1;
  let chapterIndex = 0;
  
  for (const book of books) {
    for (let chapter = 1; chapter <= book.chapters; chapter++) {
      const dayIndex = day <= 365 ? day : 365;
      if (!readings[dayIndex - 1]) {
        readings[dayIndex - 1] = { day: dayIndex, readings: [] };
      }
      readings[dayIndex - 1].readings.push({ book: book.id, chapter });
      chapterIndex++;
      if (chapterIndex % 3 === 0) day++;
    }
  }
  
  return readings.slice(0, 365);
}

function generateNT90Plan() {
  const readings = [];
  const ntBooks = [
    { id: 'mat', chapters: 28 }, { id: 'mar', chapters: 16 }, { id: 'luk', chapters: 24 },
    { id: 'joh', chapters: 21 }, { id: 'act', chapters: 28 }, { id: 'rom', chapters: 16 },
    { id: '1co', chapters: 16 }, { id: '2co', chapters: 13 }, { id: 'gal', chapters: 6 },
    { id: 'eph', chapters: 6 }, { id: 'php', chapters: 4 }, { id: 'col', chapters: 4 },
    { id: '1th', chapters: 5 }, { id: '2th', chapters: 3 }, { id: '1ti', chapters: 6 },
    { id: '2ti', chapters: 4 }, { id: 'tit', chapters: 3 }, { id: 'phm', chapters: 1 },
    { id: 'heb', chapters: 13 }, { id: 'jam', chapters: 5 }, { id: '1pe', chapters: 5 },
    { id: '2pe', chapters: 3 }, { id: '1jo', chapters: 5 }, { id: '2jo', chapters: 1 },
    { id: '3jo', chapters: 1 }, { id: 'jud', chapters: 1 }, { id: 'rev', chapters: 22 },
  ];
  
  let day = 1;
  let chapterCount = 0;
  
  for (const book of ntBooks) {
    for (let chapter = 1; chapter <= book.chapters; chapter++) {
      const dayIndex = Math.min(day, 90);
      if (!readings[dayIndex - 1]) {
        readings[dayIndex - 1] = { day: dayIndex, readings: [] };
      }
      readings[dayIndex - 1].readings.push({ book: book.id, chapter });
      chapterCount++;
      if (chapterCount % 3 === 0) day++;
    }
  }
  
  return readings.slice(0, 90);
}

function generatePsalmsProverbsPlan() {
  const readings = [];
  
  for (let day = 1; day <= 30; day++) {
    const psalmStart = (day - 1) * 5 + 1;
    const dayReadings = [];
    
    for (let i = 0; i < 5 && psalmStart + i <= 150; i++) {
      dayReadings.push({ book: 'psa', chapter: psalmStart + i });
    }
    
    if (day <= 31) {
      dayReadings.push({ book: 'pro', chapter: day });
    }
    
    readings.push({ day, readings: dayReadings });
  }
  
  return readings;
}

function generateGospelsPlan() {
  const readings = [];
  const gospels = [
    { id: 'mat', chapters: 28 },
    { id: 'mar', chapters: 16 },
    { id: 'luk', chapters: 24 },
    { id: 'joh', chapters: 21 },
  ];
  
  let day = 1;
  let chapterCount = 0;
  
  for (const gospel of gospels) {
    for (let chapter = 1; chapter <= gospel.chapters; chapter++) {
      const dayIndex = Math.min(day, 30);
      if (!readings[dayIndex - 1]) {
        readings[dayIndex - 1] = { day: dayIndex, readings: [] };
      }
      readings[dayIndex - 1].readings.push({ book: gospel.id, chapter });
      chapterCount++;
      if (chapterCount % 3 === 0) day++;
    }
  }
  
  return readings.slice(0, 30);
}

export function getPlanById(id: string): ReadingPlan | undefined {
  return readingPlans.find(p => p.id === id);
}
