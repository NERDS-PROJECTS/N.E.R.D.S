import PropTypes from 'prop-types';

const FancyButton = ({ 
  title = "Buy Now", 
  onClick, 
  variant = "filled" // "filled" | "empty"
}) => {
  const baseStyles =
    "cursor-pointer font-spaced text-base md:text-lg font-bold relative w-[9em] h-[3em] text-center rounded-[30px] transition-all ease-in-out duration-300 overflow-hidden";

  const filledStyles =
    "text-white bg-gradient-to-r from-violet-500 via-sky-500 to-pink-500 bg-[length:400%] " +
    "hover:animate-gradient-xy hover:bg-[length:100%] " +
    "before:content-[''] before:absolute before:-top-[5px] before:-bottom-[5px] before:-left-[5px] before:-right-[5px] " +
    "before:bg-gradient-to-r before:from-violet-500 before:via-sky-500 before:to-pink-500 before:bg-[length:400%] " +
    "before:-z-10 before:rounded-[35px] before:hover:blur-xl before:transition-all before:ease-in-out before:duration-[1s] before:hover:bg-[length:10%] " +
    "active:bg-violet-700 focus:ring-violet-700 hover:brightness-110 hover:-translate-y-[1px] " +
    "hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]";

  const emptyStyles =
    "relative font-semibold tracking-tight " +
    "before:content-[''] before:absolute before:inset-0 before:rounded-[30px] before:p-[2px] " +
    "before:bg-gradient-to-b before:from-[#654358] before:via-[#17092A] before:to-[#2F0D64] " +
    "after:content-[''] after:absolute after:inset-[2px] after:bg-[#170928] after:rounded-[30px] after:opacity-95 " +
    "hover:before:opacity-80 hover:after:bg-gradient-to-r hover:after:from-[#2A1736]/20 " +
    "hover:after:via-[#C787F6]/10 hover:after:to-[#2A1736]/20";

  const textStyles =
    "relative z-10 bg-gradient-to-b from-[#D69DDE] to-[#B873F8] bg-clip-text text-transparent " +
    "drop-shadow-[0_0_12px_rgba(199,135,246,0.4)]";

  const styles = `${baseStyles} ${variant === "filled" ? filledStyles : emptyStyles}`;

  return (
    <div className="relative inline-block">
      <button onClick={onClick} className={styles}>
        <span className={variant === "empty" ? textStyles : "relative z-10"}>
          {title}
        </span>
      </button>
    </div>
  );
};

FancyButton.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(["filled", "empty"]),
};

export { FancyButton };
