import { CardProps } from "@yext/search-ui-react";
import { FaFile } from "react-icons/fa";
import Cta from "../cta";

const FileStandard = ({ result }: CardProps<any>) => {
  const { id, name, c_file, landingPageUrl, s_snippet } = result.rawData;
  return (
    <article id={`file-card-${id}`} className={`border rounded-lg `}>
      <header className={`relative flex flex-col `}>
        <h2 className="text-lg font-bold px-2 mt-4">
          <a href={c_file.url}>{name}</a>
        </h2>
        <article className="flex items-center justify-start">
          <FaFile />
          <p className="ml-8">
            {c_file.name} ({c_file.size})
          </p>
        </article>
        {s_snippet && <p className="standardSubTitle">{s_snippet}</p>}
        <Cta
          cta={{
            label: "Learn more",
            link: landingPageUrl || c_file.url,
            linkType: "URL",
          }}
          ctaType="primaryCta"
          aria-label="Secondary call to action"
        />
      </header>
    </article>
  );
};

export default FileStandard;
