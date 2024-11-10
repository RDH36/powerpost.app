import {
  AlignLeft,
  Code,
  Hash,
  List,
  MessageSquare,
  Share2,
  SplitSquareVertical,
} from "lucide-react";

export const LANGUAGE = {
  English: "🇬🇧",
  French: "🇫🇷",
  Spanish: "🇪🇸",
  German: "🇩🇪",
  Chinese: "🇨🇳",
  Japanese: "🇯🇵",
  Russian: "🇷🇺",
  Portuguese: "🇵🇹",
  Italian: "🇮🇹",
  Arabic: "🇸🇦",
} as const;

export const postModes = [
  { value: "SHORT", icon: AlignLeft, label: "Short" },
  { value: "TWEET", icon: Share2, label: "Tweet" },
  { value: "THREAD", icon: MessageSquare, label: "Thread" },
  { value: "BULLET_POINT", icon: List, label: "Bullet Point" },
  { value: "TOP3", icon: Hash, label: "Top 3" },
  { value: "MAIN_POINTS", icon: SplitSquareVertical, label: "Main Points" },
  { value: "CODE", icon: Code, label: "Code" },
];
