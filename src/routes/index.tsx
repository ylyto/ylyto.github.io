import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/lib/i18n";
import { BgDecor } from "@/components/BgDecor";
import heroImg from "@/assets/images/kids-pink-floral-dress.webp";
import coralRuffleImg from "@/assets/images/kids-coral-ruffle-dress.webp";
import yellowSetDoorImg from "@/assets/images/kids-yellow-set-door.webp";
import coralGardenImg from "@/assets/images/kids-coral-dress-garden.webp";
import yellowSetPoseImg from "@/assets/images/kids-yellow-set-pose.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ylyto — Vêtements enfants doux & joyeux" },
      { name: "description", content: "ylyto : robes, ensembles et tenues d'été pour enfants. Confort, qualité et style à prix accessible." },
      { property: "og:title", content: "ylyto — Vêtements enfants" },
      { property: "og:description", content: "Des tenues douces et joyeuses pour des enfants heureux." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/favicon.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

const WHATSAPP = "212600000000";

const products = [
  { img: coralRuffleImg, key: "col_dresses", alt: "Robe coral à volants pour fille ylyto" },
  { img: yellowSetPoseImg, key: "col_sets", alt: "Ensemble jaune fleuri enfant ylyto" },
  { img: coralGardenImg, key: "col_summer", alt: "Robe d'été coral enfant ylyto" },
] as const;

const galleryImgs: { src: string; alt: string }[] = [
  { src: heroImg, alt: "Petite fille en robe rose à fleurs ylyto" },
  { src: coralRuffleImg, alt: "Robe coral à volants ylyto" },
  { src: yellowSetDoorImg, alt: "Ensemble jaune fleuri ylyto" },
  { src: coralGardenImg, alt: "Robe coral dans le jardin ylyto" },
  { src: yellowSetPoseImg, alt: "Ensemble jaune pantalon ylyto" },
];

const leadSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(6).max(30),
  city: z.string().trim().max(80).optional().or(z.literal("")),
  product_interest: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().max(800).optional().or(z.literal("")),
});

function Header() {
  const { t, lang, setLang } = useI18n();
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/50">
      <nav className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2">
          <img src="/ylyto-logo.png" alt="ylyto" className="h-12 md:h-14 w-auto" />
        </a>
        <div className="hidden md:flex items-center gap-6 text-sm font-semibold">
          <a href="#collections" className="hover:text-primary transition-colors">{t("nav_collections")}</a>
          <a href="#why" className="hover:text-primary transition-colors">{t("nav_why")}</a>
          <a href="#gallery" className="hover:text-primary transition-colors">{t("nav_gallery")}</a>
          <a href="#contact" className="hover:text-primary transition-colors">{t("nav_contact")}</a>
        </div>
        <button
          onClick={() => setLang(lang === "fr" ? "ar" : "fr")}
          className="rounded-full bg-ylyto-yellow/90 text-foreground px-4 py-2 text-sm font-bold shadow-[0_3px_0_rgba(0,0,0,0.12)] hover:translate-y-[-1px] transition-transform"
        >
          {t("lang_switch")}
        </button>
      </nav>
    </header>
  );
}

