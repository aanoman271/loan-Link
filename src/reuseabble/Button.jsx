const Button = ({ children, className = "", onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-3xl sm:w-auto px-10 py-2    rounded-sm shadow-premium transition-all transform hover:scale-102 active:scale-60 text-md ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
