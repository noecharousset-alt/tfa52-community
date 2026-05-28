export type Category =
  | "apps"
  | "feedback"
  | "idees-folles"
  | "discussions"
  | "ama"
  | "build-log";

export type PostStatus =
  | "nouvelle"
  | "en-vote"
  | "retenue"
  | "en-cours"
  | "livree";

export type BadgeType =
  | "early-adopter"
  | "idea-machine"
  | "top-voter"
  | "idea-maker"
  | "idea-bounty";

export interface User {
  id: string;
  username: string;
  avatar: string;
  karma: number;
  badges: BadgeType[];
  joinedAt: string;
  bio: string;
  postsCount: number;
  commentsCount: number;
}

export interface Post {
  id: string;
  title: string;
  body: string;
  author: User;
  category: Category;
  tags: string[];
  status: PostStatus;
  votes: number;
  commentCount: number;
  createdAt: string;
  isPoll?: boolean;
  pollOptions?: PollOption[];
}

export interface Comment {
  id: string;
  body: string;
  author: User;
  votes: number;
  createdAt: string;
  replies: Comment[];
}

export interface PollOption {
  id: string;
  label: string;
  votes: number;
}

export interface SprintCandidate {
  id: string;
  post: Post;
  totalVotes: number;
}

export interface BuildLogEntry {
  id: string;
  title: string;
  body: string;
  author: User;
  sprintNumber: number;
  createdAt: string;
  images: string[];
  poll?: {
    question: string;
    options: PollOption[];
  };
}

export interface Notification {
  id: string;
  type: "reply" | "vote-threshold" | "idea-retained" | "badge" | "mention";
  message: string;
  read: boolean;
  createdAt: string;
  link: string;
}

export const CATEGORIES: { value: Category; label: string; emoji: string }[] = [
  { value: "apps", label: "Apps", emoji: "📱" },
  { value: "feedback", label: "Feedback", emoji: "💬" },
  { value: "idees-folles", label: "Idées Folles", emoji: "🤯" },
  { value: "discussions", label: "Discussions", emoji: "💭" },
  { value: "ama", label: "AMA", emoji: "🎤" },
  { value: "build-log", label: "Build Log", emoji: "🔨" },
];

export const BADGES: Record<
  BadgeType,
  { label: string; emoji: string; description: string }
> = {
  "early-adopter": {
    label: "Early Adopter",
    emoji: "🌟",
    description: "Parmi les 100 premiers membres",
  },
  "idea-machine": {
    label: "Idea Machine",
    emoji: "💡",
    description: "10+ idées postées",
  },
  "top-voter": {
    label: "Top Voter",
    emoji: "🗳️",
    description: "500+ votes donnés",
  },
  "idea-maker": {
    label: "Idea Maker",
    emoji: "🎯",
    description: "Une idée retenue par la communauté",
  },
  "idea-bounty": {
    label: "Idea Bounty",
    emoji: "🏆",
    description: "Son idée a été buildée en sprint",
  },
};

export const STATUS_CONFIG: Record<
  PostStatus,
  { label: string; color: string }
> = {
  nouvelle: { label: "Nouvelle", color: "bg-muted-foreground" },
  "en-vote": { label: "En vote", color: "bg-purple" },
  retenue: { label: "Retenue", color: "bg-pink" },
  "en-cours": { label: "En cours", color: "bg-chart-5" },
  livree: { label: "Livrée", color: "bg-success" },
};

// --- Users ---

export const users: User[] = [
  {
    id: "u1",
    username: "Vassili",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Vassili",
    karma: 4820,
    badges: ["early-adopter", "idea-machine", "idea-bounty"],
    joinedAt: "2026-01-15",
    bio: "Fondateur TFA52 / Sprint Factory. Builder obsessionnel. 52 apps en 52 semaines, let's go.",
    postsCount: 34,
    commentsCount: 187,
  },
  {
    id: "u2",
    username: "MarineBuilder",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Marine",
    karma: 2340,
    badges: ["early-adopter", "top-voter"],
    joinedAt: "2026-01-16",
    bio: "Dev frontend passionnée. Je build des side projects le weekend.",
    postsCount: 12,
    commentsCount: 89,
  },
  {
    id: "u3",
    username: "ThomasHack",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Thomas",
    karma: 1890,
    badges: ["idea-machine", "idea-maker"],
    joinedAt: "2026-02-03",
    bio: "Entrepreneur serial. 3 startups lancées, 2 crashées, 1 qui marche.",
    postsCount: 28,
    commentsCount: 56,
  },
  {
    id: "u4",
    username: "LéaDesign",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Lea",
    karma: 1560,
    badges: ["early-adopter"],
    joinedAt: "2026-01-18",
    bio: "UX Designer. Je fais des trucs jolis qui marchent aussi.",
    postsCount: 8,
    commentsCount: 134,
  },
  {
    id: "u5",
    username: "MaxCode",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Max",
    karma: 980,
    badges: ["top-voter"],
    joinedAt: "2026-03-10",
    bio: "Fullstack JS. Code la nuit, dort le jour.",
    postsCount: 5,
    commentsCount: 67,
  },
  {
    id: "u6",
    username: "SarahStartup",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Sarah",
    karma: 3210,
    badges: ["early-adopter", "idea-machine", "idea-maker"],
    joinedAt: "2026-01-17",
    bio: "Growth hacker & product manager. Je transforme des idées en produits.",
    postsCount: 22,
    commentsCount: 145,
  },
];

