import FooterLink from "./FooterLink";


export default function FooterNavSection({ title, links, openChat }) {
  return (
    <div>
      <h3 className="font-semibold mb-3">{title}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <FooterLink key={link.text} {...link} openChat={openChat}/>
        ))}
      </ul>
    </div>
  );
}
