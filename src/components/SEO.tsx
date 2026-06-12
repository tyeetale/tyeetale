import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
  noindex?: boolean;
}

const SITE_URL = "https://tyeetale.vercel.app";
const DEFAULT_IMAGE = "/og.png";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Thomas Yee",
  alternateName: "tyeetale",
  url: SITE_URL,
  image: `${SITE_URL}/profile.png`,
  jobTitle: "Financial Data Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Blue Origin",
    url: "https://www.blueorigin.com",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "NYU Shanghai",
    url: "https://shanghai.nyu.edu",
  },
  knowsAbout: [
    "Artificial Intelligence",
    "Data Engineering",
    "Product Management",
    "Machine Learning",
    "Full Stack Development",
    "TypeScript",
    "Python",
    "React",
  ],
  sameAs: [
    "https://github.com/tyeetale",
    "https://x.com/tyeetale",
    "https://linkedin.com/in/tyeetyee",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "tyeetale",
  url: SITE_URL,
  author: personJsonLd,
  description:
    "Thomas Yee — operator and builder. AI systems, data infrastructure, and products.",
};

export function SEO({
  title,
  description,
  path,
  type = "website",
  image,
  noindex = false,
}: SEOProps) {
  const fullUrl = `${SITE_URL}${path}`;
  const imageUrl = `${SITE_URL}${image || DEFAULT_IMAGE}`;
  const fullTitle = path === "/" ? title : `${title} — tyeetale`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="author" content="Thomas Yee" />
      <link rel="canonical" href={fullUrl} />

      {noindex && <meta name="robots" content="noindex" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="tyeetale" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@tyeetale" />
      <meta name="twitter:creator" content="@tyeetale" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* JSON-LD */}
      {path === "/" && (
        <script type="application/ld+json">
          {JSON.stringify([websiteJsonLd, personJsonLd])}
        </script>
      )}
      {path !== "/" && type === "article" && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: title,
            description: description,
            url: fullUrl,
            image: imageUrl,
            author: personJsonLd,
          })}
        </script>
      )}
    </Helmet>
  );
}