// --- Posts ---

export const posts: Post[] = [
  {
    id: "p1",
    title: "App de micro-défis quotidiens entre potes",
    body: "Chaque jour un défi random (photo, vidéo, dessin, code...) envoyé à ton groupe. Tu as 24h pour le faire. Scoreboard entre potes. Comme BeReal mais en mode défi. Le groupe qui accumule le plus de points gagne des récompenses communautaires.",
    author: users[2],
    category: "idees-folles",
    tags: ["social", "gamification", "mobile"],
    status: "en-vote",
    votes: 287,
    commentCount: 43,
    createdAt: "2026-05-27T14:30:00",
  },
  {
    id: "p2",
    title: "Marketplace de side-projects abandonnés",
    body: "On a tous des projets inachevés qui traînent sur GitHub. Un marketplace où tu peux vendre/donner/échanger tes side projects. Avec un système d'évaluation du code, une estimation du temps pour finir, et un matching avec des devs motivés.",
    author: users[5],
    category: "idees-folles",
    tags: ["marketplace", "dev", "open-source"],
    status: "retenue",
    votes: 342,
    commentCount: 67,
    createdAt: "2026-05-25T09:15:00",
  },
  {
    id: "p3",
    title: "Le design system est incroyable, bravo !",
    body: "Je voulais juste dire que le design de l'app 3 est vraiment clean. Les animations, la palette de couleurs, tout est cohérent. Vous avez utilisé quoi comme stack design ?",
    author: users[3],
    category: "feedback",
    tags: ["design", "app-03"],
    status: "nouvelle",
    votes: 156,
    commentCount: 21,
    createdAt: "2026-05-26T18:45:00",
  },
  {
    id: "p4",
    title: "Sprint #04 — Build Log : Les coulisses du Reddit TFA52",
    body: "On a été bannis de Reddit. Alors on a décidé de builder notre propre espace. Voici les coulisses du Sprint #04 : comment on a conçu cette app communautaire en 7 jours. Stack, décisions, galères, victoires.",
    author: users[0],
    category: "build-log",
    tags: ["sprint-04", "behind-the-scenes"],
    status: "en-cours",
    votes: 423,
    commentCount: 89,
    createdAt: "2026-05-28T08:00:00",
  },
  {
    id: "p5",
    title: "Un Tinder mais pour matcher des co-founders",
    body: "Swipe left/right sur des profils de builders. Match = vous pouvez discuter et potentiellement co-fonder un projet. Profils avec skills, dispo, type de projet recherché, vibe.",
    author: users[1],
    category: "idees-folles",
    tags: ["social", "startup", "matching"],
    status: "nouvelle",
    votes: 198,
    commentCount: 34,
    createdAt: "2026-05-27T22:10:00",
  },
  {
    id: "p6",
    title: "AMA — Vassili : Comment j'ai lancé le challenge 52 apps",
    body: "Posez-moi toutes vos questions sur le challenge, la méthode, les galères, les wins. Je réponds à tout pendant 2h. Let's go 🔥",
    author: users[0],
    category: "ama",
    tags: ["ama", "vassili", "52apps"],
    status: "nouvelle",
    votes: 567,
    commentCount: 156,
    createdAt: "2026-05-26T10:00:00",
  },
  {
    id: "p7",
    title: "App de tracking d'habitudes avec accountability partner",
    body: "Tu définis tes habitudes, tu es matché avec un partner qui a les mêmes objectifs. Si tu skip, ton partner est notifié. Pression sociale positive. Streaks partagées.",
    author: users[4],
    category: "idees-folles",
    tags: ["productivité", "social", "habitudes"],
    status: "en-vote",
    votes: 134,
    commentCount: 19,
    createdAt: "2026-05-28T06:30:00",
  },
  {
    id: "p8",
    title: "Kill or Continue : App #03 — Le Meal Planner IA",
    body: "L'app 3 est live depuis 2 semaines. 340 utilisateurs, 12% de rétention J7. On continue de la développer ou on passe à la suite ? Votez !",
    author: users[0],
    category: "apps",
    tags: ["kill-or-continue", "app-03", "vote"],
    status: "nouvelle",
    votes: 234,
    commentCount: 78,
    createdAt: "2026-05-27T16:00:00",
    isPoll: true,
    pollOptions: [
      { id: "poll1-a", label: "🟢 Continue — elle a du potentiel", votes: 156 },
      { id: "poll1-b", label: "🔴 Kill — move on", votes: 78 },
    ],
  },
  {
    id: "p9",
    title: "Suggestion : ajouter un mode sombre",
    body: "Le fond blanc me brûle les yeux à 2h du mat. Un toggle dark mode serait parfait. Bonus si c'est le mode par défaut (on est des devs après tout).",
    author: users[4],
    category: "feedback",
    tags: ["ui", "dark-mode", "suggestion"],
    status: "livree",
    votes: 89,
    commentCount: 12,
    createdAt: "2026-05-20T23:45:00",
  },
  {
    id: "p10",
    title: "Un GitHub Wrapped mais toute l'année",
    body: "Comme Spotify Wrapped mais pour ton activité GitHub. Stats visuelles de tes contributions, langages utilisés, heures de code, streaks. Partageable sur les réseaux. Mis à jour en temps réel, pas juste en décembre.",
    author: users[2],
    category: "idees-folles",
    tags: ["dev-tools", "analytics", "social"],
    status: "nouvelle",
    votes: 267,
    commentCount: 41,
    createdAt: "2026-05-26T14:20:00",
  },
  {
    id: "p11",
    title: "On devrait avoir un channel Discord lié à la communauté",
    body: "Pour les discussions en temps réel, les sessions de code en live, les annonces rapides. La communauté ici pour le contenu structuré, Discord pour le chat informel.",
    author: users[1],
    category: "discussions",
    tags: ["communaute", "discord", "meta"],
    status: "nouvelle",
    votes: 145,
    commentCount: 23,
    createdAt: "2026-05-27T11:30:00",
  },
  {
    id: "p12",
    title: "Générateur de landing pages en 30 secondes avec IA",
    body: "Tu décris ton projet en 2 phrases, l'IA génère une landing page complète (copy, design, CTA). Export en HTML/React. Parfait pour valider une idée rapidement sans passer 3 jours sur le design.",
    author: users[5],
    category: "idees-folles",
    tags: ["ia", "no-code", "landing-page"],
    status: "en-vote",
    votes: 312,
    commentCount: 54,
    createdAt: "2026-05-25T20:00:00",
  },
];

