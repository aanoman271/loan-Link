const Logo = () => {
  return (
    <div className="flex items-center gap-3 group cursor-pointer">
      {/* Icon */}
      <div className="w-10 h-10 bg-primary text-white flex items-center justify-center rounded-xl shadow-lg shadow-primary/20 font-black text-xl transition-transform group-hover:scale-110">
        LL
      </div>

      {/* Text */}
      <div className="flex flex-col">
        <h1 className="text-xl sm:text-2xl font-black text-base-content tracking-tighter leading-none">
          Loan<span className="text-primary">Link</span>
        </h1>
        <p className="hidden xs:block text-[10px] sm:text-xs text-base-content/50 font-bold uppercase tracking-widest mt-1">
          Fast & Secure Credit
        </p>
      </div>
    </div>
  );
};

export default Logo;
