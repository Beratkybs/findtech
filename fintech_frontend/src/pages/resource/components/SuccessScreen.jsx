const SuccessScreen = ({ assetName, selectedCfg, onReset }) => (
  <div className="min-h-screen bg-[#080C14] flex items-center justify-center font-sans">
    <div className="text-center max-w-sm px-6">
      <div className="w-20 h-20 rounded-full bg-emerald-400/10 border-2 border-emerald-400/40 flex items-center justify-center text-4xl mx-auto mb-6 animate-bounce">
        ✓
      </div>
      <h2 className="text-2xl font-extrabold text-white tracking-tight mb-2">
        Birikim Eklendi!
      </h2>
      <p className="text-white/40 text-sm mb-8">
        <span className="font-bold" style={{ color: selectedCfg?.color }}>
          {assetName}
        </span>{" "}
        portföyünüze başarıyla eklendi.
      </p>
      <div className="flex gap-3 justify-center">
        <button
          onClick={onReset}
          className="px-6 py-3 rounded-xl bg-white/[0.06] border border-white/10 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
        >
          Yeni Ekle
        </button>
        <a
          href="/"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-400 text-white text-sm font-bold hover:opacity-90 transition-opacity"
        >
          Portföye Git
        </a>
      </div>
    </div>
  </div>
);

export default SuccessScreen;
