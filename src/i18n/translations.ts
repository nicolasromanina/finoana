export type UILanguage = 'mg' | 'en' | 'ko';

export interface Translations {
  // App general
  appName: string;
  loading: string;
  error: string;
  copyright: string;
  
  // Navigation
  books: string;
  search: string;
  bookmarks: string;
  settings: string;
  readingPlans: string;
  
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
  themeSystem: string;
  
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

  // Reading Plans
  startPlan: string;
  continuePlan: string;
  completedDays: string;
  todaysReading: string;
  markAsComplete: string;
  planProgress: string;
  day: string;
  days: string;
  selectPlan: string;
  activePlans: string;
  availablePlans: string;
  noActivePlans: string;
  
  // Notifications
  enableNotifications: string;
  notificationTime: string;
  dailyReminder: string;
  notificationsEnabled: string;
  notificationsDisabled: string;
  
  // Highlights & Notes
  highlight: string;
  addNote: string;
  editNote: string;
  deleteNote: string;
  noteText: string;
  highlightColor: string;
  removeHighlight: string;
  yourNotes: string;
  noNotes: string;

  // Install
  installApp: string;
  installInstructions: string;
  iosInstallStep1: string;
  iosInstallStep2: string;
  androidInstall: string;
  appInstalled: string;
  
  // Offline
  offline: string;
  online: string;
  downloadForOffline: string;
  downloadingData: string;
  downloadComplete: string;
  storageUsed: string;
  resetCache: string;
  resetCacheConfirm: string;
  resetCacheSuccess: string;
  
  // Onboarding
  welcomeTitle: string;
  welcomeSubtitle: string;
  chooseLanguage: string;
  chooseTheme: string;
  installStep: string;
  letsStart: string;
  skip: string;
  nextStep: string;
  previousStep: string;
  
  // Compare
  compareTranslations: string;
}

const mg: Translations = {
  appName: 'Baiboly',
  loading: 'Manamboatra...',
  error: 'Nisy olana',
  copyright: '© 2025 NARNIA CHAPEL',
  
  books: 'Boky',
  search: 'Hitady',
  bookmarks: 'Marika',
  settings: 'Fanamboarana',
  readingPlans: 'Drafitra famakiana',
  
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
  themeSystem: 'Araka ny sistema',
  
  failedToLoad: 'Tsy afaka nitondra',
  noDataAvailable: 'Tsy misy data ho an\'ny',
  pageNotFound: 'Tsy hita ny pejy',
  returnHome: 'Hiverina amin\'ny fandraisana',
  
  close: 'Hakatona',
  cancel: 'Hanafoana',
  confirm: 'Hanamarina',
  apply: 'Hampihatra',

  startPlan: 'Hanomboka drafitra',
  continuePlan: 'Hanohy drafitra',
  completedDays: 'Andro vita',
  todaysReading: 'Famakiana androany',
  markAsComplete: 'Mariho ho vita',
  planProgress: 'Fandrosoana',
  day: 'Andro',
  days: 'andro',
  selectPlan: 'Mifidiana drafitra',
  activePlans: 'Drafitra mandeha',
  availablePlans: 'Drafitra misy',
  noActivePlans: 'Tsy misy drafitra mandeha',
  
  enableNotifications: 'Alefaso ny fampahatsiarovana',
  notificationTime: 'Ora fampahatsiarovana',
  dailyReminder: 'Fampahatsiarovana isan\'andro',
  notificationsEnabled: 'Fampahatsiarovana alefa',
  notificationsDisabled: 'Fampahatsiarovana tsy alefa',
  
  highlight: 'Ampisongadinina',
  addNote: 'Hanampy fanamarihana',
  editNote: 'Hanova fanamarihana',
  deleteNote: 'Hamafa fanamarihana',
  noteText: 'Soraty ny fanamarihana',
  highlightColor: 'Loko',
  removeHighlight: 'Hanala highlight',
  yourNotes: 'Ireo fanamarihana',
  noNotes: 'Tsy mbola misy fanamarihana',

  installApp: 'Hametraka ny application',
  installInstructions: 'Ahoana ny fametrahana',
  iosInstallStep1: 'Tsindrio ny bokotra Share',
  iosInstallStep2: 'Safidio "Add to Home Screen"',
  androidInstall: 'Tsindrio "Installer"',
  appInstalled: 'Efa napetraka ny application',
  
  offline: 'Tsy misy internet',
  online: 'Misy internet',
  downloadForOffline: 'Haka ny data rehetra offline',
  downloadingData: 'Maka ny data...',
  downloadComplete: 'Vita ny fakan-data',
  storageUsed: 'Habetsahan\'ny data voatahiry',
  resetCache: 'Hamafa ny cache',
  resetCacheConfirm: 'Tena hamafa ny data rehetra voatahiry ve ianao?',
  resetCacheSuccess: 'Voafafa ny cache',
  
  welcomeTitle: 'Tongasoa eto amin\'ny Baiboly',
  welcomeSubtitle: 'Mamakia ny Soratra Masina amin\'ny fiteny samihafa',
  chooseLanguage: 'Mifidiana ny fiteninao',
  chooseTheme: 'Mifidiana ny endriky ny application',
  installStep: 'Apetraho ny application',
  letsStart: 'Hanomboka',
  skip: 'Handingana',
  nextStep: 'Manaraka',
  previousStep: 'Teo aloha',
  
  compareTranslations: 'Hampitaha dika teny rehetra',
};

