const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      {/* Icon */}
      <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-xl shadow-lg font-bold text-xl">
        LL
      </div>

      {/* Text */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 tracking-wide">
          Loan<span className="text-blue-600">Link</span>
        </h1>
        <p className="text-sm text-gray-500 -mt-1">
          Microloan Request & Approval Tracker
        </p>
      </div>
    </div>
  );
};

export default Logo;
