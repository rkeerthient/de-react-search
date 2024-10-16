import { DefaultRawDataType, SectionProps } from "@yext/search-ui-react";
import { VerticalConfig } from "../config/VerticalConfig";

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
    <section>
      <h2 className="font-bold text-base md:text-xl my-4">
        {header?.props.label.toUpperCase()}
      </h2>
      <div aria-label={`${header} results section`} className={className}>
        {results.map((r: any, index: number) => (
          <CardComponent key={index} result={r} />
        ))}
      </div>
    </section>
  );
};
