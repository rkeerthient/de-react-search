import {
  CardComponent,
  DefaultRawDataType,
  VerticalConfigMap,
} from "@yext/search-ui-react";

import { UniversalSection } from "../components/search/UniversalSection";
import ProductProminentVideo from "../components/cards/ProductProminentVideo";
import FileStandard from "../components/cards/FileStandard";
import EventStandard from "../components/cards/EventStandard";
import FAQAccordion from "../components/cards/FAQAccordion";
import JobStandard from "../components/cards/JobStandard";
import LocationStandard from "../components/cards/LocationStandard";
import ProfessionalLocationAndGrid from "../components/cards/ProfessionalLocationAndGrid";
import ProfessionalStandard from "../components/cards/ProfessionalStandard";
import ProductProminentImage from "../components/cards/ProductProminentImage";

export interface GlobalConfigProps {
  accountEnv: "Production" | "Sandbox";
  searchExperienceVersion: "Production" | "Staging";
  chatExperienceVersion: "Production" | "Staging";
  isChatEnabled: boolean;
  locale: string;
  isGenerativeDirectAnswerEnabled: boolean;
  region: "US" | "EU";
}

export const GlobalConfig: GlobalConfigProps = {
  accountEnv: "Production", //Production or Sandbox
  searchExperienceVersion: "Staging", // Production or Staging
  chatExperienceVersion: "Production", // Production or Staging
  isChatEnabled: false, //true or false
  locale: "en", // your locale eg: en_GB
  isGenerativeDirectAnswerEnabled: false, //true or false
  region: "US", //US or EU
};
/**
 * 
 * Define properties for each section type shown in the search interface.
 * label: Display name for the section.
 * verticalKey: Optional key that uniquely identifies each type of content (e.g., 'faq', 'jobs').
 * pageType: Defines layout style, e.g., "grid-cols-2" (two-column grid), "map" (map view).
 * universalLimit: Limits the number of items shown in universal search.
 * sortByOptions: Custom sorting options for items.
 * cardType: Specifies how each item in the section is displayed (using different card components).
 * visualTypeHead: Boolean to enable special header visuals (optional).
 * 
 * 
 * Recommendation 
 * gridPageType - ProductProminentVideo, LocationStandard, ProfessionalLocationAndGrid, ProductProminentImage
 * 
 * 
 * Sample sorting format
 * 
 sortByOptions: [
  {
    label: "Name: A-Z",
    sortBy: {
      field: "name",
      direction: Direction.Ascending,
      type: SortType.Field,
    },
  },
  {
    label: "Name: Z-A",
    sortBy: {
      field: "name",
      direction: Direction.Descending,
      type: SortType.Field,
    },
  },
],
 * 
 */

export interface VerticalProps {
  label: string;
  verticalKey?: string;
  pageType:
    | "grid-cols-2"
    | "grid-cols-3"
    | "grid-cols-4"
    | "standard"
    | "map"
    | "universal";
  universalLimit?: number;
  verticalLimit?: number;
  sortFields?: string[];
  cardType?: CardComponent;
  visualTypeHead?: boolean;
}

export const VerticalConfig: VerticalProps[] = [
  {
    label: "All",
    pageType: "universal",
  },
  {
    label: "FAQs",
    verticalKey: "faq",
    pageType: "standard",
    cardType: FAQAccordion,
    universalLimit: 3,
    verticalLimit: 5,
  },
  {
    label: "Professionals",
    verticalKey: "financial-professional",
    pageType: "grid-cols-3",
    cardType: ProfessionalLocationAndGrid,
    universalLimit: 3,
    verticalLimit: 5,
  },
  {
    label: "Locations",
    verticalKey: "locations",
    pageType: "map",
    cardType: LocationStandard,
    universalLimit: 3,
    verticalLimit: 5,
  },
  {
    label: "Jobs",
    verticalKey: "jobs",
    pageType: "standard",
    cardType: JobStandard,
    universalLimit: 3,
    verticalLimit: 5,
  },
  {
    label: "Events",
    verticalKey: "events",
    pageType: "standard",
    cardType: EventStandard,
    universalLimit: 3,
    verticalLimit: 5,
  },
  {
    label: "Products",
    verticalKey: "product",
    pageType: "grid-cols-3",
    cardType: ProductProminentImage,
    universalLimit: 3,
    verticalLimit: 5,
    sortFields: ["name"],
  },
];

// Configuration options for enabling or disabling features

export const UniversalConfig: VerticalConfigMap<
  Record<string, DefaultRawDataType>
> = VerticalConfig.reduce(
  (configMap, item) => {
    if (item.verticalKey) {
      configMap[item.verticalKey] = {
        CardComponent: item.cardType,
        SectionComponent: UniversalSection,
        label: item.label,
      };
    }
    return configMap;
  },
  {} as VerticalConfigMap<Record<string, DefaultRawDataType>>
);
