export type PublicImageOption = {
  key: string;
  label: string;
  src: string;
  hint: string;
};

export const PUBLIC_IMAGE_OPTIONS: PublicImageOption[] = [
  { key: "hero-solar", label: "Solar hero", src: "/images/hero-solar.jpg", hint: "Homepage hero and solar products" },
  { key: "service-cctv", label: "CCTV service", src: "/images/service-cctv.jpg", hint: "Security systems" },
  { key: "service-cabling", label: "Cabling service", src: "/images/service-cabling.jpg", hint: "Network infrastructure" },
  { key: "service-inverter", label: "Inverter service", src: "/images/service-inverter.jpg", hint: "Power backup" },
  { key: "gallery-solar-1", label: "Solar project 1", src: "/images/gallery-solar-1.jpg", hint: "Portfolio gallery" },
  { key: "gallery-solar-2", label: "Solar project 2", src: "/images/gallery-solar-2.jpg", hint: "Portfolio gallery" },
  { key: "gallery-cctv-1", label: "CCTV project", src: "/images/gallery-cctv-1.jpg", hint: "Portfolio gallery" },
  { key: "gallery-cabling-1", label: "Cabling project", src: "/images/gallery-cabling-1.jpg", hint: "Portfolio gallery" },
  { key: "gallery-inverter-1", label: "Inverter project", src: "/images/gallery-inverter-1.jpg", hint: "Portfolio gallery" },
  { key: "gallery-automation-1", label: "Automation project", src: "/images/gallery-automation-1.jpg", hint: "Portfolio gallery" },
  { key: "team-ceo", label: "CEO portrait", src: "/images/team-ceo.jpg", hint: "Leadership team" },
  { key: "team-ops", label: "Operations portrait", src: "/images/team-ops.jpg", hint: "Leadership team" },
  { key: "team-tech", label: "Engineer portrait", src: "/images/team-tech.jpg", hint: "Leadership team" },
];

export function getPublicImageOption(key?: string) {
  return PUBLIC_IMAGE_OPTIONS.find((option) => option.key === key) || PUBLIC_IMAGE_OPTIONS[0];
}
