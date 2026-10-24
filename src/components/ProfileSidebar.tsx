import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { siteConfig } from "@/lib/site-config";
import { FaLinkedin } from "react-icons/fa6";
import { SiFacebook, SiGithub, SiGmail, SiInstagram } from "react-icons/si";

const { email, github, linkedin, facebook, instagram } = siteConfig.links;

const socials = [
  { label: "Gmail", href: email ? `mailto:${email}` : "#", Icon: SiGmail },
  { label: "GitHub", href: github || "#", Icon: SiGithub },
  { label: "LinkedIn", href: linkedin || "#", Icon: FaLinkedin },
  { label: "Facebook", href: facebook || "#", Icon: SiFacebook },
  { label: "Instagram", href: instagram || "#", Icon: SiInstagram },
];

const row =
  "group flex min-h-[52px] items-center gap-3 rounded-sm px-3 transition-colors hover:bg-fog";

export default function ProfileSidebar() {
  return (
    <div className="w-full max-w-[360px]">
      <a href="#" className={row}>
        <Avatar className="size-9 shrink-0">
          <AvatarImage src="/profile.jpg" alt={siteConfig.name} />
          <AvatarFallback className="type-caption">MM</AvatarFallback>
        </Avatar>
        <span className="type-body font-semibold text-ink">
          {siteConfig.name}
        </span>
      </a>

      <nav aria-label="Social links">
        {socials.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={row}
          >
            <span className="flex size-9 shrink-0 items-center justify-center">
              <Icon
                aria-hidden
                size={20}
                className="text-ink-secondary transition-colors group-hover:text-primary"
              />
            </span>
            <span className="type-ui text-ink group-hover:text-primary">
              {label}
            </span>
          </a>
        ))}
      </nav>
    </div>
  );
}
