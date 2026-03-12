import { useState } from "react";
import { usePortfolioStore } from "../../../../backend/store/usePortfolioStore.js";
import toast from "react-hot-toast";

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

const initialForm = {
  assetSymbol: "",
  assetName: "",
  category: "",
  quantity: "",
  purchasePrice: "",
  purchaseDate: "",
  notes: "",
};

const validate = (form) => {
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
};

export const useAddResource = () => {
  const [form, setForm] = useState(initialForm);
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const { addPortfolio, loading } = usePortfolioStore();

  const handleCategorySelect = (cat) => {
    setForm((f) => ({ ...f, category: cat, assetSymbol: "", assetName: "" }));
    setStep(2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSymbolQuick = (sym) => {
    setForm((f) => ({
      ...f,
      assetSymbol: sym,
      assetName: nameMap[sym] || sym,
    }));
  };

  const handleSubmit = async () => {
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    try {
      const payload = {
        ...form,
        quantity: parseFloat(form.quantity),
        purchasePrice: parseFloat(form.purchasePrice),
        purchaseDate: form.purchaseDate + ":00",
      };
      await addPortfolio(payload);
      setSuccess(true);
    } catch (error) {
      toast.error(error.message || "Bilinmeyen Hata");
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setStep(1);
    setSuccess(false);
    setErrors({});
  };

  return {
    form,
    step,
    loading,
    success,
    errors,
    handleCategorySelect,
    handleChange,
    handleSymbolQuick,
    handleSubmit,
    handleReset,
    setStep,
  };
};
