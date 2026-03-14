import { z } from "zod";

export const heroSchema = z.object({
  badge: z.string(),
  title: z.string(),
  description: z.string(),
  primaryCtaLabel: z.string(),
  primaryCtaHref: z.string(),
  secondaryCtaLabel: z.string(),
  secondaryCtaHref: z.string(),
  trustBadges: z.array(z.string()).min(1),
  backgroundImageKey: z.string(),
});

export const serviceSchema = z.object({
  iconKey: z.string(),
  title: z.string(),
  description: z.string(),
  imageKey: z.string(),
});

export const additionalServiceSchema = z.object({
  iconKey: z.string(),
  label: z.string(),
});

export const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  specs: z.array(z.string()),
  imageKey: z.string(),
  category: z.string(),
});

export const projectSchema = z.object({
  imageKey: z.string(),
  title: z.string(),
  category: z.string(),
  location: z.string(),
});

export const testimonialSchema = z.object({
  name: z.string(),
  role: z.string(),
  text: z.string(),
  rating: z.number().min(1).max(5),
});

export const faqCategorySchema = z.object({
  category: z.string(),
  questions: z.array(
    z.object({
      q: z.string(),
      a: z.string(),
    }),
  ),
});

export const milestoneSchema = z.object({
  year: z.string(),
  event: z.string(),
});

export const teamMemberSchema = z.object({
  name: z.string(),
  role: z.string(),
  imageKey: z.string(),
  bio: z.string(),
});

export const valueSchema = z.object({
  iconKey: z.string(),
  title: z.string(),
  text: z.string(),
});

export const aboutOverviewSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  description: z.string(),
  mission: z.string(),
  highlights: z.array(z.string()),
  stats: z.array(
    z.object({
      number: z.string(),
      label: z.string(),
    }),
  ),
});

export const contactSchema = z.object({
  address: z.string(),
  phone: z.string(),
  email: z.string().email(),
  whatsappNumber: z.string(),
  quoteHeading: z.string(),
  quoteDescription: z.string(),
});

export const navigationItemSchema = z.object({
  label: z.string(),
  href: z.string(),
});

export const siteContentSchema = z.object({
  hero: heroSchema,
  services: z.array(serviceSchema),
  additionalServices: z.array(additionalServiceSchema),
  products: z.array(productSchema),
  projects: z.array(projectSchema),
  testimonials: z.array(testimonialSchema),
  faqs: z.array(faqCategorySchema),
  about: z.object({
    overview: aboutOverviewSchema,
    milestones: z.array(milestoneSchema),
    team: z.array(teamMemberSchema),
    values: z.array(valueSchema),
  }),
  contact: contactSchema,
  navigation: z.array(navigationItemSchema),
});

export type SiteContent = z.infer<typeof siteContentSchema>;

