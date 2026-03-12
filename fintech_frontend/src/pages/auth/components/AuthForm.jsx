import { useAuth } from "../hooks/useAuth.js";

const AuthForm = () => {
  const { state, handlers } = useAuth();
  const { isLogin, formData, loading } = state;
  const { handleInputChange, toggleMode, handleSubmit } = handlers;

  return (
    <div className="relative z-10 w-full max-w-md bg-[#0F121A] border border-slate-800 rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white text-3xl font-bold">
          ₺
        </div>
        <h2 className="text-3xl font-black text-white tracking-tight">
          {isLogin ? "Tekrar Hoş Geldin" : "Yeni Hesap"}
        </h2>
        <p className="text-slate-400 mt-2 text-sm">
          {isLogin
            ? "Varlıklarını yönetmek için giriş yap"
            : "Hemen kayıt ol ve takibe başla"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
            Kullanıcı Adı
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full bg-[#161A23] border border-slate-800 text-white px-4 py-3.5 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600 shadow-inner"
            placeholder="kullanici_adi"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
            Şifre
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full bg-[#161A23] border border-slate-800 text-white px-4 py-3.5 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600 shadow-inner"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl shadow-xl shadow-indigo-500/20 transition-all active:scale-[0.98] mt-4 flex items-center justify-center ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              İşleniyor...
            </span>
          ) : isLogin ? (
            "OTURUM AÇ"
          ) : (
            "KAYIT OL"
          )}
        </button>
      </form>

      <div className="mt-8 text-center border-t border-slate-800/50 pt-6">
        <p className="text-slate-400 text-sm">
          {isLogin ? "Hesabın yok mu?" : "Zaten üye misin?"}
          <button
            onClick={toggleMode}
            className="ml-2 text-indigo-400 hover:text-indigo-300 font-black transition-colors"
          >
            {isLogin ? "Hemen Kayıt Ol" : "Giriş Yap"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
