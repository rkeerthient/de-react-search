import {
  CardComponent,
  DefaultRawDataType,
  VerticalConfigMap,
} from "@yext/search-ui-react";
import EventStandard from "../components/cards/EventStandard";
import FAQAccordion from "../components/cards/FAQAccordion";
import JobStandard from "../components/cards/JobStandard";
import LocationStandard from "../components/cards/LocationStandard";
import ProfessionalLocationAndGrid from "../components/cards/ProfessionalLocationAndGrid";
import ProfessionalStandard from "../components/cards/ProfessionalStandard";
import ProductProminentImage from "../components/cards/ProductProminentImage";
import { Direction, SortBy, SortType } from "@yext/search-headless-react";
import { UniversalSection } from "../components/search/UniversalSection";
import ProductProminentVideo from "../components/cards/ProductProminentVideo";

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
  sortByOptions?: { label: string; sortBy: SortBy }[];
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
  },
  {
    label: "Professionals",
    verticalKey: "financial-professional",
    pageType: "grid-cols-3",
    cardType: ProfessionalLocationAndGrid,
    universalLimit: 3,
    visualTypeHead: true,
  },
  {
    label: "Locations",
    verticalKey: "locations",
    pageType: "map",
    cardType: LocationStandard,
    universalLimit: 3,
  },
  {
    label: "Jobs",
    verticalKey: "jobs",
    pageType: "standard",
    cardType: JobStandard,
    universalLimit: 3,
  },
  {
    label: "Events",
    verticalKey: "events",
    pageType: "standard",
    cardType: EventStandard,
    universalLimit: 3,
  },
  {
    label: "Products",
    verticalKey: "product",
    pageType: "grid-cols-3",
    cardType: ProductProminentImage,
    universalLimit: 3,
    visualTypeHead: true,
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
  },
];
export const IsChatEnabled: boolean = false; // Change to true if you want to show chat
export const locale: string | undefined = undefined; //Replace undefined with your locale. for eg. "en_GB" or "ja"
export const IsGenerativeDirectAnswerEnabled: boolean = false; // Change to true if you want to show Generative Direct Answer
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

/** Sample Sort options */
// sortByOptions: [
//   {
//     label: "Name: A-Z",
//     sortBy: {
//       field: "name",
//       direction: Direction.Ascending,
//       type: SortType.Field,
//     },
//   },
//   {
//     label: "Name: Z-A",
//     sortBy: {
//       field: "name",
//       direction: Direction.Descending,
//       type: SortType.Field,
//     },
//   },
// ],
