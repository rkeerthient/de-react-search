import { StandardSection, VerticalConfigMap } from "@yext/search-ui-react";
import EventStandard from "../components/cards/EventStandard";
import FAQAccordion from "../components/cards/FAQAccordion";
import JobStandard from "../components/cards/JobStandard";
import LocationStandard from "../components/cards/LocationStandard";
import ProfessionalLocationAndGrid from "../components/cards/ProfessionalLocationAndGrid";
import ProfessionalStandard from "../components/cards/ProfessionalStandard";
import { UniversalSection } from "./UniversalSection";

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
  },
  {
    label: "Professionals",
    key: "financial-professional",
    pageType: "grid-cols-3",
    cardType: ProfessionalLocationAndGrid,
  },
  {
    label: "Locations",
    key: "locations",
    pageType: "standard",
    cardType: LocationStandard,
  },
  {
    label: "Jobs",
    key: "jobs",
    pageType: "standard",
    cardType: JobStandard,
  },
  {
    label: "Events",
    key: "events",
    pageType: "standard",
    cardType: EventStandard,
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
