import { Inter } from "next/font/google";
import "./globals.css";
import { SITE } from "@/data/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const title = "Syed Shayan — Data Science Student Portfolio";
const description =
  "Portfolio of Syed Shayan, BS Data Science student at DUET Karachi. Machine learning projects, data analysis and statistical thinking.";

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: title, template: "%s | Syed Shayan" },
  description,
  keywords: ["Syed Shayan", "Data Science", "Machine Learning", "Python", "Portfolio", "DUET Karachi", "Data Analysis"],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  alternates: { canonical: "/" },
  openGraph: { title, description, url: "/", siteName: "Syed Shayan Portfolio", type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#08080D",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  url: SITE.url,
  jobTitle: "Data Science Student",
  alumniOf: { "@type": "CollegeOrUniversity", name: "Dawood University of Engineering & Technology" },
  address: { "@type": "PostalAddress", addressLocality: "Karachi", addressCountry: "PK" },
  sameAs: [SITE.github, SITE.linkedin].filter(Boolean),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* sets the saved theme before first paint (no flash) and the js flag; content stays visible for crawlers / no-JS */}
        <script dangerouslySetInnerHTML={{ __html: "(function(){var d=document.documentElement,t='dark';try{t=localStorage.getItem('theme')||'dark'}catch(e){}d.dataset.theme=t==='light'?'light':'dark';d.classList.add('js')})()" }} />
      </head>
      <body suppressHydrationWarning={true}>
        <a href="#about" className="skip">Skip to content</a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}