import type { SiteContent } from "@/lib/site-content";

export function buildContentSummary(content: SiteContent) {
  return {
    services: content.services.length,
    additionalServices: content.additionalServices.length,
    products: content.products.length,
    projects: content.projects.length,
    testimonials: content.testimonials.length,
    faqs: content.faqs.reduce((sum, category) => sum + category.questions.length, 0),
    team: content.about.team.length,
    navigation: content.navigation.length,
  };
}
