import FAQCard from "../components/cards/FAQCard";
import ProfessionalCard from "../components/cards/ProfessionalCard";

export interface VerticalProps {
  label: string;
  key?: string;
  pageType: "grid-cols-2" | "grid-cols-3" | "grid-cols-4" | "standard";
  cardType?: any;
}

export const VerticalConfig: VerticalProps[] = [
  {
    label: "All",
    pageType: "standard",
  },
  {
    label: "FAQs",
    key: "faq",
    pageType: "standard",
    cardType: FAQCard,
  },
  {
    label: "Professionals",
    key: "financial-professional",
    pageType: "grid-cols-3",
    cardType: ProfessionalCard,
  },
];
// const PAGE_COMPONENTS: { [key: string]: React.ElementType } = {
//   faq: FAQPage,
//   "financial-professional": ProfessionalPage,
//   "help-article": HelpArticlesPage,
//   jobs: JobsPage,
//   locations: Locator,
//   product: ProductsPage,
//   all: UniversalPage,
// };
