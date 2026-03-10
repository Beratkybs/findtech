import { useState, useEffect } from "react";

const mockPortfolio = [
  {
    id: 1,
    assetSymbol: "GA",
    assetName: "Gram Altın",
    category: "GOLD",
    quantity: 15.5,
    purchasePrice: 2850.0,
    purchaseDate: "2024-03-15",
    notes: "Uzun vadeli",
  },
  {
    id: 2,
    assetSymbol: "USD",
    assetName: "Amerikan Doları",
    category: "CURRENCY",
    quantity: 2500,
    purchasePrice: 32.1,
    purchaseDate: "2024-05-01",
    notes: "",
  },
  {
    id: 3,
    assetSymbol: "BTC",
    assetName: "Bitcoin",
    category: "CRYPTO",
    quantity: 0.05,
    purchasePrice: 2100000,
    purchaseDate: "2024-01-20",
    notes: "DCA stratejisi",
  },
  {
    id: 4,
    assetSymbol: "THYAO",
    assetName: "Türk Hava Yolları",
    category: "STOCK",
    quantity: 200,
    purchasePrice: 285.5,
    purchaseDate: "2024-06-10",
    notes: "",
  },
  {
    id: 5,
    assetSymbol: "EUR",
    assetName: "Euro",
    category: "CURRENCY",
    quantity: 1000,
    purchasePrice: 34.8,
    purchaseDate: "2024-04-22",
    notes: "",
  },
];

const mockCurrentPrices = {
  GA: 3120.0,
  USD: 33.45,
  BTC: 2450000,
  THYAO: 310.2,
  EUR: 36.1,
};

const categoryConfig = {
  GOLD: {
    label: "Altın",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.12)",
    icon: "◈",
  },
  CURRENCY: {
    label: "Döviz",
    color: "#34D399",
    bg: "rgba(52,211,153,0.12)",
    icon: "◎",
  },
  CRYPTO: {
    label: "Kripto",
    color: "#A78BFA",
    bg: "rgba(167,139,250,0.12)",
    icon: "⬡",
  },
  STOCK: {
    label: "Hisse",
    color: "#60A5FA",
    bg: "rgba(96,165,250,0.12)",
    icon: "◇",
  },
};

