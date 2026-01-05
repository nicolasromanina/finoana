export const THEOLOGICAL_TOPICS = {
  'sola-scriptura': {
    titleFr: 'Sola Scriptura',
    titleMg: 'Sola Scriptura',
    descriptionFr: 'L\'autorité exclusive de l\'Écriture Sainte en matière de foi et de pratique',
    descriptionMg: 'Ny fahefana tsy mikatik-atika ny Soratra Masina amin\'ny finoana sy fanao',
    confessions: ['Westminster', 'Belgic', 'Heidelberg'],
    keyVerses: ['2 Timothée 3:16-17', 'Deutéronome 4:2', 'Apocalypse 22:18-19']
  },
  'sola-fide': {
    titleFr: 'Sola Fide',
    titleMg: 'Sola Fide',
    descriptionFr: 'La justification par la foi seule en Christ, non par les œuvres',
    descriptionMg: 'Ny fitohizana amin\'ny fidi-tro amin\'i Kristy, tsy amin\'ny asa',
    confessions: ['Westminster Shorter Catechism', 'Heidelberg Catechism'],
    keyVerses: ['Romains 3:28', 'Habacuc 2:4', 'Éphésiens 2:8-9']
  },
  'sola-gratia': {
    titleFr: 'Sola Gratia',
    titleMg: 'Sola Gratia',
    descriptionFr: 'Le salut par la grâce seule de Dieu, non par le mérite humain',
    descriptionMg: 'Ny fahavonjeon\'ny hatsara ihany avy amin\'Andriamanitra, tsy amin\'ny fahefan\'olombelona',
    confessions: ['Westminster Confession'],
    keyVerses: ['Romains 3:24', 'Tite 2:11', 'Romains 11:6']
  },
  'solus-christus': {
    titleFr: 'Solus Christus',
    titleMg: 'Solus Christus',
    descriptionFr: 'L\'unicité et la suffisance de la seigneurie et de l\'intercession du Christ',
    descriptionMg: 'Ny fahefan-koditra sy ny fahampitana ihana ny Kristy',
    confessions: ['Belgic Confession'],
    keyVerses: ['1 Corinthiens 3:11', 'Colossiens 1:18', 'Jean 14:6']
  },
  'soli-deo-gloria': {
    titleFr: 'Soli Deo Gloria',
    titleMg: 'Soli Deo Gloria',
    descriptionFr: 'La gloire à Dieu seul en toutes choses - le but ultime de la création',
    descriptionMg: 'Ny karapotsy amin\'Andriamanitra ihany amin\'ny zavatra rehetra',
    confessions: ['Westminster Confession'],
    keyVerses: ['Romains 11:36', 'Apocalypse 4:11', '1 Corinthiens 10:31']
  },
  'predestination': {
    titleFr: 'Prédestination et Élection',
    titleMg: 'Predestination sy Fisafidiana',
    descriptionFr: 'L\'élection souveraine et immuable des élus en Christ avant la fondation du monde',
    descriptionMg: 'Ny fisafidiana mifehy-tena ny Andriamanitra amin\'ny napimpivoiana',
    confessions: ['Westminster Confession Ch. III', 'Heidelberg Catechism Q&A 26-28'],
    keyVerses: ['Éphésiens 1:4-5', 'Romains 8:29-30', 'Jérémie 1:5']
  },
  'union-with-christ': {
    titleFr: 'Union avec Christ',
    titleMg: 'Firaisan\'ny Kristy',
    descriptionFr: 'L\'union spirituelle du croyant avec Christ - fondement de toute bénédiction',
    descriptionMg: 'Ny firaisan\'ny napino amin\'i Kristy - fototra ny fanabetsahana',
    confessions: ['Westminster Confession', 'Heidelberg Catechism'],
    keyVerses: ['Romains 6:1-11', 'Éphésiens 1:3', '2 Corinthiens 5:17']
  },
  'sovereignty-of-god': {
    titleFr: 'Souveraineté de Dieu',
    titleMg: 'Fanehoan-kevitra Izy Andriamanitra',
    descriptionFr: 'Le gouvernement absolu de Dieu sur toute sa création selon son décret éternel',
    descriptionMg: 'Ny fanjanaan\'Andriamanitra amin\'ny laharam-pandrefesana sy ny fanahy',
    confessions: ['Westminster Confession', 'Belgic Confession'],
    keyVerses: ['Isaia 46:9-10', 'Daniel 2:20-21', 'Proverbes 21:1']
  }
};

export const REFORMED_CREEDS = {
  westminster: {
    name: 'Confession de Westminster (1646)',
    sections: {
      chapter1: 'Autorité et suffisance de l\'Écriture Sainte',
      chapter2: 'De Dieu et de la Trinité',
      chapter3: 'Du décret éternel de Dieu'
    }
  },
  belgic: {
    name: 'Confession Belge (1561)',
    articles: {
      article1: 'De l\'unique Dieu',
      article2: 'Des moyens de connaître Dieu',
      article5: 'D\'où vient la différence entre les religions'
    }
  },
  heidelberg: {
    name: 'Catéchisme de Heidelberg (1563)',
    questions: {
      q1: 'Quel est ton seul réconfort dans la vie et dans la mort?',
      q26: 'Qu\'est-ce que tu crois quand tu dis: je crois en Jésus-Christ, son fils unique?'
    }
  }
};

export const DOCTRINAL_ERRORS = [
  {
    name: 'Arminianisme',
    contrary: 'Affirme le libre arbitre illimité - contraire à la prédestination',
    reformed: 'Volonté humaine liée par la nature pécheresse jusqu\'à la régénération'
  },
  {
    name: 'Semi-pélagianisme',
    contrary: 'L\'homme peut coopérer au salut par ses forces naturelles',
    reformed: 'Le salut est entièrement l\'œuvre de la grâce souveraine'
  },
  {
    name: 'Perfectionnisme',
    contrary: 'Perfectibilité spirituelle possible en cette vie',
    reformed: 'La sanctification progressive jusqu\'à la résurrection'
  },
  {
    name: 'Subordinationnisme',
    contrary: 'Le Fils et l\'Esprit sont subordonnés au Père',
    reformed: 'Égalité de l\'essence; économie de l\'opération dans l\'histoire'
  }
];
