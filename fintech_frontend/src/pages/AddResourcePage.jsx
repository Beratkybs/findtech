import { useState } from "react";

import { usePortfolioStore } from "../../backend/store/usePortfolioStore.js";
import toast from "react-hot-toast";

const categoryConfig = {
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

const initialForm = {
  assetSymbol: "",
  assetName: "",
  category: "",
  quantity: "",
  purchasePrice: "",
  purchaseDate: "",
  notes: "",
};

export default function AddResourcePage() {
  const [form, setForm] = useState(initialForm);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const { addPortfolio } = usePortfolioStore();

  const selectedCfg = form.category ? categoryConfig[form.category] : null;

  function handleCategorySelect(cat) {
    setForm((f) => ({ ...f, category: cat, assetSymbol: "", assetName: "" }));
    setStep(2);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: "" }));
  }

  function handleSymbolQuick(sym) {
    const nameMap = {
      GA: "Gram Altın",
      CEYREK: "Çeyrek Altın",
      CUM: "Cumhuriyet Altını",
      ONS: "Ons Altın",
      USD: "Amerikan Doları",
      EUR: "Euro",
      GBP: "İngiliz Sterlini",
      CHF: "İsviçre Frangı",
      JPY: "Japon Yeni",
      BTC: "Bitcoin",
      ETH: "Ethereum",
      BNB: "BNB",
      SOL: "Solana",
      ADA: "Cardano",
      THYAO: "Türk Hava Yolları",
      GARAN: "Garanti BBVA",
      AKBNK: "Akbank",
      EREGL: "Ereğli Demir Çelik",
    };
    setForm((f) => ({
      ...f,
      assetSymbol: sym,
      assetName: nameMap[sym] || sym,
    }));
  }

  function validate() {
    const e = {};
    if (!form.assetSymbol) e.assetSymbol = "Sembol gerekli";
    if (!form.assetName) e.assetName = "Varlık adı gerekli";
    if (!form.quantity || isNaN(form.quantity) || +form.quantity <= 0)
      e.quantity = "Geçerli bir miktar girin";
    if (
      !form.purchasePrice ||
      isNaN(form.purchasePrice) ||
      +form.purchasePrice <= 0
    )
      e.purchasePrice = "Geçerli bir fiyat girin";
    if (!form.purchaseDate) e.purchaseDate = "Tarih gerekli";
    return e;
  }

  const handleSubmit = async () => {
    const payload = {
      ...form,
      quantity: parseFloat(form.quantity),
      purchasePrice: parseFloat(form.purchasePrice),
      purchaseDate: form.purchaseDate + ":00",
    };

    try {
      await addPortfolio(payload);
    } catch (error) {
      const backendErr = error.message || "Bilinmeyen Hata";
      toast.error(backendErr);
    }
  };

  function handleReset() {
    setForm(initialForm);
    setStep(1);
    setSuccess(false);
    setErrors({});
  }

  if (success) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#080C14",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 400 }}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "rgba(52,211,153,0.12)",
              border: "2px solid rgba(52,211,153,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              margin: "0 auto 24px",
              animation: "popIn 0.5s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            ✓
          </div>
          <h2
            style={{
              color: "#E8EDF5",
              fontSize: 26,
              fontWeight: 800,
              marginBottom: 10,
              letterSpacing: "-0.5px",
            }}
          >
            Birikim Eklendi!
          </h2>
          <p
            style={{
              color: "rgba(232,237,245,0.45)",
              fontSize: 15,
              marginBottom: 32,
            }}
          >
            <strong style={{ color: selectedCfg?.color }}>
              {form.assetName}
            </strong>{" "}
            portföyünüze başarıyla eklendi.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button
              onClick={handleReset}
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#E8EDF5",
                borderRadius: 12,
                padding: "12px 24px",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Yeni Ekle
            </button>
            <a
              href="/"
              style={{
                background: "linear-gradient(135deg, #6366F1, #818CF8)",
                border: "none",
                color: "white",
                borderRadius: 12,
                padding: "12px 24px",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Portföye Git
            </a>
          </div>
        </div>
        <style>{`@keyframes popIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }`}</style>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080C14",
        color: "#E8EDF5",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      }}
    >
      {/* Background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 60% 40% at 70% 20%, rgba(99,102,241,0.07) 0%, transparent 60%)",
        }}
      />

      {/* Nav */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "20px 40px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(8,12,20,0.8)",
          backdropFilter: "blur(10px)",
          position: "relative",
          zIndex: 10,
        }}
      >
        <a
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 36,
            height: 36,
            borderRadius: 10,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#E8EDF5",
            textDecoration: "none",
            fontSize: 18,
            lineHeight: 1,
          }}
        >
          ←
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
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
      </nav>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 680,
          margin: "0 auto",
          padding: "48px 24px",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          {/* Progress */}
          <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
            {[1, 2].map((s) => (
              <div
                key={s}
                style={{
                  height: 3,
                  flex: 1,
                  borderRadius: 100,
                  background:
                    s <= step
                      ? "linear-gradient(90deg, #6366F1, #A78BFA)"
                      : "rgba(255,255,255,0.1)",
                  transition: "background 0.4s",
                }}
              />
            ))}
          </div>
          <p
            style={{
              color: "rgba(232,237,245,0.4)",
              fontSize: 13,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 6,
            }}
          >
            {step === 1 ? "Adım 1 / 2" : "Adım 2 / 2"}
          </p>
          <h1
            style={{
              fontSize: 32,
              fontWeight: 800,
              letterSpacing: "-1px",
              margin: 0,
            }}
          >
            {step === 1 ? "Ne eklemek istersiniz?" : "Detayları Girin"}
          </h1>
          {step === 2 && form.category && (
            <button
              onClick={() => setStep(1)}
              style={{
                background: "none",
                border: "none",
                color: selectedCfg?.color,
                fontSize: 13,
                cursor: "pointer",
                padding: "8px 0",
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontFamily: "inherit",
              }}
            >
              ← Kategori: {selectedCfg?.label}
            </button>
          )}
        </div>

        {/* Step 1: Category selection */}
        {step === 1 && (
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
          >
            {Object.entries(categoryConfig).map(([key, cfg]) => (
              <button
                key={key}
                onClick={() => handleCategorySelect(key)}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid rgba(255,255,255,0.08)`,
                  borderRadius: 20,
                  padding: "28px 24px",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.2s",
                  fontFamily: "inherit",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = cfg.bg;
                  e.currentTarget.style.borderColor = cfg.border;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: cfg.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    color: cfg.color,
                    marginBottom: 16,
                    border: `1px solid ${cfg.border}`,
                  }}
                >
                  {cfg.icon}
                </div>
                <p
                  style={{
                    margin: "0 0 6px",
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#E8EDF5",
                  }}
                >
                  {cfg.label}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: 13,
                    color: "rgba(232,237,245,0.4)",
                  }}
                >
                  {cfg.description}
                </p>
              </button>
            ))}
          </div>
        )}

        {/* Step 2: Form */}
        {step === 2 && selectedCfg && (
          <div>
            {/* Quick symbol buttons */}
            <div style={{ marginBottom: 28 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 12,
                  color: "rgba(232,237,245,0.4)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 10,
                }}
              >
                Hızlı Seçim
              </label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {selectedCfg.symbols.map((sym) => (
                  <button
                    key={sym}
                    onClick={() => handleSymbolQuick(sym)}
                    style={{
                      background:
                        form.assetSymbol === sym
                          ? selectedCfg.bg
                          : "rgba(255,255,255,0.05)",
                      border: `1px solid ${form.assetSymbol === sym ? selectedCfg.border : "rgba(255,255,255,0.1)"}`,
                      color:
                        form.assetSymbol === sym
                          ? selectedCfg.color
                          : "rgba(232,237,245,0.6)",
                      borderRadius: 10,
                      padding: "7px 16px",
                      cursor: "pointer",
                      fontSize: 13,
                      fontWeight: 600,
                      transition: "all 0.15s",
                      fontFamily: "inherit",
                    }}
                  >
                    {sym}
                  </button>
                ))}
              </div>
            </div>

            {/* Form fields */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              {[
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
                  label: "Alış Tarihi",
                  type: "datetime-local",
                  span: 2,
                },
                {
                  name: "notes",
                  label: "Not (Opsiyonel)",
                  placeholder: "Uzun vadeli yatırım...",
                  span: 2,
                },
              ].map((field) => (
                <div
                  key={field.name}
                  style={{ gridColumn: `span ${field.span}` }}
                >
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      color: "rgba(232,237,245,0.45)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginBottom: 8,
                    }}
                  >
                    {field.label}
                  </label>
                  <input
                    name={field.name}
                    type={field.type || "text"}
                    value={form[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      background: "rgba(255,255,255,0.04)",
                      border: `1px solid ${errors[field.name] ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)"}`,
                      borderRadius: 12,
                      padding: "13px 16px",
                      color: "#E8EDF5",
                      fontSize: 15,
                      outline: "none",
                      fontFamily: "inherit",
                      transition: "border-color 0.15s",
                      colorScheme: "dark",
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = selectedCfg.color + "80")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = errors[field.name]
                        ? "rgba(239,68,68,0.5)"
                        : "rgba(255,255,255,0.1)")
                    }
                  />
                  {errors[field.name] && (
                    <p
                      style={{
                        color: "#EF4444",
                        fontSize: 12,
                        margin: "5px 0 0",
                        fontWeight: 500,
                      }}
                    >
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Preview card */}
            {form.assetName && form.quantity && form.purchasePrice && (
              <div
                style={{
                  marginTop: 24,
                  background: selectedCfg.bg,
                  border: `1px solid ${selectedCfg.border}`,
                  borderRadius: 16,
                  padding: "20px 24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <p
                    style={{
                      margin: "0 0 4px",
                      fontSize: 13,
                      color: "rgba(232,237,245,0.5)",
                    }}
                  >
                    Tahmini Değer
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 22,
                      fontWeight: 800,
                      color: selectedCfg.color,
                    }}
                  >
                    ₺
                    {(
                      parseFloat(form.quantity || 0) *
                      parseFloat(form.purchasePrice || 0)
                    ).toLocaleString("tr-TR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p
                    style={{
                      margin: "0 0 4px",
                      color: "rgba(232,237,245,0.5)",
                      fontSize: 13,
                    }}
                  >
                    {form.quantity} × ₺
                    {parseFloat(form.purchasePrice || 0).toLocaleString(
                      "tr-TR",
                    )}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#E8EDF5",
                    }}
                  >
                    {form.assetName}
                  </p>
                </div>
              </div>
            )}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                width: "100%",
                marginTop: 24,
                background: loading
                  ? "rgba(99,102,241,0.5)"
                  : `linear-gradient(135deg, #6366F1, #818CF8)`,
                border: "none",
                color: "white",
                borderRadius: 14,
                padding: "16px",
                fontSize: 16,
                fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "inherit",
                letterSpacing: "-0.3px",
                transition: "opacity 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
            >
              {loading ? (
                <>
                  <span
                    style={{
                      width: 18,
                      height: 18,
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTopColor: "white",
                      borderRadius: "50%",
                      display: "inline-block",
                      animation: "spin 0.7s linear infinite",
                    }}
                  />
                  Ekleniyor...
                </>
              ) : (
                <>Portföye Ekle</>
              )}
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.6); cursor: pointer; }
        input::placeholder { color: rgba(232,237,245,0.2); }
        input[type="number"]::-webkit-inner-spin-button { -webkit-appearance: none; }
      `}</style>
    </div>
  );
}
