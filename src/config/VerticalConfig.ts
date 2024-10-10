import FAQCard from "../components/cards/FAQCard";
import ProfessionalCard from "../components/cards/ProfessionalCard";

export interface VerticalProps {
  label: string;
  key?: string;
  type: "grid-cols-2" | "grid-cols-3" | "grid-cols-4" | "standard";
  CardType?: any;
}

export const VerticalConfig: VerticalProps[] = [
  {
    label: "All",
    type: "standard",
  },
  {
    label: "FAQs",
    key: "faq",
    type: "standard",
    CardType: FAQCard,
  },
  {
    label: "Professionals",
    key: "financial-professional",
    type: "grid-cols-3",
    CardType: ProfessionalCard,
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
