import FAQAccordion from "../components/cards/FAQAccordion";
import JobStandard from "../components/cards/JobStandard";
import LocationStandard from "../components/cards/LocationStandard";
import ProfessionalLocationAndGrid from "../components/cards/ProfessionalLocationAndGrid";
import ProfessionalStandard from "../components/cards/ProfessionalStandard";

export interface VerticalProps {
  label: string;
  key?: string;
  pageType: "grid-cols-2" | "grid-cols-3" | "grid-cols-4" | "standard" | "map";
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
    cardType: FAQAccordion,
  },
  {
    label: "Professionals",
    key: "financial-professional",
    pageType: "map",
    cardType: ProfessionalLocationAndGrid,
  },
  // {
  //   label: "Professionals-Test",
  //   key: "financial-professional",
  //   pageType: "standard",
  //   cardType: ProfessionalStandard,
  // },
  {
    label: "Locations",
    key: "locations",
    pageType: "map",
    cardType: LocationStandard,
  },
  {
    label: "Jobs",
    key: "jobs",
    pageType: "standard",
    cardType: JobStandard,
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
