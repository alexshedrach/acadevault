export default function FooterLink({ text, href, openChat }) {
  return (
    <li onClick={openChat}>
      <a href={href} className="hover:text-orange-500 transition-colors block">
        {text}
      </a>
    </li>
  );
}
