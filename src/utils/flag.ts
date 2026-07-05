/** Map nationality names to short codes for player image filenames */
const NATIONALITY_TO_IMG_CODE: Record<string, string> = {
  ARGENTINA: "arg",
  AUSTRIA: "aut",
  BELGIUM: "bel",
  BRAZIL: "bra",
  BULGARIA: "bul",
  CAMEROON: "cmr",
  COLUMBIA: "col",
  DENMARK: "den",
  ENGLAND: "eng",
  FRANCE: "fra",
  GERMANY: "ger",
  HOLLAND: "ned",
  IRELAND: "irl",
  ITALY: "ita",
  MEXICO: "mex",
  NIGERIA: "nga",
  NORWAY: "nor",
  ROMANIA: "rou",
  RUSSIA: "rus",
  SCOTLAND: "sco",
  "S. KOREA": "kor",
  SPAIN: "esp",
  SWEDEN: "swe",
  SWITZ: "swi",
  "U.S.A.": "usa",
  WALES: "wal",
};

/** Get the short country code for display (uppercase, e.g. "FRA", "ITA") */
export function getCountryCode(nationality: string): string {
  return (NATIONALITY_TO_IMG_CODE[nationality.toUpperCase()] ?? nationality.slice(0, 3)).toUpperCase();
}

/** Get the player image URL for a given nationality and shirt number.
 *  Falls back to player1.png if no specific image exists. */
export function getPlayerImageUrl(nationality: string, number: number): string {
  const code = NATIONALITY_TO_IMG_CODE[nationality.toUpperCase()] ?? nationality.slice(0, 3).toLowerCase();
  const filename = `${code}${number}.png`;
  const url = new URL(`../data/player-images/${filename}`, import.meta.url).href;
  return url;
}

/** ISO 3166-1 alpha-3 → alpha-2 for flag assets */
const ISO3_TO_ISO2: Record<string, string> = {
  ARGENTINA: "ar",
  AUSTRIA: "at",
  BRAZIL: "br",
  BELGIUM: "be",
  BULGARIA: "bg",
  CAMEROON: "cm",
  COLUMBIA: "co",
  DENMARK: "dk",
  ENGLAND: "gb",
  FRANCE: "fr",
  GERMANY: "de",
  HOLLAND: "nl",
  ITALY: "it",
  IRELAND: "ie",
  MEXICO: "mx",
  NIGERIA: "ng",
  NORWAY: "no",
  ROMANIA: "ro",
  RUSSIA: "ru",
  SCOTLAND: "gb-sct",
  SPAIN: "es",
  SWEDEN: "se",
  SWITZ: "ch",
  "S. KOREA": "kr",
  "U.S.A.": "us",
  WALES: "gb-wls",
};

export function nationalityToIso2(code: string): string {
  const upper = code.toUpperCase();
  return ISO3_TO_ISO2[upper] ?? upper.slice(0, 2).toLowerCase();
}

export function nationalityToFlagEmoji(code: string): string {
  const iso2 = nationalityToIso2(code).toUpperCase();
  if (iso2.length !== 2) return "";
  return [...iso2]
    .map((char) => String.fromCodePoint(0x1f1e6 - 65 + char.charCodeAt(0)))
    .join("");
}

export function nationalityToFlagUrl(code: string, height = 40): string {
  const iso2 = nationalityToIso2(code);
  return `https://flagcdn.com/h${height}/${iso2}.png`;
}

export function getFlagSrcSet(code: string, baseHeight = 40): string {
  const iso2 = nationalityToIso2(code);
  return `https://flagcdn.com/h${baseHeight * 2}/${iso2}.png 2x, https://flagcdn.com/h${baseHeight * 3}/${iso2}.png 3x`;
}
