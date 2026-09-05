import { InstagramIcon, MailIcon, TikTokIcon } from "@/components/ui/icons";
import { CONTACT_EMAIL, INSTAGRAM_URL, TIKTOK_URL } from "@/lib/site";

const linkClasses =
  "flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-150 hover:bg-white/15 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-95";

export default function SocialLinks() {
  return (
    <div className="flex flex-col items-center gap-4">
      <ul className="flex items-center gap-2" aria-label="Redes sociales">
        <li>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de Vetline Nutrition, se abre en pestaña nueva"
            title="Instagram"
            data-track="social_click"
            data-network="instagram"
            className={linkClasses}
          >
            <InstagramIcon className="h-5 w-5" />
          </a>
        </li>
        <li>
          <a
            href={TIKTOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok de Vetline Nutrition, se abre en pestaña nueva"
            title="TikTok"
            data-track="social_click"
            data-network="tiktok"
            className={linkClasses}
          >
            <TikTokIcon className="h-5 w-5" />
          </a>
        </li>
      </ul>
      <a
        href={`mailto:${CONTACT_EMAIL}`}
        aria-label={`Escríbenos por correo a ${CONTACT_EMAIL}`}
        data-track="social_click"
        data-network="email"
        className="inline-flex max-w-full items-center gap-2 rounded-md text-sm break-all text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        <MailIcon className="h-4 w-4 shrink-0" />
        {CONTACT_EMAIL}
      </a>
    </div>
  );
}