const en: Translations = {
  appName: 'Baiboly',
  loading: 'Loading...',
  error: 'Error',
  copyright: '© 2025 NARNIA CHAPEL',
  
  books: 'Books',
  search: 'Search',
  bookmarks: 'Bookmarks',
  settings: 'Settings',
  readingPlans: 'Reading Plans',
  
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
  themeSystem: 'System',
  
  failedToLoad: 'Failed to load',
  noDataAvailable: 'No data available for',
  pageNotFound: 'Page not found',
  returnHome: 'Return to Home',
  
  close: 'Close',
  cancel: 'Cancel',
  confirm: 'Confirm',
  apply: 'Apply',

  startPlan: 'Start Plan',
  continuePlan: 'Continue Plan',
  completedDays: 'Days completed',
  todaysReading: 'Today\'s Reading',
  markAsComplete: 'Mark as complete',
  planProgress: 'Progress',
  day: 'Day',
  days: 'days',
  selectPlan: 'Select a plan',
  activePlans: 'Active Plans',
  availablePlans: 'Available Plans',
  noActivePlans: 'No active plans',
  
  enableNotifications: 'Enable notifications',
  notificationTime: 'Notification time',
  dailyReminder: 'Daily reminder',
  notificationsEnabled: 'Notifications enabled',
  notificationsDisabled: 'Notifications disabled',
  
  highlight: 'Highlight',
  addNote: 'Add note',
  editNote: 'Edit note',
  deleteNote: 'Delete note',
  noteText: 'Write your note',
  highlightColor: 'Color',
  removeHighlight: 'Remove highlight',
  yourNotes: 'Your notes',
  noNotes: 'No notes yet',

  installApp: 'Install App',
  installInstructions: 'How to install',
  iosInstallStep1: 'Tap the Share button',
  iosInstallStep2: 'Select "Add to Home Screen"',
  androidInstall: 'Tap "Install"',
  appInstalled: 'App already installed',
  
  offline: 'Offline',
  online: 'Online',
  downloadForOffline: 'Download all data for offline',
  downloadingData: 'Downloading data...',
  downloadComplete: 'Download complete',
  storageUsed: 'Storage used',
  resetCache: 'Reset cache',
  resetCacheConfirm: 'Are you sure you want to clear all cached data?',
  resetCacheSuccess: 'Cache cleared successfully',
  
  welcomeTitle: 'Welcome to Baiboly',
  welcomeSubtitle: 'Read the Holy Scriptures in multiple languages',
  chooseLanguage: 'Choose your language',
  chooseTheme: 'Choose your theme',
  installStep: 'Install the app',
  letsStart: 'Let\'s start',
  skip: 'Skip',
  nextStep: 'Next',
  previousStep: 'Previous',
  
  compareTranslations: 'Compare all translations',
};

const ko: Translations = {
  appName: '바이볼리',
  loading: '로딩 중...',
  error: '오류',
  copyright: '© 2025 NARNIA CHAPEL',
  
  books: '책',
  search: '검색',
  bookmarks: '북마크',
  settings: '설정',
  readingPlans: '읽기 계획',
  
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
  themeSystem: '시스템',
  
  failedToLoad: '로드 실패',
  noDataAvailable: '데이터 없음',
  pageNotFound: '페이지를 찾을 수 없음',
  returnHome: '홈으로 돌아가기',
  
  close: '닫기',
  cancel: '취소',
  confirm: '확인',
  apply: '적용',

  startPlan: '계획 시작',
  continuePlan: '계획 계속',
  completedDays: '완료된 일수',
  todaysReading: '오늘의 읽기',
  markAsComplete: '완료로 표시',
  planProgress: '진행률',
  day: '일',
  days: '일',
  selectPlan: '계획 선택',
  activePlans: '활성 계획',
  availablePlans: '사용 가능한 계획',
  noActivePlans: '활성 계획 없음',
  
  enableNotifications: '알림 활성화',
  notificationTime: '알림 시간',
  dailyReminder: '일일 알림',
  notificationsEnabled: '알림이 활성화됨',
  notificationsDisabled: '알림이 비활성화됨',
  
  highlight: '하이라이트',
  addNote: '메모 추가',
  editNote: '메모 편집',
  deleteNote: '메모 삭제',
  noteText: '메모 작성',
  highlightColor: '색상',
  removeHighlight: '하이라이트 제거',
  yourNotes: '내 메모',
  noNotes: '메모 없음',

  installApp: '앱 설치',
  installInstructions: '설치 방법',
  iosInstallStep1: '공유 버튼을 탭하세요',
  iosInstallStep2: '"홈 화면에 추가" 선택',
  androidInstall: '"설치" 탭하세요',
  appInstalled: '앱이 이미 설치됨',
  
  offline: '오프라인',
  online: '온라인',
  downloadForOffline: '오프라인용 전체 데이터 다운로드',
  downloadingData: '데이터 다운로드 중...',
  downloadComplete: '다운로드 완료',
  storageUsed: '사용된 저장 공간',
  resetCache: '캐시 초기화',
  resetCacheConfirm: '캐시된 모든 데이터를 삭제하시겠습니까?',
  resetCacheSuccess: '캐시가 성공적으로 삭제됨',
  
  welcomeTitle: '바이볼리에 오신 것을 환영합니다',
  welcomeSubtitle: '여러 언어로 성경을 읽으세요',
  chooseLanguage: '언어를 선택하세요',
  chooseTheme: '테마를 선택하세요',
  installStep: '앱 설치',
  letsStart: '시작하기',
  skip: '건너뛰기',
  nextStep: '다음',
  previousStep: '이전',
  
  compareTranslations: '모든 번역 비교',
};

export const translations: Record<UILanguage, Translations> = { mg, en, ko };

export function getTranslation(lang: UILanguage): Translations {
  return translations[lang] || translations.en;
}
