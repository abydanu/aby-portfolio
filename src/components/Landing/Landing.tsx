import { profile } from "../../data/profile";
import { useLanguage } from "../../hooks/useLanguage";
import { Presence } from "../Presence/Presence";
import BlurText from "../ui/BlurText";

export function Landing() {
  const { locale, language } = useLanguage();
  const { landing: t } = locale.ui;
  const lp = locale.profile;

  return (
    <>
      <section className="mx-auto w-full max-w-176 px-5 text-center">
        <div className="animate-rise">
          <Presence size={46} className="mx-auto mb-9" />
        </div>
        <h1
          key={language}
          className="font-display text-[3.6rem] leading-[0.94] tracking-[-0.02em] sm:text-7xl md:text-[5.75rem]">
          <span className="animate-rise text-fg/55 sm:inline block">{t.hi}</span>{" "}
          <BlurText
            text={`${profile.name}.`}
            delay={150}
            animateBy="words"
            direction="top"
            className="italic"
          />
        </h1>
        <p
          key={`role-${language}`}
          className="animate-rise mt-7 font-mono text-[11px] uppercase tracking-[0.24em] text-accent md:text-xs"
          style={{ animationDelay: "160ms" }}
        >
          {lp.role}
        </p>
      </section>
    </>
  );
}
