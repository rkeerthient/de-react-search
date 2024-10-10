import { LexicalRichText } from "@yext/pages-components";
import Markdown from "react-markdown";

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
}

const ResponseComponent = ({ response }: ResponseComponentProps) => {
  if (typeof response === "object" && "json" in response) {
    return <LexicalRichText serializedAST={JSON.stringify(response.json)} />;
  }

  if (typeof response === "object" && "markdown" in response) {
    return <Markdown>{response.markdown}</Markdown>;
  }

  if (typeof response === "string") {
    return <p>{response}</p>;
  }

  return null;
};

export default ResponseComponent;
