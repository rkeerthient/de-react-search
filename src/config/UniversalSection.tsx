import {
  DefaultRawDataType,
  SectionProps,
  VerticalConfigMap,
} from "@yext/search-ui-react";
import { VerticalConfig } from "./VerticalConfig";

export const UniversalSection = ({
  results,
  header,
  CardComponent,
}: SectionProps<DefaultRawDataType>) => {
  if (!CardComponent) {
    return <div>Missing Card Component</div>;
  }

  const pageType = VerticalConfig.find(
    (item) => item.label === header?.props.label
  )?.pageType;

  const className = pageType?.includes("grid")
    ? `grid grid-cols-1 md:${pageType} gap-8`
    : `space-y-8`;

  return (
    <div>
      <div>{header}</div>
      <div className={className}>
        {results.map((r: any, index: number) => (
          <CardComponent key={index} result={r} />
        ))}
      </div>
    </div>
  );
};
