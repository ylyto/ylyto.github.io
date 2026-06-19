import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "fr" | "ar";

type Dict = Record<string, string>;

const fr: Dict = {
  nav_collections: "Collections",
  nav_why: "Pourquoi ylyto",
  nav_gallery: "Galerie",
  nav_contact: "Commander",
  hero_title: "Des tenues douces pour des enfants heureux",
  hero_subtitle: "ylyto crée des vêtements enfants confortables, joyeux et de qualité — pensés pour les mamans exigeantes.",
  hero_cta_whatsapp: "Commander sur WhatsApp",
  hero_cta_order: "Voir les collections",
  hero_badge: "Nouvelle collection été",
  collections_title: "Nos collections",
  collections_subtitle: "Robes, ensembles et tenues d'été. Tissus doux, coupes confortables.",
  col_dresses: "Robes fleuries",
  col_dresses_desc: "Élégantes et confortables pour toutes les occasions.",
  col_sets: "Ensembles douillets",
  col_sets_desc: "Top + pantalon assortis, parfaits pour jouer toute la journée.",
  col_summer: "Tenues d'été",
  col_summer_desc: "Légères et respirantes pour profiter du soleil.",
  why_title: "Pourquoi ylyto ?",
  why_subtitle: "Pensé pour les mamans, aimé par les enfants.",
  why_comfort: "Confort absolu",
  why_comfort_desc: "Tissus doux qui respectent la peau délicate des enfants.",
  why_quality: "Qualité durable",
  why_quality_desc: "Coutures soignées et finitions premium qui durent.",
  why_style: "Style joyeux",
  why_style_desc: "Des designs mignons qui mettent les enfants en valeur.",
  why_price: "Prix accessible",
  why_price_desc: "La qualité premium sans casser votre budget.",
  gallery_title: "Galerie",
  gallery_subtitle: "Découvrez notre univers en images.",
  form_title: "Commander ou demander un renseignement",
  form_subtitle: "Remplissez le formulaire, on vous répond rapidement.",
  form_name: "Nom complet",
  form_phone: "Téléphone",
  form_city: "Ville",
  form_product: "Produit qui vous intéresse",
  form_message: "Message (optionnel)",
  form_submit: "Envoyer ma demande",
  form_sending: "Envoi en cours…",
  form_success: "Merci ! Nous vous contacterons très bientôt.",
  form_error: "Une erreur s'est produite. Réessayez svp.",
  footer_tagline: "Vêtements enfants doux et joyeux.",
  footer_contact: "Contact",
  footer_follow: "Suivez-nous",
  footer_rights: "Tous droits réservés.",
  lang_switch: "العربية",
};

const ar: Dict = {
  nav_collections: "المجموعات",
  nav_why: "لماذا ylyto",
  nav_gallery: "المعرض",
  nav_contact: "اطلب الآن",
  hero_title: "ملابس ناعمة لأطفال سعداء",
  hero_subtitle: "ylyto تصنع ملابس أطفال مريحة، مبهجة وذات جودة عالية — مصممة للأمهات الذواقات.",
  hero_cta_whatsapp: "اطلب عبر واتساب",
  hero_cta_order: "تصفح المجموعات",
  hero_badge: "مجموعة الصيف الجديدة",
  collections_title: "مجموعاتنا",
  collections_subtitle: "فساتين، أطقم وملابس صيفية. أقمشة ناعمة وقصات مريحة.",
  col_dresses: "فساتين مزهرة",
  col_dresses_desc: "أنيقة ومريحة لكل المناسبات.",
  col_sets: "أطقم مريحة",
  col_sets_desc: "بلوزة وبنطلون متناسقين، مثاليان للعب طوال اليوم.",
  col_summer: "ملابس صيفية",
  col_summer_desc: "خفيفة وقابلة للتنفس للاستمتاع بالشمس.",
  why_title: "لماذا ylyto ؟",
  why_subtitle: "مصممة للأمهات، محبوبة من الأطفال.",
  why_comfort: "راحة مطلقة",
  why_comfort_desc: "أقمشة ناعمة تحترم بشرة الأطفال الحساسة.",
  why_quality: "جودة تدوم",
  why_quality_desc: "خياطة دقيقة ولمسات نهائية فاخرة.",
  why_style: "ستايل مبهج",
  why_style_desc: "تصاميم لطيفة تُبرز جمال الأطفال.",
  why_price: "أسعار في المتناول",
  why_price_desc: "جودة عالية دون إرهاق الميزانية.",
  gallery_title: "المعرض",
  gallery_subtitle: "اكتشفي عالمنا بالصور.",
  form_title: "اطلبي أو استفسري",
  form_subtitle: "املئي النموذج، سنتواصل معك بسرعة.",
  form_name: "الاسم الكامل",
  form_phone: "الهاتف",
  form_city: "المدينة",
  form_product: "المنتج الذي يهمك",
  form_message: "رسالة (اختياري)",
  form_submit: "أرسلي طلبي",
  form_sending: "جاري الإرسال…",
  form_success: "شكراً ! سنتواصل معك قريباً.",
  form_error: "حدث خطأ. حاولي مرة أخرى.",
  footer_tagline: "ملابس أطفال ناعمة ومبهجة.",
  footer_contact: "اتصل بنا",
  footer_follow: "تابعينا",
  footer_rights: "جميع الحقوق محفوظة.",
  lang_switch: "Français",
};

const dicts: Record<Lang, Dict> = { fr, ar };

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: keyof typeof fr) => string }>({
  lang: "fr",
  setLang: () => {},
  t: (k) => fr[k as string] ?? (k as string),
});

function detectInitial(): Lang {
  if (typeof window === "undefined") return "fr";
  const saved = localStorage.getItem("ylyto-lang");
  if (saved === "ar" || saved === "fr") return saved;
  const nav = navigator.language?.toLowerCase() ?? "";
  return nav.startsWith("ar") ? "ar" : "fr";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const initial = detectInitial();
    setLangState(initial);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("ylyto-lang", l);
  };

  const t = (k: keyof typeof fr) => dicts[lang][k as string] ?? fr[k as string] ?? (k as string);

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);