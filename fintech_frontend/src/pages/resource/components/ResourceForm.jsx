import { formFields } from "../utils/portfolioConstans.js";

const Spinner = () => (
  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
);

const ResourceForm = ({
  form,
  errors,
  loading,
  selectedCfg,
  onSymbolQuick,
  onChange,
  onSubmit,
}) => {
  const previewTotal =
    parseFloat(form.quantity || 0) * parseFloat(form.purchasePrice || 0);

  return (
    <div>
      {/* Quick symbol buttons */}
      <div className="mb-7">
        <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">
          Hızlı Seçim
        </label>
        <div className="flex gap-2 flex-wrap">
          {selectedCfg.symbols.map((sym) => (
            <button
              key={sym}
              onClick={() => onSymbolQuick(sym)}
              className="px-4 py-2 rounded-xl text-sm font-bold border transition-all duration-150"
              style={
                form.assetSymbol === sym
                  ? {
                      background: selectedCfg.bg,
                      color: selectedCfg.color,
                      borderColor: selectedCfg.border,
                    }
                  : {
                      background: "rgba(255,255,255,0.05)",
                      color: "rgba(232,237,245,0.6)",
                      borderColor: "rgba(255,255,255,0.1)",
                    }
              }
            >
              {sym}
            </button>
          ))}
        </div>
      </div>

      {/* Form grid */}
      <div className="grid grid-cols-2 gap-4">
        {formFields.map((field) => (
          <div
            key={field.name}
            className={field.span === 2 ? "col-span-2" : "col-span-1"}
          >
            <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
              {field.label}
            </label>
            <input
              name={field.name}
              type={field.type || "text"}
              value={form[field.name]}
              onChange={onChange}
              placeholder={field.placeholder}
              className={`w-full bg-white/[0.04] border rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none transition-all duration-200 [color-scheme:dark]
                ${errors[field.name] ? "border-red-500/50" : "border-white/10"}`}
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
              <p className="text-red-400 text-xs mt-1.5 font-medium">
                {errors[field.name]}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Preview card */}
      {form.assetName && form.quantity && form.purchasePrice && (
        <div
          className="mt-6 rounded-2xl px-6 py-5 flex items-center justify-between border"
          style={{
            background: selectedCfg.bg,
            borderColor: selectedCfg.border,
          }}
        >
          <div>
            <p className="text-white/40 text-xs mb-1">Tahmini Değer</p>
            <p
              className="text-2xl font-extrabold"
              style={{ color: selectedCfg.color }}
            >
              ₺
              {previewTotal.toLocaleString("tr-TR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-white/40 text-xs mb-1">
              {form.quantity} × ₺
              {parseFloat(form.purchasePrice || 0).toLocaleString("tr-TR")}
            </p>
            <p className="text-white font-semibold text-sm">{form.assetName}</p>
          </div>
        </div>
      )}

      {/* Submit button */}
      <button
        onClick={onSubmit}
        disabled={loading}
        className={`w-full mt-6 py-4 rounded-2xl text-white font-bold text-base tracking-tight flex items-center justify-center gap-3 transition-all duration-200
          ${
            loading
              ? "bg-indigo-500/40 cursor-not-allowed"
              : "bg-gradient-to-r from-indigo-500 to-indigo-400 hover:opacity-90 active:scale-[0.99]"
          }`}
      >
        {loading ? (
          <>
            <Spinner /> Ekleniyor...
          </>
        ) : (
          "Portföye Ekle"
        )}
      </button>
    </div>
  );
};

export default ResourceForm;
