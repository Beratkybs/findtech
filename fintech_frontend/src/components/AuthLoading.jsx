const AuthLoading = () => {
  return (
    <div className="min-h-screen bg-[#080C14] flex items-center justify-center relative overflow-hidden">
      {/* Background glows */}
      <div className="fixed w-[600px] h-[600px] rounded-full bg-indigo-600/6 blur-[140px] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="fixed w-72 h-72 rounded-full bg-violet-500/8 blur-[80px] pointer-events-none top-1/4 right-1/4" />

      <div className="flex flex-col items-center gap-8 relative z-10">
        {/* Logo + spinner combo */}
        <div className="relative">
          {/* Spinning ring */}
          <div className="w-20 h-20 rounded-full border-2 border-white/5 border-t-indigo-500/80 border-r-violet-500/40 animate-spin" />

          {/* Logo center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center font-extrabold text-white text-lg shadow-lg shadow-indigo-500/30">
              ₺
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="text-center">
          <p className="text-white/60 text-sm font-medium tracking-wide animate-pulse">
            Yükleniyor...
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLoading;
