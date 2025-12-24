export type UILanguage = 'mg' | 'en' | 'ko';

export interface Translations {
  // App general
  appName: string;
  loading: string;
  error: string;
  
  // Navigation
  books: string;
  search: string;
  bookmarks: string;
  settings: string;
  
  // Testament
  oldTestament: string;
  newTestament: string;
  
  // Reading
  chapter: string;
  verse: string;
  previous: string;
  next: string;
  of: string;
  startReading: string;
  selectBookHint: string;
  continueReading: string;
  progress: string;
  
  // Verse of day
  verseOfTheDay: string;
  readMore: string;
  
  // Search
  searchVerses: string;
  searchPlaceholder: string;
  searchBooks: string;
  noResults: string;
  tryDifferent: string;
  typeToSearch: string;
  searchAcross: string;
  found: string;
  results: string;
  
  // Bookmarks
  saved: string;
  save: string;
  noBookmarks: string;
  clickToSave: string;
  deleteBookmark: string;
  copied: string;
  copiedToClipboard: string;
  copy: string;
  share: string;
  
  // Audio
  listenToChapter: string;
  playing: string;
  
  // Parallel reading
  parallelReading: string;
  selectTranslations: string;
  addTranslation: string;
  removeTranslation: string;
  compareVersions: string;
  singleView: string;
  parallelView: string;
  
  // Settings
  language: string;
  interfaceLanguage: string;
  bibleLanguage: string;
  fontSize: string;
  theme: string;
  lightMode: string;
  darkMode: string;
  
  // Errors
  failedToLoad: string;
  noDataAvailable: string;
  pageNotFound: string;
  returnHome: string;
  
  // Actions
  close: string;
  cancel: string;
  confirm: string;
  apply: string;
}

const mg: Translations = {
  appName: 'Baiboly',
  loading: 'Manamboatra...',
  error: 'Nisy olana',
  
  books: 'Boky',
  search: 'Hitady',
  bookmarks: 'Marika',
  settings: 'Fanamboarana',
  
  oldTestament: 'Testamenta Taloha',
  newTestament: 'Testamenta Vaovao',
  
  chapter: 'Toko',
  verse: 'Andininy',
  previous: 'Teo aloha',
  next: 'Manaraka',
  of: 'amin\'ny',
  startReading: 'Hanomboka mamaky',
  selectBookHint: 'Mifidiana boky avy amin\'ny lisitra mba hanombohana ny dia amin\'ny Soratra Masina.',
  continueReading: 'Hanohy mamaky',
  progress: 'Fandrosoana',
  
  verseOfTheDay: 'Andininy androany',
  readMore: 'Hamaky bebe kokoa',
  
  searchVerses: 'Hitady andininy',
  searchPlaceholder: 'Hitady...',
  searchBooks: 'Hitady boky...',
  noResults: 'Tsy nahitana valiny',
  tryDifferent: 'Andramo teny hafa',
  typeToSearch: 'Soraty ny teny hitadiavana',
  searchAcross: 'Hitady amin\'ny boky rehetra',
  found: 'Nahitana',
  results: 'valiny',
  
  saved: 'Voatahiry',
  save: 'Hitahiry',
  noBookmarks: 'Tsy mbola misy marika',
  clickToSave: 'Tsindrio ny andininy ary tahirizo mba hanampy marika',
  deleteBookmark: 'Hamafa marika',
  copied: 'Voatahiry!',
  copiedToClipboard: 'Voatahiry tao amin\'ny clipboard',
  copy: 'Handika',
  share: 'Hizara',
  
  listenToChapter: 'Hihaino ny toko',
  playing: 'Milalao...',
  
  parallelReading: 'Famakiana mifanitsy',
  selectTranslations: 'Mifidiana dika teny',
  addTranslation: 'Hanampy dika teny',
  removeTranslation: 'Hamafa dika teny',
  compareVersions: 'Hampitaha dika teny',
  singleView: 'Tokana',
  parallelView: 'Mifanitsy',
  
  language: 'Fiteny',
  interfaceLanguage: 'Fiteny interface',
  bibleLanguage: 'Fiteny Baiboly',
  fontSize: 'Haben\'ny soratra',
  theme: 'Endrika',
  lightMode: 'Mazava',
  darkMode: 'Maizina',
  
  failedToLoad: 'Tsy afaka nitondra',
  noDataAvailable: 'Tsy misy data ho an\'ny',
  pageNotFound: 'Tsy hita ny pejy',
  returnHome: 'Hiverina amin\'ny fandraisana',
  
  close: 'Hakatona',
  cancel: 'Hanafoana',
  confirm: 'Hanamarina',
  apply: 'Hampihatra',
};