export const defaultSiteContent: SiteContent = {
  hero: {
    badge: "Since 2007",
    title: "World-Class ICT Solutions for Your Business",
    description:
      "Solar installations, CCTV systems, structured cabling, and power solutions — delivered with excellence across Nigeria.",
    primaryCtaLabel: "Get a Free Quote",
    primaryCtaHref: "#contact",
    secondaryCtaLabel: "Our Services",
    secondaryCtaHref: "#services",
    trustBadges: ["18+ Years Experience", "10+ Cities Covered"],
    backgroundImageKey: "hero-solar",
  },
  services: [
    {
      iconKey: "sun",
      title: "Solar Installation & Sales",
      description:
        "Complete solar panel systems — from design to installation — for homes and businesses across Nigeria.",
      imageKey: "hero-solar",
    },
    {
      iconKey: "camera",
      title: "CCTV & Security Systems",
      description:
        "State-of-the-art surveillance equipment, installation, and monitoring for total peace of mind.",
      imageKey: "service-cctv",
    },
    {
      iconKey: "network",
      title: "Structured & Fibre Cabling",
      description:
        "Enterprise-grade network infrastructure, fibre optic cabling, and data centre solutions.",
      imageKey: "service-cabling",
    },
    {
      iconKey: "battery",
      title: "Inverters & Power Backup",
      description:
        "Inverter sales, installation, and lithium-ion battery systems to keep your operations running 24/7.",
      imageKey: "service-inverter",
    },
  ],
  additionalServices: [
    { iconKey: "flame", label: "Fire Detection Systems" },
    { iconKey: "home", label: "Home Automation" },
    { iconKey: "fingerprint", label: "Biometric Access Control" },
    { iconKey: "wrench", label: "Maintenance Services" },
  ],
  products: [
    {
      name: "Monocrystalline Solar Panel — 550W",
      description:
        "High-efficiency monocrystalline panels ideal for commercial and residential rooftop installations. Built for the Nigerian climate.",
      specs: ["550W output", "21.3% efficiency", "25-year warranty", "IP68 rated"],
      imageKey: "hero-solar",
      category: "Solar Panels",
    },
    {
      name: "Polycrystalline Solar Panel — 330W",
      description:
        "Cost-effective polycrystalline panels perfect for budget-conscious residential projects without compromising quality.",
      specs: ["330W output", "17.5% efficiency", "20-year warranty", "Anti-reflective coating"],
      imageKey: "hero-solar",
      category: "Solar Panels",
    },
    {
      name: "4-Channel DVR CCTV System",
      description:
        "Complete 4-camera surveillance kit with night vision, motion detection, and remote viewing via mobile app.",
      specs: ["1080p Full HD", "Night vision 30m", "1TB storage", "Mobile app access"],
      imageKey: "service-cctv",
      category: "CCTV Equipment",
    },
    {
      name: "8-Channel IP Camera System",
      description:
        "Enterprise-grade IP camera system with PoE, AI motion detection, and cloud backup support.",
      specs: ["4K resolution", "PoE powered", "AI detection", "Cloud backup ready"],
      imageKey: "service-cctv",
      category: "CCTV Equipment",
    },
    {
      name: "5KVA Hybrid Inverter",
      description:
        "Hybrid inverter with built-in MPPT charge controller for seamless solar and grid integration.",
      specs: ["5000W output", "MPPT charger", "LCD display", "Pure sine wave"],
      imageKey: "service-inverter",
      category: "Inverters & Power",
    },
    {
      name: "10KVA Online UPS Inverter",
      description:
        "Heavy-duty online UPS for businesses requiring zero-transfer-time power backup.",
      specs: ["10,000VA capacity", "Zero transfer time", "Rack mountable", "Battery scalable"],
      imageKey: "service-inverter",
      category: "Inverters & Power",
    },
    {
      name: "Cat6A Structured Cabling Kit",
      description:
        "Complete Cat6A cabling solution for enterprise networks supporting 10Gbps speeds.",
      specs: ["10Gbps speeds", "500MHz bandwidth", "Shielded (STP)", "Includes patch panels"],
      imageKey: "service-cabling",
      category: "Network & Cabling",
    },
    {
      name: "Fibre Optic Cabling Solution",
      description:
        "Single-mode fibre optic cabling for long-distance, high-bandwidth data centre and campus deployments.",
      specs: ["Single-mode fibre", "Up to 100km range", "Low attenuation", "Splice & terminate"],
      imageKey: "service-cabling",
      category: "Network & Cabling",
    },
  ],
  projects: [
    {
      imageKey: "gallery-solar-1",
      title: "Commercial Solar Installation",
      category: "Solar",
      location: "Victoria Island, Lagos",
    },
    {
      imageKey: "gallery-cctv-1",
      title: "Office CCTV System",
      category: "CCTV",
      location: "Abuja",
    },
    {
      imageKey: "gallery-cabling-1",
      title: "Data Centre Cabling",
      category: "Cabling",
      location: "Ikeja, Lagos",
    },
    {
      imageKey: "gallery-solar-2",
      title: "Residential Solar Project",
      category: "Solar",
      location: "Lekki, Lagos",
    },
    {
      imageKey: "gallery-inverter-1",
      title: "Inverter & Battery Setup",
      category: "Power",
      location: "Port Harcourt",
    },
    {
      imageKey: "gallery-automation-1",
      title: "Smart Home & Fire Detection",
      category: "Automation",
      location: "Ikoyi, Lagos",
    },
  ],
  testimonials: [
    {
      name: "Chief Adebayo Ogunleye",
      role: "MD, Ogunleye & Associates",
      text:
        "Netrix Systems installed a complete solar power system for our office complex in Ikeja. The team was professional, punctual, and the quality of work exceeded our expectations. We've cut our energy bills by over 70%.",
      rating: 5,
    },
    {
      name: "Mrs. Funke Adeyemi",
      role: "Homeowner, Lekki",
      text:
        "I was impressed by the CCTV installation Netrix did at my residence. The coverage is excellent and the remote monitoring setup works perfectly. I feel so much safer knowing my family is protected.",
      rating: 5,
    },
    {
      name: "Engr. Tunde Bakare",
      role: "CTO, TechVentures Nigeria",
      text:
        "We contracted Netrix for structured cabling across our new office. Their attention to detail and cable management was outstanding. The network performance has been flawless since installation.",
      rating: 5,
    },
    {
      name: "Alhaji Mustapha Ibrahim",
      role: "Director, Ibrahim Holdings",
      text:
        "Netrix installed inverters and battery backup systems across three of our properties. They delivered on time, within budget, and the systems have been running without issues for over two years.",
      rating: 5,
    },
  ],
  faqs: [
    {
      category: "Solar Installation",
      questions: [
        {
          q: "How long does a solar panel installation take?",
          a: "A typical residential installation takes 1–3 days, while commercial projects may take 1–2 weeks depending on the system size and complexity.",
        },
        {
          q: "What size solar system do I need for my home or business?",
          a: "This depends on your energy consumption. We conduct a free energy audit to determine the optimal system size. A typical Nigerian home uses 3–5kW, while businesses may require 10–50kW or more.",
        },
        {
          q: "Do solar panels work during the rainy season?",
          a: "Yes! Solar panels generate electricity from daylight, not just direct sunlight. Output may reduce by 20–30% on cloudy days, but they still produce significant power year-round in Nigeria.",
        },
        {
          q: "What is the lifespan of solar panels?",
          a: "Quality solar panels last 25–30 years with minimal degradation. We use only tier-1 panels with manufacturer warranties to ensure long-term performance.",
        },
      ],
    },
    {
      category: "CCTV & Security",
      questions: [
        {
          q: "Can I view my CCTV cameras remotely?",
          a: "Absolutely. All our CCTV systems come with mobile app access, allowing you to monitor your property in real-time from anywhere in the world via your smartphone or computer.",
        },
        {
          q: "How many cameras do I need for my property?",
          a: "This depends on your property size and layout. We offer free site surveys to recommend the optimal camera placement. A typical home needs 4–8 cameras, while commercial properties may need 16–64+.",
        },
        {
          q: "Do CCTV systems work during power outages?",
          a: "Yes. We integrate battery backup and can connect your security system to solar power to ensure 24/7 uninterrupted surveillance even during NEPA outages.",
        },
      ],
    },
    {
      category: "Pricing & Support",
      questions: [
        {
          q: "Do you offer financing or payment plans?",
          a: "Yes, we offer flexible payment plans for both residential and commercial installations. Contact us to discuss options tailored to your budget.",
        },
        {
          q: "What warranty do you provide?",
          a: "We provide 1–2 year workmanship warranty on all installations, plus manufacturer warranties on equipment (up to 25 years on solar panels, 5–10 years on inverters).",
        },
        {
          q: "Do you provide after-sales support and maintenance?",
          a: "Yes. We offer maintenance packages and 24/7 technical support. Our team is always available via WhatsApp or phone for any issues.",
        },
      ],
    },
  ],
  about: {
    overview: {
      eyebrow: "About Us",
      title: "Trusted ICT Partner Since 2007",
      description:
        "Netrix Systems Limited is a leading provider of information and communication technology products and services. Based in Ikeja, Lagos, we deliver world-class solar, power, security, and networking solutions to businesses and homes across Nigeria.",
      mission:
        "Providing world-class ICT goods and services with customer satisfaction and total quality management",
      highlights: [
        "18+ years of industry experience",
        "Operations across 10+ Nigerian cities",
        "Certified ICT professionals",
        "End-to-end project delivery",
      ],
      stats: [
        { number: "18+", label: "Years Experience" },
        { number: "10+", label: "Cities Covered" },
        { number: "500+", label: "Projects Completed" },
        { number: "100%", label: "Client Satisfaction" },
      ],
    },
    milestones: [
      { year: "2007", event: "Netrix Systems Limited founded in Ikeja, Lagos" },
      { year: "2010", event: "Expanded into solar energy solutions for businesses" },
      { year: "2013", event: "Launched CCTV & security division, covering 5+ cities" },
      { year: "2016", event: "Completed 200+ solar and power installations" },
      { year: "2019", event: "Opened fibre optic & structured cabling services" },
      { year: "2022", event: "Reached 500+ completed projects across Nigeria" },
      { year: "2025", event: "Serving 10+ Nigerian cities with full ICT solutions" },
    ],
    team: [
      {
        name: "Adebola Okafor",
        role: "Managing Director / CEO",
        imageKey: "team-ceo",
        bio: "18+ years of leadership in the Nigerian ICT industry, driving innovation and quality service delivery.",
      },
      {
        name: "Ngozi Eze",
        role: "Head of Operations",
        imageKey: "team-ops",
        bio: "Expert in project management and logistics, ensuring every installation meets the highest standards.",
      },
      {
        name: "Emeka Nwosu",
        role: "Lead Technical Engineer",
        imageKey: "team-tech",
        bio: "Certified electrical and network engineer specializing in solar systems and structured cabling.",
      },
    ],
    values: [
      {
        iconKey: "target",
        title: "Mission",
        text: "Providing world-class ICT goods and services with customer satisfaction and total quality management.",
      },
      {
        iconKey: "eye",
        title: "Vision",
        text: "To be Nigeria's most trusted ICT solutions provider, powering businesses and homes with cutting-edge technology.",
      },
      {
        iconKey: "award",
        title: "Quality",
        text: "We use only certified equipment and follow international best practices in every project we deliver.",
      },
      {
        iconKey: "users",
        title: "Customer First",
        text: "Our clients are at the centre of everything we do. We build lasting relationships through trust and reliability.",
      },
    ],
  },
  contact: {
    address: "3 Akintoye Sogunle Street, Off Obafemi Awolowo Way, Ikeja, Lagos",
    phone: "0810 524 9055",
    email: "netrixsystemsng@gmail.com",
    whatsappNumber: "2348105249055",
    quoteHeading: "Request a Free Quote",
    quoteDescription:
      "Ready to power your business? Reach out and our team will get back to you within 24 hours.",
  },
  navigation: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/#services" },
    { label: "Products", href: "/products" },
    { label: "Gallery", href: "/#gallery" },
    { label: "Contact", href: "/#contact" },
  ],
};
