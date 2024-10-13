import {
  GetHeadConfig,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateRenderProps,
} from "@yext/pages";
import "../index.css";
import PageLayout from "../components/pageLayout";
import SearchPage from "../components/search/searchPage";

export const config: TemplateConfig = {
  name: "search",
};

export const getPath = () => {
  return `search.html`;
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "Capital Fins Bank  | Search",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: "Capital fins Search",
        },
      },
    ],
  };
};

const Search: Template<TemplateRenderProps> = () => {
  return (
    <>
      <PageLayout>
        <SearchPage />
      </PageLayout>
    </>
  );
};

export default Search;
