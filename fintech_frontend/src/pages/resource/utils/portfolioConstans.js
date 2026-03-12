export const categoryConfig = {
  GOLD: {
    label: "Altın",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.12)",
    icon: "◈",
    border: "rgba(245,158,11,0.25)",
    description: "Gram altın, çeyrek, cumhuriyet...",
    symbols: ["GA", "CEYREK", "CUM", "ONS"],
  },
  CURRENCY: {
    label: "Döviz",
    color: "#34D399",
    bg: "rgba(52,211,153,0.12)",
    icon: "◎",
    border: "rgba(52,211,153,0.25)",
    description: "Dolar, Euro, Sterlin...",
    symbols: ["USD", "EUR", "GBP", "CHF", "JPY"],
  },
  CRYPTO: {
    label: "Kripto",
    color: "#A78BFA",
    bg: "rgba(167,139,250,0.12)",
    icon: "⬡",
    border: "rgba(167,139,250,0.25)",
    description: "Bitcoin, Ethereum ve diğerleri...",
    symbols: ["BTC", "ETH", "BNB", "SOL", "ADA"],
  },
  STOCK: {
    label: "Hisse",
    color: "#60A5FA",
    bg: "rgba(96,165,250,0.12)",
    icon: "◇",
    border: "rgba(96,165,250,0.25)",
    description: "BIST ve yabancı borsalar...",
    symbols: ["THYAO", "GARAN", "AKBNK", "EREGL"],
  },
};

export const formFields = [
  {
    name: "assetSymbol",
    label: "Sembol",
    placeholder: "BTC, USD, GA...",
    span: 1,
  },
  {
    name: "assetName",
    label: "Varlık Adı",
    placeholder: "Bitcoin, Dolar...",
    span: 1,
  },
  {
    name: "quantity",
    label: "Miktar",
    placeholder: "0.00",
    type: "number",
    span: 1,
  },
  {
    name: "purchasePrice",
    label: "Alış Fiyatı (₺)",
    placeholder: "0.00",
    type: "number",
    span: 1,
  },
  {
    name: "purchaseDate",
    label: "Alış Tarihi ve Saati",
    type: "datetime-local",
    span: 2,
  },
  {
    name: "notes",
    label: "Not (Opsiyonel)",
    placeholder: "Uzun vadeli yatırım...",
    span: 2,
  },
];
