import { decodeHTML } from ".";

interface CategoryData {
  abbr: string;
  color: string;
}

const categoryData: Record<string, CategoryData> = {
  "General Knowledge": { abbr: "GK", color: "#B684D4" },
  "Entertainment: Books": { abbr: "BO", color: "#E278A0" },
  "Entertainment: Film": { abbr: "FI", color: "#E278A0" },
  "Entertainment: Music": { abbr: "MU", color: "#E278A0" },
  "Entertainment: Musicals & Theatres": { abbr: "MT", color: "#E278A0" },
  "Entertainment: Television": { abbr: "TV", color: "#E278A0" },
  "Entertainment: Video Games": { abbr: "VG", color: "#E278A0" },
  "Entertainment: Board Games": { abbr: "BG", color: "#E278A0" },
  "Science & Nature": { abbr: "SN", color: "#4EB58A" },
  "Science: Computers": { abbr: "CP", color: "#4EB58A" },
  "Science: Mathematics": { abbr: "MA", color: "#4EB58A" },
  Mythology: { abbr: "MY", color: "#ABA197" },
  Sports: { abbr: "SP", color: "#E79164" },
  Geography: { abbr: "GE", color: "#4A9DD0" },
  History: { abbr: "HI", color: "#EBDD65" },
  Politics: { abbr: "PO", color: "#EBDD65" },
  Art: { abbr: "AR", color: "#ABA197" },
  Celebrities: { abbr: "CE", color: "#E278A0" },
  Animals: { abbr: "AN", color: "#4EB58A" },
  Vehicles: { abbr: "VE", color: "#B684D4" },
  "Entertainment: Comics": { abbr: "CO", color: "#E278A0" },
  "Science: Gadgets": { abbr: "GA", color: "#4EB58A" },
  "Entertainment: Japanese Anime & Manga": { abbr: "JA", color: "#E278A0" },
  "Entertainment: Cartoon & Animations": { abbr: "CA", color: "#E278A0" },
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
