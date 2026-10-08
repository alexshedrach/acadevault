// -----------------------------------------------------------------------------
// Adornment: for icons/buttons inside inputs
// -----------------------------------------------------------------------------
export const InputAdornment = ({ children, position = "right" }) => (
  <span
    className={classNames(
      "absolute inset-y-0 flex items-center",
      position === "left" ? "left-3 pl-1" : "right-3 pr-1"
    )}
  >
    {children}
  </span>
);

InputAdornment.propTypes = {
  children: PropTypes.node.isRequired,
  position: PropTypes.oneOf(["left", "right"]),
};
