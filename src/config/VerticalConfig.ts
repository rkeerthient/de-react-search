import { StandardSection, VerticalConfigMap } from "@yext/search-ui-react";
import EventStandard from "../components/cards/EventStandard";
import FAQAccordion from "../components/cards/FAQAccordion";
import JobStandard from "../components/cards/JobStandard";
import LocationStandard from "../components/cards/LocationStandard";
import ProfessionalLocationAndGrid from "../components/cards/ProfessionalLocationAndGrid";
import ProfessionalStandard from "../components/cards/ProfessionalStandard";
import { UniversalSection } from "../components/UniversalSection";
import ProductProminentImage from "../components/cards/ProductProminentImage";

export interface VerticalProps {
  label: string;
  key?: string;
  pageType:
    | "grid-cols-2"
    | "grid-cols-3"
    | "grid-cols-4"
    | "standard"
    | "map"
    | "universal";
  cardType?: any;
  universalLimit?: number;
}

export const VerticalConfig: VerticalProps[] = [
  {
    label: "All",
    pageType: "universal",
  },
  {
    label: "FAQs",
    key: "faq",
    pageType: "standard",
    cardType: FAQAccordion,
    universalLimit: 3,
  },
  {
    label: "Professionals",
    key: "financial-professional",
    pageType: "grid-cols-3",
    cardType: ProfessionalLocationAndGrid,
    universalLimit: 3,
  },
  {
    label: "Locations",
    key: "locations",
    pageType: "map",
    cardType: LocationStandard,
    universalLimit: 3,
  },
  {
    label: "Jobs",
    key: "jobs",
    pageType: "standard",
    cardType: JobStandard,
    universalLimit: 3,
  },
  {
    label: "Events",
    key: "events",
    pageType: "standard",
    cardType: EventStandard,
    universalLimit: 3,
  },
  {
    label: "Products",
    key: "product",
    pageType: "grid-cols-3",
    cardType: ProductProminentImage,
    universalLimit: 3,
  },
];

const buildUniversalConfigMap = (): VerticalConfigMap => {
  return VerticalConfig.reduce((configMap, item) => {
    if (item.key) {
      configMap[item.key] = {
        CardComponent: item.cardType,
        SectionComponent: UniversalSection,
        label: item.label,
      };
    }
    return configMap;
  }, {} as VerticalConfigMap);
};

export const UniversalConfig: VerticalConfigMap = buildUniversalConfigMap();
