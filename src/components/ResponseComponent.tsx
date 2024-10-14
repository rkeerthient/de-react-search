import { LexicalRichText } from "@yext/pages-components";
import { useState } from "react";
import Markdown from "react-markdown";
import { concatClassNames } from "../utils/reusableFunctions";

type ResponseType =
  | {
      json: {
        root: any;
      };
    }
  | {
      markdown: string;
    }
  | string;

interface ResponseComponentProps {
  response: ResponseType;
  showMore?: boolean;
}

const ResponseComponent = ({ response, showMore }: ResponseComponentProps) => {
  const [showMoreLines, setShowMoreLines] = useState(showMore);
  const toggleLines = () => {
    setShowMoreLines((prevState) => !prevState);
  };

  if (typeof response === "object" && "json" in response) {
    return (
      <section aria-expanded={showMoreLines}>
        <LexicalRichText serializedAST={JSON.stringify(response.json)} />
      </section>
    );
  }

  if (typeof response === "object" && "markdown" in response) {
    return (
      <section aria-expanded={showMoreLines}>
        <Markdown>{response.markdown}</Markdown>
      </section>
    );
  }

  if (typeof response === "string") {
    return (
      <section aria-expanded={showMoreLines}>
        <p
          className={concatClassNames(
            "transition-all duration-500 ease-in-out",
            !showMoreLines && "line-clamp-3"
          )}
          style={{
            overflow: "hidden",
          }}
          aria-live="polite"
        >
          {response}
        </p>
        {showMore && (
          <button
            onClick={toggleLines}
            aria-expanded={showMoreLines}
            aria-controls="response-text"
            style={{
              display: "block",
              marginTop: "10px",
            }}
          >
            {showMoreLines ? "Show Less >" : "Show More >"}
          </button>
        )}
      </section>
    );
  }

  return null;
};

export default ResponseComponent;
