import { useState, useEffect, useCallback } from 'react';
import { BibleApiService } from '../services/bibleApi';
import { IndexedDbService } from '../services/indexedDbService';
import type { Book, BookMetadata, ParallelVerse, Verse } from '../types/bible';

interface UseParallelReadingProps {
  dbService: IndexedDbService | null;
  selectedBook: BookMetadata | null;
  currentChapter: number;
  primaryLanguage: string;
}

interface ParallelData {
  verseNumber: number;
  translations: ParallelVerse[];
}

const languageNames: Record<string, string> = {
  mg: 'Malagasy',
  en: 'English',
  ko: '한국어',
  sw: 'Kiswahili',
};

// Book ID to filename mapping for each language - AJOUT DU SWAHILI
const bookFilesByLanguage: Record<string, Record<string, string>> = {
  mg: {
    gen: 'Genesisy.json', exo: 'Eksodosy.json', lev: 'Levitikosy.json',
    num: 'Nomery.json', deu: 'Deoteronomia.json', jos: 'Josoa.json',
    jdg: 'Mpitsara.json', rut: 'Rota.json', '1sa': 'I Samoela.json',
    '2sa': 'II Samoela.json', '1ki': 'I Mpanjaka.json', '2ki': 'II Mpanjaka.json',
    '1ch': 'I Tantara.json', '2ch': 'II Tantara.json', ezr: 'Ezra.json',
    neh: 'Nehemia.json', est: 'Estera.json', job: 'Joba.json',
    psa: 'Salamo.json', pro: 'Ohabolana.json', ecc: 'Mpitoriteny.json',
    sos: 'Tononkiran\'i Solomona.json', isa: 'Isaia.json', jer: 'Jeremia.json',
    lam: 'Fitomaniana.json', eze: 'Ezekiela.json', dan: 'Daniela.json',
    hos: 'Hosea.json', joe: 'Joela.json', amo: 'Amosa.json',
    oba: 'Obadia.json', jon: 'Jona.json', mic: 'Mika.json',
    nah: 'Nahoma.json', hab: 'Habakoka.json', zep: 'Zefania.json',
    hag: 'Hagay.json', zac: 'Zakaria.json', mal: 'Malakia.json',
    mat: 'Matio.json', mar: 'Marka.json', luk: 'Lioka.json',
    joh: 'Jaona.json', act: 'Asan\'ny Apostoly.json', rom: 'Romana.json',
    '1co': 'I Korintiana.json', '2co': 'II Korintiana.json', gal: 'Galatiana.json',
    eph: 'Efesiana.json', php: 'Filipiana.json', col: 'Kolosiana.json',
    '1th': 'I Tesaloniana.json', '2th': 'II Tesaloniana.json', '1ti': 'I Timoty.json',
    '2ti': 'II Timoty.json', tit: 'Titosy.json', phm: 'Filemona.json',
    heb: 'Hebreo.json', jam: 'Jakoba.json', '1pe': 'I Petera.json',
    '2pe': 'II Petera.json', '1jo': 'I Jaona.json', '2jo': 'II Jaona.json',
    '3jo': 'III Jaona.json', jud: 'Joda.json', rev: 'Apokalypsy.json',
  },
  en: {
    gen: 'Genesis.json', exo: 'Exodus.json', lev: 'Leviticus.json',
    num: 'Numbers.json', deu: 'Deuteronomy.json', jos: 'Joshua.json',
    jdg: 'Judges.json', rut: 'Ruth.json', '1sa': '1 Samuel.json',
    '2sa': '2 Samuel.json', '1ki': '1 Kings.json', '2ki': '2 Kings.json',
    '1ch': '1 Chronicles.json', '2ch': '2 Chronicles.json', ezr: 'Ezra.json',
    neh: 'Nehemiah.json', est: 'Esther.json', job: 'Job.json',
    psa: 'Psalms.json', pro: 'Proverbs.json', ecc: 'Ecclesiastes.json',
    sos: 'Song of Solomon.json', isa: 'Isaiah.json', jer: 'Jeremiah.json',
    lam: 'Lamentations.json', eze: 'Ezekiel.json', dan: 'Daniel.json',
    hos: 'Hosea.json', joe: 'Joel.json', amo: 'Amos.json',
    oba: 'Obadiah.json', jon: 'Jonah.json', mic: 'Micah.json',
    nah: 'Nahum.json', hab: 'Habakkuk.json', zep: 'Zephania.json',
    hag: 'Haggai.json', zac: 'Zechariah.json', mal: 'Malachi.json',
    mat: 'Matthew.json', mar: 'Mark.json', luk: 'Luke.json',
    joh: 'John.json', act: 'Acts.json', rom: 'Romans.json',
    '1co': '1 Corinthians.json', '2co': '2 Corinthians.json', gal: 'Galatians.json',
    eph: 'Ephesians.json', php: 'Philippians.json', col: 'Colossians.json',
    '1th': '1 Thessalonians.json', '2th': '2 Thessalonians.json', '1ti': '1 Timothy.json',
    '2ti': '2 Timothy.json', tit: 'Titus.json', phm: 'Philemon.json',
    heb: 'Hebrews.json', jam: 'James.json', '1pe': '1 Peter.json',
    '2pe': '2 Peter.json', '1jo': '1 John.json', '2jo': '2 John.json',
    '3jo': '3 John.json', jud: 'Jude.json', rev: 'Revelation.json',
  },
  ko: {
    gen: '창세기.json', exo: '출애굽기.json', lev: '레위기.json',
    num: '민수기.json', deu: '신명기.json', jos: '여호수아.json',
    jdg: '사사기.json', rut: '룻기.json', '1sa': '사무엘상.json',
    '2sa': '사무엘하.json', '1ki': '열왕기상.json', '2ki': '열왕기하.json',
    '1ch': '역대상.json', '2ch': '역대하.json', ezr: '에스라.json',
    neh: '느헤미야.json', est: '에스더.json', job: '욥기.json',
    psa: '시편.json', pro: '잠언.json', ecc: '전도서.json',
    sos: '아가.json', isa: '이사야.json', jer: '예레미야.json',
    lam: '예레미야애가.json', eze: '에스겔.json', dan: '다니엘.json',
    hos: '호세아.json', joe: '요엘.json', amo: '아모스.json',
    oba: '오바댜.json', jon: '요나.json', mic: '미가.json',
    nah: '나훔.json', hab: '하박국.json', zep: '스바냐.json',
    hag: '학개.json', zac: '스가랴.json', mal: '말라기.json',
    mat: '마태복음.json', mar: '마가복음.json', luk: '누가복음.json',
    joh: '요한복음.json', act: '사도행전.json', rom: '로마서.json',
    '1co': '고린도전서.json', '2co': '고린도후서.json', gal: '갈라디아서.json',
    eph: '에베소서.json', php: '빌립보서.json', col: '골로새서.json',
    '1th': '데살로니가전서.json', '2th': '데살로니가후서.json', '1ti': '디모데전서.json',
    '2ti': '디모데후서.json', tit: '디도서.json', phm: '빌레몬서.json',
    heb: '히브리서.json', jam: '야고보서.json', '1pe': '베드로전서.json',
    '2pe': '베드로후서.json', '1jo': '요한일서.json', '2jo': '요한이서.json',
    '3jo': '요한삼서.json', jud: '유다서.json', rev: '요한계시록.json',
  },
  sw: { // AJOUT DU SWAHILI
    gen: 'Mwanzo.json',
    exo: 'Kutoka.json',
    lev: 'Mambo ya Walawi.json',
    num: 'Hesabu.json',
    deu: 'Kumbukumbu_la_Torati.json',
    jos: 'Yoshua.json',
    jdg: 'Waamuzi.json',
    rut: 'Rute.json',
    '1sa': '1 Samweli.json',
    '2sa': '2 Samweli.json',
    '1ki': '1 Wafalme.json',
    '2ki': '2 Wafalme.json',
    '1ch': '1 Mambo ya Nyakati.json',
    '2ch': '2 Mambo ya Nyakati.json',
    ezr: 'Ezra.json',
    neh: 'Nehemia.json',
    est: 'Esta.json',
    job: 'Ayubu.json',
    psa: 'Zaburi.json',
    pro: 'Methali.json',
    ecc: 'Mhubiri.json',
    sos: 'Wimbo Ulio Bora.json',
    isa: 'Isaya.json',
    jer: 'Yeremia.json',
    lam: 'Maombolezo.json',
    eze: 'Ezekieli.json',
    dan: 'Danieli.json',
    hos: 'Hosea.json',
    joe: 'Yoiweli.json',
    amo: 'Amosi.json',
    oba: 'Obadia.json',
    jon: 'Yona.json',
    mic: 'Mika.json',
    nah: 'Nahumu.json',
    hab: 'Habakuki.json',
    zep: 'Sefania.json',
    hag: 'Hagai.json',
    zac: 'Zekaria.json',
    mal: 'Malaki.json',
    mat: 'Mathayo.json',
    mar: 'Marko.json',
    luk: 'Luka.json',
    joh: 'Yohana.json',
    act: 'Matendo ya Mitume.json',
    rom: 'Warumi.json',
    '1co': '1 Wakorintho.json',
    '2co': '2 Wakorintho.json',
    gal: 'Wagalatia.json',
    eph: 'Waefeso.json',
    php: 'Wafilipi.json',
    col: 'Wakolosai.json',
    '1th': '1 Wathesalonike.json',
    '2th': '2 Wathesalonike.json',
    '1ti': '1 Timotheo.json',
    '2ti': '2 Timotheo.json',
    tit: 'Tito.json',
    phm: 'Filemoni.json',
    heb: 'Waebrania.json',
    jam: 'Yakobo.json',
    '1pe': '1 Petro.json',
    '2pe': '2 Petro.json',
    '1jo': '1 Yohana.json',
    '2jo': '2 Yohana.json',
    '3jo': '3 Yohana.json',
    jud: 'Yuda.json',
    rev: 'Ufunuo wa Yohana.json',
  },
};

