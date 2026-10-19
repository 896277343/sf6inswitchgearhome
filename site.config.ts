type SiteConfig = {
  site_domain: string;
  site_name: string;
  site_description: string;
  brand: {
    legalName: string;
    logoPath: string;
    logoUrl: string;
    socialLinks: string[];
  };
  contact: {
    phone: string;
    email: string;
    address: string;
    hoursLong: string;
    hoursShort: string;
  };
  footer: {
    copyrightName: string;
    copyrightYears: string;
    summary: string;
  };
};

export const siteConfig: SiteConfig = {
  site_name: "SF6 Soultion",
  site_description: "SF6 Gas Solution - Full Lifecycle of SF6 Gas Solution",
  site_domain: "https://sf6soultion.com",
  brand: {
    legalName: "SF6 Soultion",
    logoPath: "/logo.svg",
    logoUrl: "https://sf6soultion.com/logo.svg",
    socialLinks: [],
  },
  contact: {
    phone: "+86 371 68988008",
    email: "sales@sf6soultion.com",
    address: "300000+ square meters industrial park",
    hoursLong: "Monday - Friday: 9:00 AM - 6:00 PM",
    hoursShort: "Mon-Fri: 9:00-18:00",
  },
  footer: {
    copyrightName: "SF6 Soultion",
    copyrightYears: "2025-present",
    summary:
      "We are a professional R&D and manufacturing factory focusing on SF6 gas full lifecycle management, supplying high-quality products including SF6 gas leakage detection sensors, real-time monitoring systems, SF6 recovery & purification equipment, and gas refilling devices, while delivering one-stop eco-friendly SF6 recycling and smart substation safety solutions for the global power energy industry.",
  },
};