// --- Comments ---

export const comments: Record<string, Comment[]> = {
  p1: [
    {
      id: "c1",
      body: "J'adore le concept ! Ça me rappelle un peu HQ Trivia mais en version asynchrone. Le fait que ce soit entre potes change tout.",
      author: users[1],
      votes: 23,
      createdAt: "2026-05-27T15:00:00",
      replies: [
        {
          id: "c1-1",
          body: "Exactement l'idée ! Sauf que là c'est pas juste du quiz, c'est des vrais défis créatifs. Et le côté compétition entre groupes ajoute une layer de fun.",
          author: users[2],
          votes: 15,
          createdAt: "2026-05-27T15:30:00",
          replies: [
            {
              id: "c1-1-1",
              body: "Vous pensez quoi d'ajouter un système de paris ? Genre tu mises des points karma que ton pote va pas réussir le défi 😂",
              author: users[4],
              votes: 8,
              createdAt: "2026-05-27T16:00:00",
              replies: [],
            },
          ],
        },
      ],
    },
    {
      id: "c2",
      body: "Question technique : comment vous gérez la modération du contenu si les défis sont en photo/vidéo ? Faut un système de report solide.",
      author: users[3],
      votes: 18,
      createdAt: "2026-05-27T16:45:00",
      replies: [
        {
          id: "c2-1",
          body: "Bonne question. On pourrait combiner modération IA (genre un filtre NSFW) + report communautaire avec un système de karma-based trust.",
          author: users[0],
          votes: 12,
          createdAt: "2026-05-27T17:15:00",
          replies: [],
        },
      ],
    },
    {
      id: "c3",
      body: "Si cette app est buildée je l'installe direct. Mon groupe de potes serait dessus h24.",
      author: users[5],
      votes: 31,
      createdAt: "2026-05-27T18:00:00",
      replies: [],
    },
  ],
};