function getBookFileName(bookId: string, lang: string): string | null {
  return bookFilesByLanguage[lang]?.[bookId] ?? null;
}

export function useParallelReading({
  dbService,
  selectedBook,
  currentChapter,
  primaryLanguage,
}: UseParallelReadingProps) {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([primaryLanguage]);
  const [parallelData, setParallelData] = useState<ParallelData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isParallelMode, setIsParallelMode] = useState(false);
  const [loadingLanguages, setLoadingLanguages] = useState<string[]>([]);

  // CORRECTION: Ajouter 'sw' aux langues disponibles
  const availableLanguages = ['mg', 'en', 'ko', 'sw'];
  
  const addLanguage = useCallback((lang: string) => {
    if (!selectedLanguages.includes(lang) && selectedLanguages.length < 4) {
      setSelectedLanguages(prev => [...prev, lang]);
    }
  }, [selectedLanguages]);

  const removeLanguage = useCallback((lang: string) => {
    if (selectedLanguages.length > 1) {
      setSelectedLanguages(prev => prev.filter(l => l !== lang));
    }
  }, [selectedLanguages]);

  const toggleParallelMode = useCallback(() => {
    setIsParallelMode(prev => !prev);
  }, []);

  // Load parallel data when languages or chapter changes
  useEffect(() => {
    const loadParallelData = async () => {
      if (!dbService || !selectedBook || !isParallelMode || selectedLanguages.length < 2) {
        setParallelData([]);
        setLoadingLanguages([]);
        return;
      }

      setIsLoading(true);
      const apiService = new BibleApiService();
      
      try {
        const booksData: Record<string, Book> = {};
        const currentlyLoading: string[] = [];
        
        // Fetch book data for each selected language using the correct filename
        for (const lang of selectedLanguages) {
          const fileName = getBookFileName(selectedBook.id, lang);
          if (!fileName) {
            console.warn(`No filename found for book ${selectedBook.id} in language ${lang}`);
            continue;
          }

          // Ajouter la langue à la liste de chargement
          currentlyLoading.push(lang);
          setLoadingLanguages(prev => [...prev, lang]);

          try {
            let bookData = await dbService.getBook(lang, fileName);
            
            if (!bookData) {
              try {
                console.log(`Fetching ${lang} book: ${fileName}`);
                bookData = await apiService.fetchBook(lang, fileName);
                await dbService.saveBook(lang, fileName, bookData);
              } catch (err) {
                console.warn(`Failed to fetch book for language: ${lang}`, err);
                // Continuer avec les autres langues
                continue;
              }
            }
            
            if (bookData) {
              booksData[lang] = bookData;
            }
          } finally {
            // Retirer la langue de la liste de chargement
            setLoadingLanguages(prev => prev.filter(l => l !== lang));
          }
        }

        // Find the chapter data for each language
        const chapterDataByLang: Record<string, Verse[]> = {};
        let maxVerses = 0;

        for (const [lang, book] of Object.entries(booksData)) {
          const chapter = book.chapters.find(c => c.chapter === currentChapter);
          if (chapter) {
            chapterDataByLang[lang] = chapter.verses;
            maxVerses = Math.max(maxVerses, chapter.verses.length);
          } else {
            console.warn(`Chapter ${currentChapter} not found in ${selectedBook.id} (${lang})`);
          }
        }

        // Build parallel data
        const parallel: ParallelData[] = [];
        
        for (let i = 1; i <= maxVerses; i++) {
          const translations: ParallelVerse[] = [];
          
          for (const lang of selectedLanguages) {
            const verses = chapterDataByLang[lang];
            const verse = verses?.find(v => v.verse === i);
            
            if (verse) {
              translations.push({
                language: lang,
                languageName: languageNames[lang] || lang,
                text: verse.text,
              });
            } else if (booksData[lang]) {
              // Le livre existe mais ce verset n'existe pas (peut arriver)
              translations.push({
                language: lang,
                languageName: languageNames[lang] || lang,
                text: `[Verse ${i} not available in ${languageNames[lang]}]`,
              });
            }
            // Si booksData[lang] n'existe pas, on n'ajoute rien
          }
          
          if (translations.length > 0) {
            parallel.push({
              verseNumber: i,
              translations,
            });
          }
        }

        setParallelData(parallel);
      } catch (error) {
        console.error('Error loading parallel data:', error);
      } finally {
        setIsLoading(false);
        setLoadingLanguages([]);
      }
    };

    loadParallelData();
  }, [dbService, selectedBook, currentChapter, selectedLanguages, isParallelMode]);

  // Ensure primary language is always included
  useEffect(() => {
    if (!selectedLanguages.includes(primaryLanguage)) {
      setSelectedLanguages(prev => [primaryLanguage, ...prev.slice(0, 3)]);
    }
  }, [primaryLanguage]);

  return {
    selectedLanguages,
    availableLanguages, // Maintenant inclut 'sw'
    parallelData,
    isLoading,
    loadingLanguages,
    isParallelMode,
    addLanguage,
    removeLanguage,
    toggleParallelMode,
    languageNames,
  };
}