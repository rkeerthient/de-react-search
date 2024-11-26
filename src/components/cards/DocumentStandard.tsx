import { CardProps } from "@yext/search-ui-react";
import { FaFile } from "react-icons/fa";
import Cta from "../cta";
import ResponseComponent from "../ResponseComponent";

const DocumentStandard = ({ result }: CardProps<any>) => {
  const { id, name, landingPageUrl, richTextDescriptionV2 } = result.rawData;
  return (
    <article id={`file-card-${id}`} className={`border rounded-lg p-4`}>
      <header className={`relative flex flex-col gap-4`}>
        <h2 className="text-lg md:text-xl font-medium">
          <a href={landingPageUrl}>{name}</a>
        </h2>
        <article className="flex items-center justify-start">
          <ResponseComponent response={richTextDescriptionV2} />
        </article>

        <Cta
          cta={{
            label: "Learn more",
            link: landingPageUrl,
            linkType: "URL",
          }}
          ctaType="primaryCta"
          aria-label="Primary call to action"
        />
      </header>
    </article>
  );
};

export default DocumentStandard;