// --- Sprint Vote ---

export const sprintCandidates: SprintCandidate[] = [
  { id: "sv1", post: posts[0], totalVotes: 287 },
  { id: "sv2", post: posts[4], totalVotes: 198 },
  { id: "sv3", post: posts[6], totalVotes: 134 },
  { id: "sv4", post: posts[9], totalVotes: 267 },
  { id: "sv5", post: posts[11], totalVotes: 312 },
];

// --- Build Log ---

export const buildLogEntries: BuildLogEntry[] = [
  {
    id: "bl1",
    title: "Sprint #04 — Jour 1 : Setup & Architecture",
    body: "Aujourd'hui on a posé les fondations de l'app communautaire. Next.js 16, Tailwind v4, Supabase. Le plus gros challenge : le système de votes en temps réel. On a testé 3 approches différentes avant de trouver la bonne. Supabase Realtime FTW.",
    author: users[0],
    sprintNumber: 4,
    createdAt: "2026-05-22T20:00:00",
    images: [],
    poll: {
      question: "Quel feature vous voulez voir en premier ?",
      options: [
        { id: "blp1-a", label: "Feed + Votes", votes: 89 },
        { id: "blp1-b", label: "Sprint Vote", votes: 67 },
        { id: "blp1-c", label: "Profils + Karma", votes: 45 },
        { id: "blp1-d", label: "Commentaires threadés", votes: 34 },
      ],
    },
  },
  {
    id: "bl2",
    title: "Sprint #04 — Jour 3 : Le système de karma",
    body: "Le karma est le coeur de la communauté. Chaque upvote reçu = +1 karma. Chaque downvote = -1. Mais on a ajouté des multiplicateurs : un upvote d'un membre avec beaucoup de karma vaut plus. Ça crée un système naturel de trust. Les badges se débloquent automatiquement.",
    author: users[0],
    sprintNumber: 4,
    createdAt: "2026-05-24T21:00:00",
    images: [],
  },
  {
    id: "bl3",
    title: "Sprint #03 — Retro : Le Meal Planner IA",
    body: "Retour sur le sprint 3. L'app est live, 340 users en 2 semaines. Ce qui a marché : l'onboarding en 30 sec. Ce qui a foiré : la génération de recettes parfois WTF (non l'IA, on ne met pas de chocolat dans une soupe de poireaux). Leçons apprises pour le sprint 4.",
    author: users[0],
    sprintNumber: 3,
    createdAt: "2026-05-21T19:00:00",
    images: [],
    poll: {
      question: "Kill or Continue — App #03 ?",
      options: [
        { id: "blp2-a", label: "🟢 Continue", votes: 156 },
        { id: "blp2-b", label: "🔴 Kill", votes: 78 },
      ],
    },
  },
];

// --- Notifications ---

export const notifications: Notification[] = [
  {
    id: "n1",
    type: "reply",
    message: 'MarineBuilder a répondu à votre commentaire sur "App de micro-défis quotidiens"',
    read: false,
    createdAt: "2026-05-28T10:30:00",
    link: "/post/p1",
  },
  {
    id: "n2",
    type: "vote-threshold",
    message: 'Votre idée "Marketplace de side-projects" a dépassé 300 votes ! 🔥',
    read: false,
    createdAt: "2026-05-28T09:15:00",
    link: "/post/p2",
  },
  {
    id: "n3",
    type: "idea-retained",
    message: 'Votre idée "Marketplace de side-projects" a été retenue pour le prochain sprint !',
    read: false,
    createdAt: "2026-05-27T18:00:00",
    link: "/post/p2",
  },
  {
    id: "n4",
    type: "badge",
    message: 'Nouveau badge débloqué : Idea Maker 🎯',
    read: true,
    createdAt: "2026-05-27T18:01:00",
    link: "/profile/u3",
  },
  {
    id: "n5",
    type: "reply",
    message: 'Vassili a répondu à votre commentaire sur "Sprint #04 — Build Log"',
    read: true,
    createdAt: "2026-05-27T14:00:00",
    link: "/post/p4",
  },
  {
    id: "n6",
    type: "mention",
    message: 'LéaDesign vous a mentionné dans "Le design system est incroyable"',
    read: true,
    createdAt: "2026-05-26T19:00:00",
    link: "/post/p3",
  },
  {
    id: "n7",
    type: "vote-threshold",
    message: 'Votre idée "Un Tinder pour co-founders" a dépassé 150 votes !',
    read: true,
    createdAt: "2026-05-28T01:00:00",
    link: "/post/p5",
  },
];
