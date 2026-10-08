export default function FooterSocial({ icon, label }) {
  return (
    <button
      aria-label={label}
      className="text-2xl hover:text-orange-500 transition-colors"
    >
      {icon}
    </button>
  );
}
