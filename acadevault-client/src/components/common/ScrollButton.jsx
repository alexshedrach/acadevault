const ScrollButton = ({ direction, onClick, children }) => (
  <button
    onClick={onClick}
    aria-label={`Scroll ${direction}`}
    className={`absolute top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1.5 hover:bg-gray-100 ${
      direction === "left" ? "left-0" : "right-0"
    }`}
  >
    {children}
  </button>
);

export default ScrollButton;
