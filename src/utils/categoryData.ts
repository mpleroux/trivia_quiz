import { decodeHTML } from ".";

interface CategoryData {
  abbr: string;
  color: string;
}

const categoryData: Record<string, CategoryData> = {
  "General Knowledge": { abbr: "GK", color: "#4B7BA7" },
  "Entertainment: Books": { abbr: "BO", color: "#8B5CF6" },
  "Entertainment: Film": { abbr: "FI", color: "#EF4444" },
  "Entertainment: Music": { abbr: "MU", color: "#10B981" },
  "Entertainment: Musicals & Theatres": { abbr: "MT", color: "#F97316" },
  "Entertainment: Television": { abbr: "TV", color: "#EC4899" },
  "Entertainment: Video Games": { abbr: "VG", color: "#06B6D4" },
  "Entertainment: Board Games": { abbr: "BG", color: "#92400E" },
  "Science & Nature": { abbr: "SN", color: "#14B8A6" },
  "Science: Computers": { abbr: "CP", color: "#EAB308" },
  "Science: Mathematics": { abbr: "MA", color: "#84CC16" },
  Mythology: { abbr: "MY", color: "#4F46E5" },
  Sports: { abbr: "SP", color: "#FB7185" },
  Geography: { abbr: "GE", color: "#1E3A8A" },
  History: { abbr: "HI", color: "#991B1B" },
  Politics: { abbr: "PO", color: "#D97706" },
  Art: { abbr: "AR", color: "#A855F7" },
  Celebrities: { abbr: "CE", color: "#00D9FF" },
  Animals: { abbr: "AN", color: "#6B7280" },
  Vehicles: { abbr: "VE", color: "#64748B" },
  "Entertainment: Comics": { abbr: "CO", color: "#DC2626" },
  "Science: Gadgets": { abbr: "GA", color: "#20C997" },
  "Entertainment: Japanese Anime & Manga": { abbr: "JA", color: "#7C3AED" },
  "Entertainment: Cartoon & Animations": { abbr: "CA", color: "#F97316" },
};

function getCategoryData(category: string): CategoryData {
  const decoded = decodeHTML(category);
  return categoryData[decoded] || { abbr: "?", color: "#999999" };
}

export function getCategoryColor(category: string): string {
  return getCategoryData(category).color;
}

export function getCategoryAbbreviation(category: string): string {
  return getCategoryData(category).abbr;
}
