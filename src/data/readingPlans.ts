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
  // Complete Bible books with correct IDs
  const books = [
    // Old Testament
    { id: 'gen', chapters: 50 },  // Genesis
    { id: 'exo', chapters: 40 },  // Exodus
    { id: 'lev', chapters: 27 },  // Leviticus
    { id: 'num', chapters: 36 },  // Numbers
    { id: 'deu', chapters: 34 },  // Deuteronomy
    { id: 'jos', chapters: 24 },  // Joshua
    { id: 'jdg', chapters: 21 },  // Judges
    { id: 'rut', chapters: 4 },   // Ruth
    { id: '1sa', chapters: 31 },  // 1 Samuel
    { id: '2sa', chapters: 24 },  // 2 Samuel
    { id: '1ki', chapters: 22 },  // 1 Kings
    { id: '2ki', chapters: 25 },  // 2 Kings
    { id: '1ch', chapters: 29 },  // 1 Chronicles
    { id: '2ch', chapters: 36 },  // 2 Chronicles
    { id: 'ezr', chapters: 10 },  // Ezra
    { id: 'neh', chapters: 13 },  // Nehemiah
    { id: 'est', chapters: 10 },  // Esther
    { id: 'job', chapters: 42 },  // Job
    { id: 'psa', chapters: 150 }, // Psalms
    { id: 'pro', chapters: 31 },  // Proverbs
    { id: 'ecc', chapters: 12 },  // Ecclesiastes
    { id: 'sos', chapters: 8 },   // Song of Solomon
    { id: 'isa', chapters: 66 },  // Isaiah
    { id: 'jer', chapters: 52 },  // Jeremiah
    { id: 'lam', chapters: 5 },   // Lamentations
    { id: 'eze', chapters: 48 },  // Ezekiel
    { id: 'dan', chapters: 12 },  // Daniel
    { id: 'hos', chapters: 14 },  // Hosea
    { id: 'joe', chapters: 3 },   // Joel
    { id: 'amo', chapters: 9 },   // Amos
    { id: 'oba', chapters: 1 },   // Obadiah
    { id: 'jon', chapters: 4 },   // Jonah
    { id: 'mic', chapters: 7 },   // Micah
    { id: 'nah', chapters: 3 },   // Nahum
    { id: 'hab', chapters: 3 },   // Habakkuk
    { id: 'zep', chapters: 3 },   // Zephaniah
    { id: 'hag', chapters: 2 },   // Haggai
    { id: 'zac', chapters: 14 },  // Zechariah
    { id: 'mal', chapters: 4 },   // Malachi
    // New Testament
    { id: 'mat', chapters: 28 },  // Matthew
    { id: 'mar', chapters: 16 },  // Mark
    { id: 'luk', chapters: 24 },  // Luke
    { id: 'joh', chapters: 21 },  // John
    { id: 'act', chapters: 28 },  // Acts
    { id: 'rom', chapters: 16 },  // Romans
    { id: '1co', chapters: 16 },  // 1 Corinthians
    { id: '2co', chapters: 13 },  // 2 Corinthians
    { id: 'gal', chapters: 6 },   // Galatians
    { id: 'eph', chapters: 6 },   // Ephesians
    { id: 'php', chapters: 4 },   // Philippians
    { id: 'col', chapters: 4 },   // Colossians
    { id: '1th', chapters: 5 },   // 1 Thessalonians
    { id: '2th', chapters: 3 },   // 2 Thessalonians
    { id: '1ti', chapters: 6 },   // 1 Timothy
    { id: '2ti', chapters: 4 },   // 2 Timothy
    { id: 'tit', chapters: 3 },   // Titus
    { id: 'phm', chapters: 1 },   // Philemon
    { id: 'heb', chapters: 13 },  // Hebrews
    { id: 'jam', chapters: 5 },   // James
    { id: '1pe', chapters: 5 },   // 1 Peter
    { id: '2pe', chapters: 3 },   // 2 Peter
    { id: '1jo', chapters: 5 },   // 1 John
    { id: '2jo', chapters: 1 },   // 2 John
    { id: '3jo', chapters: 1 },   // 3 John
    { id: 'jud', chapters: 1 },   // Jude
    { id: 'rev', chapters: 22 },  // Revelation
  ];
  
  // Total chapters: 1189, distribute over 365 days (~3.26 chapters/day)
  let day = 1;
  let chapterCount = 0;
  
  for (const book of books) {
    for (let chapter = 1; chapter <= book.chapters; chapter++) {
      const dayIndex = Math.min(day, 365);
      if (!readings[dayIndex - 1]) {
        readings[dayIndex - 1] = { day: dayIndex, readings: [] };
      }
      readings[dayIndex - 1].readings.push({ book: book.id, chapter });
      chapterCount++;
      // Move to next day every 3-4 chapters
      if (chapterCount % 3 === 0) day++;
    }
  }
  
  // Ensure we have exactly 365 days
  while (readings.length < 365) {
    readings.push({ day: readings.length + 1, readings: [] });
  }
  
  return readings.slice(0, 365);
}

function generateNT90Plan() {
  const readings = [];
  // New Testament books with correct IDs
  const ntBooks = [
    { id: 'mat', chapters: 28 },  // Matthew
    { id: 'mar', chapters: 16 },  // Mark
    { id: 'luk', chapters: 24 },  // Luke
    { id: 'joh', chapters: 21 },  // John
    { id: 'act', chapters: 28 },  // Acts
    { id: 'rom', chapters: 16 },  // Romans
    { id: '1co', chapters: 16 },  // 1 Corinthians
    { id: '2co', chapters: 13 },  // 2 Corinthians
    { id: 'gal', chapters: 6 },   // Galatians
    { id: 'eph', chapters: 6 },   // Ephesians
    { id: 'php', chapters: 4 },   // Philippians
    { id: 'col', chapters: 4 },   // Colossians
    { id: '1th', chapters: 5 },   // 1 Thessalonians
    { id: '2th', chapters: 3 },   // 2 Thessalonians
    { id: '1ti', chapters: 6 },   // 1 Timothy
    { id: '2ti', chapters: 4 },   // 2 Timothy
    { id: 'tit', chapters: 3 },   // Titus
    { id: 'phm', chapters: 1 },   // Philemon
    { id: 'heb', chapters: 13 },  // Hebrews
    { id: 'jam', chapters: 5 },   // James
    { id: '1pe', chapters: 5 },   // 1 Peter
    { id: '2pe', chapters: 3 },   // 2 Peter
    { id: '1jo', chapters: 5 },   // 1 John
    { id: '2jo', chapters: 1 },   // 2 John
    { id: '3jo', chapters: 1 },   // 3 John
    { id: 'jud', chapters: 1 },   // Jude
    { id: 'rev', chapters: 22 },  // Revelation
  ];
  
  // Total NT chapters: 260, distribute over 90 days (~2.9 chapters/day)
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
  
  // Ensure we have exactly 90 days
  while (readings.length < 90) {
    readings.push({ day: readings.length + 1, readings: [] });
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