const en: Translations = {
  appName: 'Bible',
  loading: 'Loading...',
  error: 'Error',
  
  books: 'Books',
  search: 'Search',
  bookmarks: 'Bookmarks',
  settings: 'Settings',
  
  oldTestament: 'Old Testament',
  newTestament: 'New Testament',
  
  chapter: 'Chapter',
  verse: 'Verse',
  previous: 'Previous',
  next: 'Next',
  of: 'of',
  startReading: 'Start Reading',
  selectBookHint: 'Select a book from the sidebar to begin your journey through the scriptures.',
  continueReading: 'Continue Reading',
  progress: 'Progress',
  
  verseOfTheDay: 'Verse of the Day',
  readMore: 'Read more',
  
  searchVerses: 'Search verses',
  searchPlaceholder: 'Search...',
  searchBooks: 'Search books...',
  noResults: 'No results found',
  tryDifferent: 'Try a different search term',
  typeToSearch: 'Type at least 2 characters to search',
  searchAcross: 'Search across all books and verses',
  found: 'Found',
  results: 'results',
  
  saved: 'Saved',
  save: 'Save',
  noBookmarks: 'No bookmarks yet',
  clickToSave: 'Click a verse and save it to add bookmarks',
  deleteBookmark: 'Delete bookmark',
  copied: 'Copied!',
  copiedToClipboard: 'Verse copied to clipboard',
  copy: 'Copy',
  share: 'Share',
  
  listenToChapter: 'Listen to Chapter',
  playing: 'Playing...',
  
  parallelReading: 'Parallel Reading',
  selectTranslations: 'Select translations',
  addTranslation: 'Add translation',
  removeTranslation: 'Remove translation',
  compareVersions: 'Compare versions',
  singleView: 'Single',
  parallelView: 'Parallel',
  
  language: 'Language',
  interfaceLanguage: 'Interface language',
  bibleLanguage: 'Bible language',
  fontSize: 'Font size',
  theme: 'Theme',
  lightMode: 'Light',
  darkMode: 'Dark',
  
  failedToLoad: 'Failed to load',
  noDataAvailable: 'No data available for',
  pageNotFound: 'Page not found',
  returnHome: 'Return to Home',
  
  close: 'Close',
  cancel: 'Cancel',
  confirm: 'Confirm',
  apply: 'Apply',
};

const ko: Translations = {
  appName: '성경',
  loading: '로딩 중...',
  error: '오류',
  
  books: '책',
  search: '검색',
  bookmarks: '북마크',
  settings: '설정',
  
  oldTestament: '구약',
  newTestament: '신약',
  
  chapter: '장',
  verse: '절',
  previous: '이전',
  next: '다음',
  of: '중',
  startReading: '읽기 시작',
  selectBookHint: '사이드바에서 책을 선택하여 성경 여행을 시작하세요.',
  continueReading: '계속 읽기',
  progress: '진행률',
  
  verseOfTheDay: '오늘의 말씀',
  readMore: '더 읽기',
  
  searchVerses: '구절 검색',
  searchPlaceholder: '검색...',
  searchBooks: '책 검색...',
  noResults: '결과 없음',
  tryDifferent: '다른 검색어를 시도하세요',
  typeToSearch: '검색하려면 2자 이상 입력하세요',
  searchAcross: '모든 책과 구절에서 검색',
  found: '발견',
  results: '결과',
  
  saved: '저장됨',
  save: '저장',
  noBookmarks: '북마크 없음',
  clickToSave: '구절을 클릭하고 저장하여 북마크 추가',
  deleteBookmark: '북마크 삭제',
  copied: '복사됨!',
  copiedToClipboard: '클립보드에 구절이 복사됨',
  copy: '복사',
  share: '공유',
  
  listenToChapter: '장 듣기',
  playing: '재생 중...',
  
  parallelReading: '병렬 읽기',
  selectTranslations: '번역 선택',
  addTranslation: '번역 추가',
  removeTranslation: '번역 제거',
  compareVersions: '버전 비교',
  singleView: '단일',
  parallelView: '병렬',
  
  language: '언어',
  interfaceLanguage: '인터페이스 언어',
  bibleLanguage: '성경 언어',
  fontSize: '글꼴 크기',
  theme: '테마',
  lightMode: '라이트',
  darkMode: '다크',
  
  failedToLoad: '로드 실패',
  noDataAvailable: '데이터 없음',
  pageNotFound: '페이지를 찾을 수 없음',
  returnHome: '홈으로 돌아가기',
  
  close: '닫기',
  cancel: '취소',
  confirm: '확인',
  apply: '적용',
};

export const translations: Record<UILanguage, Translations> = { mg, en, ko };

export function getTranslation(lang: UILanguage): Translations {
  return translations[lang] || translations.en;
}
