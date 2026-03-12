import { categoryConfig } from "./utils/portfolioConstans.js";
import { useAddResource } from "./hooks/useAddResource.js";
import SuccessScreen from "./components/SuccessScreen.jsx";
import CategoryGrid from "./components/CategoryGrid.jsx";
import ResourceForm from "./components/ResourceForm.jsx";

const AddResourcePage = () => {
  const {
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
  } = useAddResource();

  const selectedCfg = form.category ? categoryConfig[form.category] : null;

  if (success) {
    return (
      <SuccessScreen
        assetName={form.assetName}
        selectedCfg={selectedCfg}
        onReset={handleReset}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#080C14] text-white font-sans">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_40%_at_70%_20%,rgba(99,102,241,0.07),transparent)]" />

      {/* Navbar */}
      <nav className="sticky top-0 z-10 flex items-center gap-3 px-10 py-5 border-b border-white/[0.06] bg-[rgba(8,12,20,0.8)] backdrop-blur-xl">
        <a
          href="/"
          className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white hover:bg-white/10 transition-colors"
        >
          ←
        </a>
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center font-extrabold text-base shadow-lg shadow-indigo-500/20">
            ₺
          </div>
          <span className="font-extrabold text-lg tracking-tight">
            VarlıkTakip
          </span>
        </div>
      </nav>

      <div className="relative z-[1] max-w-2xl mx-auto px-6 py-12">
        {/* Progress + Header */}
        <div className="mb-10">
          <div className="flex gap-2 mb-6">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={`flex-1 h-0.5 rounded-full transition-all duration-500 ${
                  s <= step
                    ? "bg-gradient-to-r from-indigo-500 to-violet-400"
                    : "bg-white/10"
                }`}
              />
            ))}
          </div>

          <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-2">
            {step === 1 ? "Adım 1 / 2" : "Adım 2 / 2"}
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight">
            {step === 1 ? "Ne eklemek istersiniz?" : "Detayları Girin"}
          </h1>

          {step === 2 && selectedCfg && (
            <button
              onClick={() => setStep(1)}
              className="mt-2 text-sm font-semibold flex items-center gap-1 hover:opacity-70 transition-opacity"
              style={{ color: selectedCfg.color }}
            >
              ← Kategori: {selectedCfg.label}
            </button>
          )}
        </div>

        {/* Step 1 — Category grid */}
        {step === 1 && <CategoryGrid onSelect={handleCategorySelect} />}

        {/* Step 2 — Form */}
        {step === 2 && selectedCfg && (
          <ResourceForm
            form={form}
            errors={errors}
            loading={loading}
            selectedCfg={selectedCfg}
            onSymbolQuick={handleSymbolQuick}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default AddResourcePage;