function formatCurrency(value) {
  if (value >= 1000000) return `₺${(value / 1000000).toFixed(2)}M`;
  if (value >= 1000) return `₺${(value / 1000).toFixed(1)}K`;
  return `₺${value.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatPercent(value) {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [animatedValues, setAnimatedValues] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);

  const portfolio = mockPortfolio;

  const enriched = portfolio.map((item) => {
    const currentPrice =
      mockCurrentPrices[item.assetSymbol] || item.purchasePrice;
    const currentValue = item.quantity * currentPrice;
    const costBasis = item.quantity * item.purchasePrice;
    const pnl = currentValue - costBasis;
    const pnlPercent = (pnl / costBasis) * 100;
    return { ...item, currentPrice, currentValue, costBasis, pnl, pnlPercent };
  });

  const filtered =
    activeFilter === "ALL"
      ? enriched
      : enriched.filter((i) => i.category === activeFilter);

  const totalValue = enriched.reduce((s, i) => s + i.currentValue, 0);
  const totalCost = enriched.reduce((s, i) => s + i.costBasis, 0);
  const totalPnL = totalValue - totalCost;
  const totalPnLPercent = (totalPnL / totalCost) * 100;

  const categoryBreakdown = Object.entries(
    enriched.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.currentValue;
      return acc;
    }, {}),
  ).map(([cat, val]) => ({ cat, val, pct: (val / totalValue) * 100 }));

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValues({ total: true }), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080C14",
        color: "#E8EDF5",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        padding: "0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background atmosphere */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none",
          zIndex: 0,
          background:
            "radial-gradient(ellipse 80% 50% at 20% -10%, rgba(99,102,241,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 110%, rgba(245,158,11,0.06) 0%, transparent 60%)",
        }}
      />

      {/* Nav */}
      <nav
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 40px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(10px)",
          background: "rgba(8,12,20,0.8)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "10px",
              background: "linear-gradient(135deg, #6366F1, #A78BFA)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            ₺
          </div>
          <span
            style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.5px" }}
          >
            VarlıkTakip
          </span>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#E8EDF5",
              borderRadius: 10,
              padding: "8px 18px",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            Portföy
          </button>
          <a
            href="/add"
            style={{
              background: "linear-gradient(135deg, #6366F1, #818CF8)",
              border: "none",
              color: "white",
              borderRadius: 10,
              padding: "8px 18px",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> Birikim Ekle
          </a>
        </div>
      </nav>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1200,
          margin: "0 auto",
          padding: "40px 40px",
        }}
      >
        {/* Hero stat */}
        <div style={{ marginBottom: 40 }}>
          <p
            style={{
              color: "rgba(232,237,245,0.45)",
              fontSize: 13,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            Toplam Portföy Değeri
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 20,
              flexWrap: "wrap",
            }}
          >
            <h1
              style={{
                fontSize: "clamp(36px, 6vw, 64px)",
                fontWeight: 800,
                letterSpacing: "-2px",
                margin: 0,
                lineHeight: 1,
                background:
                  "linear-gradient(135deg, #E8EDF5 40%, rgba(232,237,245,0.5))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                opacity: animatedValues.total ? 1 : 0,
                transform: animatedValues.total
                  ? "translateY(0)"
                  : "translateY(20px)",
                transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              {formatCurrency(totalValue)}
            </h1>
            <div
              style={{
                marginBottom: 8,
                display: "flex",
                alignItems: "center",
                gap: 8,
                background:
                  totalPnL >= 0
                    ? "rgba(52,211,153,0.12)"
                    : "rgba(239,68,68,0.12)",
                border: `1px solid ${totalPnL >= 0 ? "rgba(52,211,153,0.25)" : "rgba(239,68,68,0.25)"}`,
                borderRadius: 8,
                padding: "6px 14px",
              }}
            >
              <span
                style={{
                  color: totalPnL >= 0 ? "#34D399" : "#EF4444",
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                {totalPnL >= 0 ? "▲" : "▼"}{" "}
                {formatPercent(Math.abs(totalPnLPercent))}
              </span>
              <span style={{ color: "rgba(232,237,245,0.5)", fontSize: 13 }}>
                {totalPnL >= 0 ? "+" : "-"}
                {formatCurrency(Math.abs(totalPnL))}
              </span>
            </div>
          </div>
        </div>

        {/* Summary cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 16,
            marginBottom: 40,
          }}
        >
          {[
            {
              label: "Toplam Maliyet",
              value: formatCurrency(totalCost),
              sub: `${enriched.length} pozisyon`,
              color: "#94A3B8",
            },
            {
              label: "Toplam Kar/Zarar",
              value: formatCurrency(Math.abs(totalPnL)),
              sub: formatPercent(totalPnLPercent),
              color: totalPnL >= 0 ? "#34D399" : "#EF4444",
            },
            {
              label: "En İyi Performans",
              value:
                enriched.sort((a, b) => b.pnlPercent - a.pnlPercent)[0]
                  ?.assetName || "-",
              sub: formatPercent(enriched[0]?.pnlPercent || 0),
              color: "#A78BFA",
            },
            {
              label: "Varlık Çeşidi",
              value: Object.keys(categoryConfig)
                .filter((c) => enriched.some((i) => i.category === c))
                .length.toString(),
              sub: "farklı kategori",
              color: "#60A5FA",
            },
          ].map((card, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 16,
                padding: "20px 22px",
                transition: "border-color 0.2s, background 0.2s",
              }}
            >
              <p
                style={{
                  color: "rgba(232,237,245,0.4)",
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 8,
                }}
              >
                {card.label}
              </p>
              <p
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#E8EDF5",
                  margin: "0 0 4px",
                }}
              >
                {card.value}
              </p>
              <p style={{ fontSize: 13, color: card.color, margin: 0 }}>
                {card.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Category distribution bar */}
        <div style={{ marginBottom: 40 }}>
          <p
            style={{
              color: "rgba(232,237,245,0.4)",
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 14,
            }}
          >
            Dağılım
          </p>
          <div
            style={{
              display: "flex",
              gap: 3,
              height: 8,
              borderRadius: 100,
              overflow: "hidden",
              marginBottom: 16,
            }}
          >
            {categoryBreakdown.map(({ cat, pct }) => (
              <div
                key={cat}
                style={{
                  width: `${pct}%`,
                  background: categoryConfig[cat]?.color || "#666",
                  transition: "width 1s cubic-bezier(0.16,1,0.3,1)",
                }}
              />
            ))}
          </div>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {categoryBreakdown.map(({ cat, val, pct }) => (
              <div
                key={cat}
                style={{ display: "flex", alignItems: "center", gap: 8 }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: categoryConfig[cat]?.color,
                  }}
                />
                <span style={{ fontSize: 13, color: "rgba(232,237,245,0.6)" }}>
                  {categoryConfig[cat]?.label}
                </span>
                <span
                  style={{ fontSize: 13, fontWeight: 600, color: "#E8EDF5" }}
                >
                  {pct.toFixed(1)}%
                </span>
                <span style={{ fontSize: 12, color: "rgba(232,237,245,0.35)" }}>
                  {formatCurrency(val)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Filter tabs */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 24,
            flexWrap: "wrap",
          }}
        >
          {["ALL", ...Object.keys(categoryConfig)].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                background:
                  activeFilter === f
                    ? (categoryConfig[f]?.color || "rgba(99,102,241,0.9)") +
                      (categoryConfig[f] ? "" : "")
                    : "rgba(255,255,255,0.05)",
                color:
                  activeFilter === f
                    ? f === "ALL"
                      ? "white"
                      : "#080C14"
                    : "rgba(232,237,245,0.55)",
                border: `1px solid ${activeFilter === f ? "transparent" : "rgba(255,255,255,0.08)"}`,
                borderRadius: 10,
                padding: "7px 16px",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 600,
                transition: "all 0.2s",
              }}
            >
              {f === "ALL" ? "Tümü" : categoryConfig[f]?.label}
            </button>
          ))}
        </div>

        {/* Portfolio table */}
        <div
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
              padding: "14px 24px",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {[
              "Varlık",
              "Miktar",
              "Alış Fiyatı",
              "Güncel Değer",
              "Kar/Zarar",
            ].map((h) => (
              <span
                key={h}
                style={{
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "rgba(232,237,245,0.3)",
                  fontWeight: 600,
                }}
              >
                {h}
              </span>
            ))}
          </div>

          {filtered.map((item, idx) => {
            const cfg = categoryConfig[item.category];
            const isHovered = hoveredCard === item.id;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
                  padding: "18px 24px",
                  alignItems: "center",
                  borderBottom:
                    idx < filtered.length - 1
                      ? "1px solid rgba(255,255,255,0.04)"
                      : "none",
                  background: isHovered
                    ? "rgba(255,255,255,0.025)"
                    : "transparent",
                  transition: "background 0.15s",
                  cursor: "default",
                }}
              >
                {/* Asset */}
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      background: cfg?.bg || "rgba(255,255,255,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      color: cfg?.color,
                      flexShrink: 0,
                      border: `1px solid ${cfg?.color}22`,
                    }}
                  >
                    {cfg?.icon}
                  </div>
                  <div>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: 15 }}>
                      {item.assetName}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                        alignItems: "center",
                        marginTop: 3,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12,
                          color: cfg?.color,
                          background: cfg?.bg,
                          padding: "2px 8px",
                          borderRadius: 6,
                          fontWeight: 600,
                        }}
                      >
                        {item.assetSymbol}
                      </span>
                      {item.notes && (
                        <span
                          style={{
                            fontSize: 11,
                            color: "rgba(232,237,245,0.3)",
                          }}
                        >
                          {item.notes}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <p style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>
                    {item.quantity.toLocaleString("tr-TR")}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 12,
                      color: "rgba(232,237,245,0.35)",
                      marginTop: 2,
                    }}
                  >
                    {new Date(item.purchaseDate).toLocaleDateString("tr-TR")}
                  </p>
                </div>

                {/* Purchase Price */}
                <div>
                  <p style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>
                    ₺
                    {item.purchasePrice.toLocaleString("tr-TR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 12,
                      color: "rgba(232,237,245,0.35)",
                      marginTop: 2,
                    }}
                  >
                    alış
                  </p>
                </div>

                {/* Current Value */}
                <div>
                  <p style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>
                    {formatCurrency(item.currentValue)}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 12,
                      color: "rgba(232,237,245,0.35)",
                      marginTop: 2,
                    }}
                  >
                    ₺
                    {item.currentPrice.toLocaleString("tr-TR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    /adet
                  </p>
                </div>

                {/* PnL */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: item.pnl >= 0 ? "#34D399" : "#EF4444",
                    }}
                  >
                    {item.pnl >= 0 ? "+" : ""}
                    {formatCurrency(item.pnl)}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      marginTop: 3,
                      color:
                        item.pnl >= 0
                          ? "rgba(52,211,153,0.7)"
                          : "rgba(239,68,68,0.7)",
                    }}
                  >
                    {formatPercent(item.pnlPercent)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div style={{ marginTop: 32, textAlign: "center" }}>
          <a
            href="/add"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background:
                "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(167,139,250,0.15))",
              border: "1px solid rgba(99,102,241,0.3)",
              color: "#A78BFA",
              borderRadius: 14,
              padding: "14px 32px",
              textDecoration: "none",
              fontSize: 15,
              fontWeight: 600,
              transition: "all 0.2s",
            }}
          >
            <span style={{ fontSize: 20 }}>+</span>
            Yeni Birikim Ekle
          </a>
        </div>
      </div>
    </div>
  );
}
