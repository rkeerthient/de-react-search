import {
  SearchHeadlessProvider,
  provideHeadless,
} from "@yext/search-headless-react";
import { searchConfig } from "./config";
import Footer from "./footer";
import Header from "./header";

type Props = {
  _site?: any;
  children?: React.ReactNode;
};
const PageLayout = ({ _site, children }: Props) => {
  return (
    <div className="min-h-screen">
      <Header _site={_site} />
      <div className="py-8">
        <SearchHeadlessProvider searcher={provideHeadless(searchConfig)}>
          {children}
        </SearchHeadlessProvider>
      </div>
      <Footer _site={_site}></Footer>
    </div>
  );
};

export default PageLayout;
