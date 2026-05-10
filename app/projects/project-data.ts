export type ProjectCaseStudy = {
  slug: string;
  name: string;
  shortTitle: string;
  description: string;
  shortDescription: string;
  heroImage: string;
  useCases: string[];
  challenges: string[];
  solutions: string[];
  outcomes: string[];
  productsUsed: Array<{
    name: string;
    slug: string;
  }>;
};

export const projectCaseStudies: ProjectCaseStudy[] = [
  {
    slug: "sf6-gas-handling-for-underground-substation",
    name: "SF6 Gas Handling for Underground Substation",
    shortTitle: "Underground Substation SF6 Project",
    description:
      "Comprehensive SF6 gas monitoring, leakage detection, and safety handling solutions for underground substations operating in confined and high-risk environments.",
    shortDescription:
      "Underground substation SF6 monitoring and gas safety solution.",
    heroImage: "/pics/projects/underground-substation-h.webp",
    useCases: [
      "Urban underground substations",
      "Confined high-voltage equipment rooms",
      "Metro and transport-linked substation facilities",
    ],
    challenges: [
      "Limited ventilation and confined maintenance space",
      "Higher personnel safety requirements around SF6 leakage risk",
      "Need for stable monitoring across 24/7 operation cycles",
    ],
    solutions: [
      "Room monitoring for SF6 concentration, oxygen, temperature, and humidity",
      "Leak detection devices for maintenance and periodic inspection routines",
      "Alarm and response workflow support for underground operating teams",
    ],
    outcomes: [
      "Improved operator safety in enclosed environments",
      "Faster leak identification and response time",
      "More reliable lifecycle management of SF6-filled equipment",
    ],
    productsUsed: [
      { name: "SF6 Room Monitor", slug: "sf6-room-monitor" },
      { name: "SF6 Leak Detector", slug: "sf6-leak-detector" },
      { name: "SF6 Gas Analyzer", slug: "sf6-gas-analyzer" },
    ],
  },
  {
    slug: "sf6-use-for-gas-insulated-switchgear-manufacturers",
    name: "SF6 Solutions for Gas Insulated Switchgear Manufacturers",
    shortTitle: "GIS Manufacturer SF6 Project",
    description:
      "SF6 handling, reuse, and recovery solutions for gas insulated switchgear manufacturers that need stable gas management during testing, assembly, and quality control.",
    shortDescription:
      "SF6 handling and reuse solution for GIS manufacturing workflows.",
    heroImage: "/pics/projects/gis-manufacturers-h.webp",
    useCases: [
      "Factory gas charging stations",
      "GIS testing and commissioning lines",
      "SF6 reuse during prototype and quality inspection cycles",
    ],
    challenges: [
      "High SF6 consumption during repeated product testing",
      "Pressure on manufacturers to reduce gas waste and improve traceability",
      "Need for consistent gas purity before equipment delivery",
    ],
    solutions: [
      "Integrated filling, evacuation, and recovery equipment",
      "Gas analysis tools for purity, humidity, and decomposition checks",
      "Recovery and purification workflow support for reusable SF6 inventory",
    ],
    outcomes: [
      "Lower gas loss during repetitive manufacturing processes",
      "Better consistency across factory acceptance testing",
      "More efficient SF6 lifecycle control within production operations",
    ],
    productsUsed: [
      { name: "SF6 Gas Filling Cart", slug: "sf6-gas-filling-cart" },
      { name: "SF6 Service Carts", slug: "sf6-service-carts" },
      { name: "SF6 Gas Analyzer", slug: "sf6-gas-analyzer" },
    ],
  },
  {
    slug: "ultra-high-voltage-sf6-handling-equipment",
    name: "Ultra-High Voltage SF6 Handling Equipment Project",
    shortTitle: "Ultra-High Voltage SF6 Project",
    description:
      "Field-ready SF6 handling equipment for 750kV and 1000kV substation work, supporting ultra-high-voltage applications that demand dependable recovery, filling, and service workflows.",
    shortDescription:
      "SF6 service and handling solution for ultra-high-voltage substations.",
    heroImage: "/pics/projects/ultra-high-voltage-h.webp",
    useCases: [
      "750kV and 1000kV substations",
      "High-voltage commissioning and maintenance projects",
      "Gas insulated line and large-capacity switchgear servicing",
    ],
    challenges: [
      "Large gas volumes and strict site procedure requirements",
      "Demand for reliable vacuuming, filling, and recovery in field conditions",
      "Need for durable service equipment across extended maintenance windows",
    ],
    solutions: [
      "Mobile SF6 handling systems for filling, evacuation, and recovery",
      "High-capacity service carts for demanding field deployments",
      "Portable analysis and leak detection to verify gas condition on site",
    ],
    outcomes: [
      "Higher efficiency during scheduled maintenance operations",
      "Improved control of gas condition before recommissioning",
      "Reduced service delays on high-value substation assets",
    ],
    productsUsed: [
      { name: "SF6 Service Carts", slug: "sf6-service-carts" },
      { name: "Mobile SF6 Vacuum Pump Unit", slug: "mobile-sf6-vacuum-pump-unit" },
      { name: "SF6 Gas Analyzer", slug: "sf6-gas-analyzer" },
    ],
  },
  {
    slug: "sf6-gas-handling-and-regeneration-base",
    name: "SF6 Gas Handling and Regeneration Base",
    shortTitle: "SF6 Regeneration Base Project",
    description:
      "Large-scale SF6 recovery, purification, regeneration, and vacuum equipment deployment for centralized gas lifecycle management and reuse operations.",
    shortDescription:
      "Centralized SF6 recovery and regeneration base solution.",
    heroImage: "/pics/projects/regeneration-base-h.webp",
    useCases: [
      "SF6 recovery and treatment centers",
      "Utility-owned gas management bases",
      "Regeneration and reuse programs for service fleets",
    ],
    challenges: [
      "Managing large gas volumes from multiple service and maintenance sources",
      "Restoring used SF6 to reusable condition efficiently",
      "Maintaining traceability and process consistency across treatment steps",
    ],
    solutions: [
      "Recovery and regeneration systems for centralized gas treatment",
      "Vacuum and handling equipment for safe transfer and storage",
      "Analysis tools to verify gas condition before reuse or dispatch",
    ],
    outcomes: [
      "Higher recovery and reuse efficiency across the SF6 lifecycle",
      "Lower waste and stronger support for sustainability targets",
      "More scalable gas management for large service organizations",
    ],
    productsUsed: [
      { name: "SF6 Regeneration System", slug: "sf6-regeneration-system" },
      { name: "SF6 Service Carts", slug: "sf6-service-carts" },
      { name: "SF6 Gas Analyzer", slug: "sf6-gas-analyzer" },
    ],
  },
];

export function getProjectCaseStudy(slug: string) {
  return projectCaseStudies.find((project) => project.slug === slug);
}
