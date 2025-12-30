export type UILanguage = 'mg' | 'en' | 'ko' | 'sw';

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
  nightMode: string;
  nightModeDescription: string;
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

  // Statistics
  readingStatistics: string;
  thisWeek: string;
  timeSpent: string;
  chaptersRead: string;
  dailyActivity: string;
  streaks: string;
  currentStreak: string;
  longestStreak: string;
  allTimeStats: string;
  totalReadingTime: string;
  totalChapters: string;
  daysActive: string;
  weeklyGoal: string;
  chaptersPerWeek: string;
  goalReached: string;
  keepReading: string;
  
  // Badges
  badgesRewards: string;
  level: string;
  points: string;
  unlocked: string;
  pointsToNextLevel: string;
  
  // Advanced Statistics - New translations
  overview: string;
  analytics: string;
  insights: string;
  productivityScore: string;
  weeklyPerformance: string;
  excellent: string;
  good: string;
  fair: string;
  needsImprovement: string;
  minPerDay: string;
  streakAnalytics: string;
  newRecord: string;
  daysToBeat: string;
  readingPatterns: string;
  averageSession: string;
  peakHours: string;
  consistency: string;
  lifetimeStats: string;
  booksCompleted: string;
  consistencyRate: string;
  goalAchieved: string;
  progressLabel: string;
  chaptersLeft: string;
  record: string;
  
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
  startReading: 'Hanomboka hamaky',
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
  nightMode: 'Alina',
  nightModeDescription: 'Manala ny hazavan-jiro manga mba hiarovana ny maso',
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

  // Statistics
  readingStatistics: 'Statistika famakiana',
  thisWeek: 'Ity herinandro ity',
  timeSpent: 'Fotoana lany',
  chaptersRead: 'Toko voavaky',
  dailyActivity: 'Hetsika isan\'andro',
  streaks: 'Fitohizana',
  currentStreak: 'Fitohizana ankehitriny',
  longestStreak: 'Fitohizana lava indrindra',
  allTimeStats: 'Statistika rehetra',
  totalReadingTime: 'Fotoana famakiana rehetra',
  totalChapters: 'Toko rehetra',
  daysActive: 'Andro niditra',
  weeklyGoal: 'Tanjona herinandro',
  chaptersPerWeek: 'Toko isaky ny herinandro',
  goalReached: 'Tanjona tratra! 🎉',
  keepReading: 'Tohizo ny famakiana!',
  
  // Badges
  badgesRewards: 'Medaly sy valisoa',
  level: 'Ambaratonga',
  points: 'poiny',
  unlocked: 'voavoha',
  pointsToNextLevel: 'poiny mila ho amin\'ny ambaratonga manaraka',
  
  // Advanced Statistics - Malagasy
  overview: 'Fijery ankapobeny',
  analytics: 'Analitika',
  insights: 'Fahatakarana',
  productivityScore: 'Score produktivite',
  weeklyPerformance: 'Performance herinandro',
  excellent: 'Tsara be',
  good: 'Tsara',
  fair: 'Salama',
  needsImprovement: 'Mila fanatsarana',
  minPerDay: 'min/andro',
  streakAnalytics: 'Analitika fitohizana',
  newRecord: 'Rekordy vaovao!',
  daysToBeat: 'andro alohan\'ny hahazoana',
  readingPatterns: 'Modely famakiana',
  averageSession: 'Session salama',
  peakHours: 'Ora maro fampiasana',
  consistency: 'Faharetan-tsaina',
  lifetimeStats: 'Statistika fiainana manontolo',
  booksCompleted: 'Boky vita',
  consistencyRate: 'Tahan\'ny faharetan-tsaina',
  goalAchieved: 'Tanjon-tanana!',
  progressLabel: 'Fandrosoana',
  chaptersLeft: 'toko sisa',
  record: 'Rekordy',
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
  nightMode: 'Night',
  nightModeDescription: 'Reduces blue light to protect your eyes',
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

  // Statistics
  readingStatistics: 'Reading Statistics',
  thisWeek: 'This Week',
  timeSpent: 'Time Spent',
  chaptersRead: 'Chapters Read',
  dailyActivity: 'Daily Activity',
  streaks: 'Streaks',
  currentStreak: 'Current Streak',
  longestStreak: 'Longest Streak',
  allTimeStats: 'All Time Stats',
  totalReadingTime: 'Total Reading Time',
  totalChapters: 'Total Chapters',
  daysActive: 'Days Active',
  weeklyGoal: 'Weekly Goal',
  chaptersPerWeek: 'Chapters per week',
  goalReached: 'Goal reached! 🎉',
  keepReading: 'Keep reading!',
  
  // Badges
  badgesRewards: 'Badges & Rewards',
  level: 'Level',
  points: 'points',
  unlocked: 'unlocked',
  pointsToNextLevel: 'points to next level',
  
  // Advanced Statistics - English
  overview: 'Overview',
  analytics: 'Analytics',
  insights: 'Insights',
  productivityScore: 'Productivity Score',
  weeklyPerformance: 'Weekly Performance',
  excellent: 'Excellent',
  good: 'Good',
  fair: 'Fair',
  needsImprovement: 'Needs Improvement',
  minPerDay: 'min/day',
  streakAnalytics: 'Streak Analytics',
  newRecord: 'New Record!',
  daysToBeat: 'days to beat',
  readingPatterns: 'Reading Patterns',
  averageSession: 'Average Session',
  peakHours: 'Peak Hours',
  consistency: 'Consistency',
  lifetimeStats: 'Lifetime Stats',
  booksCompleted: 'Books Completed',
  consistencyRate: 'Consistency Rate',
  goalAchieved: 'Goal Achieved!',
  progressLabel: 'Progress',
  chaptersLeft: 'chapters left',
  record: 'Record',
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
  nightMode: '야간',
  nightModeDescription: '눈을 보호하기 위해 블루라이트를 줄입니다',
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

  // Statistics
  readingStatistics: '독서 통계',
  thisWeek: '이번 주',
  timeSpent: '소요 시간',
  chaptersRead: '읽은 장',
  dailyActivity: '일일 활동',
  streaks: '연속',
  currentStreak: '현재 연속',
  longestStreak: '최장 연속',
  allTimeStats: '전체 통계',
  totalReadingTime: '총 독서 시간',
  totalChapters: '총 장',
  daysActive: '활동 일수',
  weeklyGoal: '주간 목표',
  chaptersPerWeek: '주당 장',
  goalReached: '목표 달성! 🎉',
  keepReading: '계속 읽으세요!',
  
  // Badges
  badgesRewards: '배지 및 보상',
  level: '레벨',
  points: '포인트',
  unlocked: '잠금 해제됨',
  pointsToNextLevel: '다음 레벨까지 포인트',
  
  // Advanced Statistics - Korean
  overview: '개요',
  analytics: '분석',
  insights: '통찰력',
  productivityScore: '생산성 점수',
  weeklyPerformance: '주간 성과',
  excellent: '훌륭함',
  good: '좋음',
  fair: '보통',
  needsImprovement: '개선 필요',
  minPerDay: '분/일',
  streakAnalytics: '연속 기록 분석',
  newRecord: '신기록!',
  daysToBeat: '경과 일수',
  readingPatterns: '독서 패턴',
  averageSession: '평균 세션',
  peakHours: '피크 시간',
  consistency: '일관성',
  lifetimeStats: '평생 통계',
  booksCompleted: '완료된 책',
  consistencyRate: '일관성 비율',
  goalAchieved: '목표 달성!',
  progressLabel: '진행 상황',
  chaptersLeft: '남은 장',
  record: '기록',
};