function Hero() {
  const { t } = useI18n();
  return (
    <section id="top" className="relative overflow-hidden">
      <BgDecor />
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center relative">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-ylyto-blue/20 text-ylyto-purple px-4 py-1.5 text-xs font-bold uppercase tracking-wide ring-1 ring-ylyto-blue/40">
            ✨ {t("hero_badge")}
          </span>
          <h1 className="bubble-text text-5xl md:text-7xl leading-[1.05] text-ylyto-pink">
            <span className="text-ylyto-yellow">y</span>
            <span className="text-ylyto-pink">l</span>
            <span className="text-ylyto-yellow">y</span>
            <span className="text-ylyto-purple">t</span>
            <span className="text-ylyto-blue">o</span>
          </h1>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
            {t("hero_title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-md">{t("hero_subtitle")}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noopener"
              className="rounded-full bg-ylyto-pink text-white px-6 py-3.5 font-bold shadow-[0_5px_0_rgba(0,0,0,0.15)] hover:translate-y-[-2px] transition-transform inline-flex items-center gap-2"
            >
              💬 {t("hero_cta_whatsapp")}
            </a>
            <a
              href="#collections"
              className="rounded-full bg-ylyto-blue text-white px-6 py-3.5 font-bold shadow-[0_5px_0_rgba(0,0,0,0.15)] hover:translate-y-[-2px] transition-transform"
            >
              {t("hero_cta_order")}
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-ylyto-yellow/40 via-ylyto-pink/30 to-ylyto-blue/40 blur-2xl" />
          <div className="relative rounded-[2.5rem] overflow-hidden ring-4 ring-white shadow-[var(--shadow-soft)] aspect-[4/5] bg-white">
            <img
              src={heroImg}
              alt="Petite fille en robe rose à fleurs ylyto"
              width={1024}
              height={1280}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -top-4 -right-4 rounded-2xl bg-ylyto-yellow text-foreground px-4 py-2 font-bold rotate-6 shadow-[0_4px_0_rgba(0,0,0,0.12)]">
            ⭐ 100% doux
          </div>
        </div>
      </div>
    </section>
  );
}

function Collections() {
  const { t } = useI18n();
  return (
    <section id="collections" className="relative py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-12 space-y-3">
          <h2 className="bubble-text text-4xl md:text-5xl text-ylyto-purple">{t("collections_title")}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{t("collections_subtitle")}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((p, i) => {
            const colors = ["bg-ylyto-pink/15", "bg-ylyto-yellow/20", "bg-ylyto-blue/15"];
            return (
              <div key={i} className={`group rounded-3xl ${colors[i]} p-3 ring-1 ring-border/60 shadow-[0_8px_0_rgba(0,0,0,0.04)] hover:translate-y-[-4px] transition-transform`}>
                <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-white">
                  <img
                    src={p.img}
                    alt={p.alt}
                    width={800}
                    height={1000}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-display text-2xl font-bold text-foreground">{t(p.key as never)}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{t(`${p.key}_desc` as never)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Why() {
  const { t } = useI18n();
  const items = [
    { icon: "🧸", key: "comfort", color: "bg-ylyto-pink/20 text-ylyto-pink" },
    { icon: "✨", key: "quality", color: "bg-ylyto-yellow/30 text-ylyto-purple" },
    { icon: "🎨", key: "style", color: "bg-ylyto-blue/20 text-ylyto-blue" },
    { icon: "💖", key: "price", color: "bg-ylyto-purple/15 text-ylyto-purple" },
  ];
  return (
    <section id="why" className="relative py-20 bg-gradient-to-b from-transparent via-ylyto-cream to-transparent">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-12 space-y-3">
          <h2 className="bubble-text text-4xl md:text-5xl text-ylyto-blue">{t("why_title")}</h2>
          <p className="text-muted-foreground">{t("why_subtitle")}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((it) => (
            <div key={it.key} className="rounded-3xl bg-card p-6 ring-1 ring-border/60 shadow-[0_6px_0_rgba(0,0,0,0.05)] text-center space-y-3">
              <div className={`w-14 h-14 rounded-2xl ${it.color} mx-auto flex items-center justify-center text-2xl`}>{it.icon}</div>
              <h3 className="font-display text-xl font-bold">{t(`why_${it.key}` as never)}</h3>
              <p className="text-sm text-muted-foreground">{t(`why_${it.key}_desc` as never)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const { t } = useI18n();
  return (
    <section id="gallery" className="relative py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-12 space-y-3">
          <h2 className="bubble-text text-4xl md:text-5xl text-ylyto-yellow">{t("gallery_title")}</h2>
          <p className="text-muted-foreground">{t("gallery_subtitle")}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {galleryImgs.map((g, i) => (
            <div key={i} className={`rounded-2xl overflow-hidden ring-2 ring-white shadow-md aspect-[4/5] ${i === 0 ? "md:col-span-1 md:row-span-2 lg:row-span-1" : ""}`}>
              <img
                src={g.src}
                alt={g.alt}
                width={600}
                height={750}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const { t, lang } = useI18n();
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = leadSchema.safeParse({
      name: fd.get("name"),
      phone: fd.get("phone"),
      city: fd.get("city") ?? "",
      product_interest: fd.get("product_interest") ?? "",
      message: fd.get("message") ?? "",
    });
    if (!parsed.success) {
      setStatus("err");
      return;
    }
    setStatus("sending");
    const { error } = await supabase.from("leads").insert({
      name: parsed.data.name,
      phone: parsed.data.phone,
      city: parsed.data.city || null,
      product_interest: parsed.data.product_interest || null,
      message: parsed.data.message || null,
      language: lang,
    });
    if (error) {
      console.error(error);
      setStatus("err");
    } else {
      setStatus("ok");
      (e.target as HTMLFormElement).reset();
    }
  }

  return (
    <section id="contact" className="relative py-20">
      <div className="mx-auto max-w-3xl px-4">
        <div className="rounded-[2.5rem] bg-card ring-1 ring-border/60 shadow-[0_10px_0_rgba(0,0,0,0.04)] p-6 md:p-10 relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-60 h-60 rounded-full bg-ylyto-pink/20 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-60 h-60 rounded-full bg-ylyto-blue/20 blur-3xl" />
          <div className="relative space-y-2 text-center mb-6">
            <h2 className="bubble-text text-3xl md:text-4xl text-ylyto-pink">{t("form_title")}</h2>
            <p className="text-muted-foreground text-sm">{t("form_subtitle")}</p>
          </div>
          <form onSubmit={onSubmit} className="relative grid sm:grid-cols-2 gap-4">
            <Field name="name" label={t("form_name")} required maxLength={80} />
            <Field name="phone" label={t("form_phone")} required maxLength={30} type="tel" />
            <Field name="city" label={t("form_city")} maxLength={80} />
            <Field name="product_interest" label={t("form_product")} maxLength={120} />
            <div className="sm:col-span-2">
              <Field name="message" label={t("form_message")} textarea maxLength={800} />
            </div>
            <div className="sm:col-span-2 flex flex-col items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={status === "sending"}
                className="rounded-full bg-ylyto-pink text-white px-8 py-3.5 font-bold shadow-[0_5px_0_rgba(0,0,0,0.15)] hover:translate-y-[-2px] transition-transform disabled:opacity-60"
              >
                {status === "sending" ? t("form_sending") : t("form_submit")}
              </button>
              {status === "ok" && <p className="text-sm font-semibold text-ylyto-purple">✅ {t("form_success")}</p>}
              {status === "err" && <p className="text-sm font-semibold text-destructive">{t("form_error")}</p>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  name, label, type = "text", required, maxLength, textarea,
}: { name: string; label: string; type?: string; required?: boolean; maxLength?: number; textarea?: boolean }) {
  const cls = "w-full rounded-2xl border-2 border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-ylyto-pink transition-colors";
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">{label}{required && " *"}</span>
      {textarea ? (
        <textarea name={name} required={required} maxLength={maxLength} rows={4} className={cls} />
      ) : (
        <input name={name} type={type} required={required} maxLength={maxLength} className={cls} />
      )}
    </label>
  );
}

function Footer() {
  const { t } = useI18n();
  return (
    <footer className="relative mt-10 border-t border-border/60 bg-ylyto-cream">
      <div className="mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-3 gap-8">
        <div className="space-y-3">
          <img src="/ylyto-logo.png" alt="ylyto" className="h-16 w-auto" />
          <p className="text-sm text-muted-foreground max-w-xs">{t("footer_tagline")}</p>
        </div>
        <div className="space-y-2 text-sm">
          <h4 className="font-display font-bold">{t("footer_contact")}</h4>
          <p className="text-muted-foreground">contact@ylyto.com</p>
          <a href={`https://wa.me/${WHATSAPP}`} className="text-ylyto-pink font-semibold">WhatsApp</a>
        </div>
        <div className="space-y-2 text-sm">
          <h4 className="font-display font-bold">{t("footer_follow")}</h4>
          <div className="flex gap-3">
            <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-ylyto-pink/15 flex items-center justify-center hover:bg-ylyto-pink/30 transition-colors">📷</a>
            <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-ylyto-blue/15 flex items-center justify-center hover:bg-ylyto-blue/30 transition-colors">📘</a>
            <a href="#" aria-label="TikTok" className="w-10 h-10 rounded-full bg-ylyto-purple/15 flex items-center justify-center hover:bg-ylyto-purple/30 transition-colors">🎵</a>
          </div>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} ylyto. {t("footer_rights")}
      </div>
    </footer>
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Collections />
        <Why />
        <Gallery />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}