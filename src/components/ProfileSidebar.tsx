import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaLinkedin } from "react-icons/fa6";
import { SiFacebook, SiGithub, SiGmail, SiInstagram } from "react-icons/si";

const socials = [
  { label: "Gmail", href: "mailto:your.name@gmail.com", Icon: SiGmail },
  { label: "GitHub", href: "https://github.com/your-username", Icon: SiGithub },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/your-handle",
    Icon: FaLinkedin,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/your-handle",
    Icon: SiFacebook,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/your-handle",
    Icon: SiInstagram,
  },
];

const row =
  "group flex min-h-[52px] items-center gap-3 rounded-sm px-3 transition-colors hover:bg-fog";

export default function ProfileSidebar() {
  return (
    <div className="w-full max-w-[360px]">
      <a href="#" className={row}>
        <Avatar className="size-9 shrink-0">
          <AvatarImage src="/profile.jpg" alt="Marvin Marianito Cajilo" />
          <AvatarFallback className="type-caption">MM</AvatarFallback>
        </Avatar>
        <span className="type-body font-semibold text-ink">
          Marvin Marianito Cajilo
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