const sw: Translations = {
  appName: 'Biblia',
  loading: 'Inapakia...',
  error: 'Hitilafu',
  copyright: '© 2025 NARNIA CHAPEL',
  
  books: 'Vitabu',
  search: 'Tafuta',
  bookmarks: 'Alama za kusoma',
  settings: 'Mipangilio',
  readingPlans: 'Mipango ya kusoma',
  
  oldTestament: 'Agano la Kale',
  newTestament: 'Agano Jipya',
  
  chapter: 'Sura',
  verse: 'Aya',
  previous: 'Iliyopita',
  next: 'Ifuatayo',
  of: 'ya',
  startReading: 'Anza kusoma',
  selectBookHint: 'Chagua kitabu kutoka orodha kuanza safari yako kupitia Maandiko Matakatifu.',
  continueReading: 'Endelea kusoma',
  progress: 'Maendeleo',
  
  verseOfTheDay: 'Aya ya Leo',
  readMore: 'Soma zaidi',
  
  searchVerses: 'Tafuta aya',
  searchPlaceholder: 'Tafuta...',
  searchBooks: 'Tafuta vitabu...',
  noResults: 'Hakuna matokeo',
  tryDifferent: 'Jaribu neno lingine',
  typeToSearch: 'Andika angalau herufi 2 kutafuta',
  searchAcross: 'Tafuta katika vitabu na aya zote',
  found: 'Imepatikana',
  results: 'matokeo',
  
  saved: 'Imehifadhiwa',
  save: 'Hifadhi',
  noBookmarks: 'Hakuna alama za kusoma bado',
  clickToSave: 'Bofya aya na uihifadhi kuongeza alama',
  deleteBookmark: 'Futa alama',
  copied: 'Imenakiliwa!',
  copiedToClipboard: 'Aya imenakiliwa kwenye clipboard',
  copy: 'Nakili',
  share: 'Shiriki',
  
  listenToChapter: 'Sikiliza Sura',
  playing: 'Inacheza...',
  
  parallelReading: 'Kusoma Sambamba',
  selectTranslations: 'Chagua tafsiri',
  addTranslation: 'Ongeza tafsiri',
  removeTranslation: 'Ondoa tafsiri',
  compareVersions: 'Linganisha matoleo',
  singleView: 'Moja',
  parallelView: 'Sambamba',
  
  language: 'Lugha',
  interfaceLanguage: 'Lugha ya kiolesura',
  bibleLanguage: 'Lugha ya Biblia',
  fontSize: 'Ukubwa wa herufi',
  theme: 'Mandhari',
  lightMode: 'Mwanga',
  darkMode: 'Giza',
  nightMode: 'Usiku',
  nightModeDescription: 'Inapunguza mwanga wa bluu kulinda macho yako',
  themeSystem: 'Mfumo',
  
  failedToLoad: 'Imeshindwa kupakia',
  noDataAvailable: 'Hakuna data kwa',
  pageNotFound: 'Ukurasa haujapatikana',
  returnHome: 'Rudi Nyumbani',
  
  close: 'Funga',
  cancel: 'Ghairi',
  confirm: 'Thibitisha',
  apply: 'Tekeleza',

  startPlan: 'Anza Mpango',
  continuePlan: 'Endelea Mpango',
  completedDays: 'Siku zilizokamilika',
  todaysReading: 'Usomaji wa Leo',
  markAsComplete: 'Weka alama kuwa umekamilika',
  planProgress: 'Maendeleo',
  day: 'Siku',
  days: 'siku',
  selectPlan: 'Chagua mpango',
  activePlans: 'Mipango Inayoendelea',
  availablePlans: 'Mipango Inayopatikana',
  noActivePlans: 'Hakuna mipango inayoendelea',
  
  enableNotifications: 'Washa arifa',
  notificationTime: 'Wakati wa arifa',
  dailyReminder: 'Kikumbusho cha kila siku',
  notificationsEnabled: 'Arifa zimewashwa',
  notificationsDisabled: 'Arifa zimezimwa',
  
  highlight: 'Angazia',
  addNote: 'Ongeza dokezo',
  editNote: 'Hariri dokezo',
  deleteNote: 'Futa dokezo',
  noteText: 'Andika dokezo lako',
  highlightColor: 'Rangi',
  removeHighlight: 'Ondoa kuangazia',
  yourNotes: 'Madokezo yako',
  noNotes: 'Hakuna madokezo bado',

  installApp: 'Sakinisha Programu',
  installInstructions: 'Jinsi ya kusakinisha',
  iosInstallStep1: 'Gonga kitufe cha Shiriki',
  iosInstallStep2: 'Chagua "Ongeza kwenye Skrini ya Nyumbani"',
  androidInstall: 'Gonga "Sakinisha"',
  appInstalled: 'Programu tayari imesakinishwa',
  
  offline: 'Nje ya mtandao',
  online: 'Mtandaoni',
  downloadForOffline: 'Pakua data yote kwa nje ya mtandao',
  downloadingData: 'Inapakua data...',
  downloadComplete: 'Upakuaji umekamilika',
  storageUsed: 'Hifadhi iliyotumika',
  resetCache: 'Weka upya akiba',
  resetCacheConfirm: 'Una uhakika unataka kufuta data yote iliyohifadhiwa?',
  resetCacheSuccess: 'Akiba imefutwa kikamilifu',
  
  welcomeTitle: 'Karibu kwenye Biblia',
  welcomeSubtitle: 'Soma Maandiko Matakatifu kwa lugha nyingi',
  chooseLanguage: 'Chagua lugha yako',
  chooseTheme: 'Chagua mandhari yako',
  installStep: 'Sakinisha programu',
  letsStart: 'Tuanze',
  skip: 'Ruka',
  nextStep: 'Ifuatayo',
  previousStep: 'Iliyopita',
  
  compareTranslations: 'Linganisha tafsiri zote',

  // Statistics
  readingStatistics: 'Takwimu za Kusoma',
  thisWeek: 'Wiki Hii',
  timeSpent: 'Muda Uliotumika',
  chaptersRead: 'Sura Zilizosomwa',
  dailyActivity: 'Shughuli za Kila Siku',
  streaks: 'Mfululizo',
  currentStreak: 'Mfululizo wa Sasa',
  longestStreak: 'Mfululizo Mrefu Zaidi',
  allTimeStats: 'Takwimu Zote',
  totalReadingTime: 'Jumla ya Muda wa Kusoma',
  totalChapters: 'Jumla ya Sura',
  daysActive: 'Siku Zinazofanya Kazi',
  weeklyGoal: 'Lengo la Wiki',
  chaptersPerWeek: 'Sura kwa wiki',
  goalReached: 'Lengo limefikiwa! 🎉',
  keepReading: 'Endelea kusoma!',
  
  // Badges
  badgesRewards: 'Beji na Zawadi',
  level: 'Kiwango',
  points: 'pointi',
  unlocked: 'zimefunguliwa',
  pointsToNextLevel: 'pointi hadi kiwango kifuatacho',
  
  // Advanced Statistics - Swahili
  overview: 'Muhtasari',
  analytics: 'Uchambuzi',
  insights: 'Uelewa',
  productivityScore: 'Alama ya Ufanisi',
  weeklyPerformance: 'Utendaji wa Wiki',
  excellent: 'Bora',
  good: 'Nzuri',
  fair: 'Wastani',
  needsImprovement: 'Inahitaji Kuboreshwa',
  minPerDay: 'dakika/siku',
  streakAnalytics: 'Uchambuzi wa Mfululizo',
  newRecord: 'Rekodi Mpya!',
  daysToBeat: 'siku kushinda',
  readingPatterns: 'Mifumo ya Kusoma',
  averageSession: 'Kikao cha Wastani',
  peakHours: 'Saa za Kilele',
  consistency: 'Uthabiti',
  lifetimeStats: 'Takwimu za Maisha',
  booksCompleted: 'Vitabu Vimalizika',
  consistencyRate: 'Kiwango cha Uthabiti',
  goalAchieved: 'Lengo Limefikiwa!',
  progressLabel: 'Maendeleo',
  chaptersLeft: 'sura zilizobaki',
  record: 'Rekodi',
};

export const translations: Record<UILanguage, Translations> = { mg, en, ko, sw };

export function getTranslation(lang: UILanguage): Translations {
  return translations[lang] || translations.en;
}