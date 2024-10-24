import { CardProps } from "@yext/search-ui-react";
import Product from "../../types/product";
import { Image } from "@yext/pages-components";
import Cta from "../cta";
import ResponseComponent from "../ResponseComponent";

const ProductProminentImage = ({ result }: CardProps<Product>) => {
  const {
    id,
    price,
    name,
    c_primaryCTA,
    richTextDescriptionV2,
    landingPageUrl,
    primaryPhoto,
    c_secondaryCTA,
  } = result.rawData;
  return (
    <article id={`location-card-${id}`} className={`border rounded-lg `}>
      <header className={`relative flex flex-col `}>
        <a
          href={landingPageUrl}
          className={`group aspect-square block   overflow-hidden rounded-t-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 `}
        >
          {primaryPhoto && (
            <Image
              image={primaryPhoto!}
              className="pointer-events-none object-cover group-hover:opacity-75 !w-full"
            />
          )}
        </a>
        <h2 className=" text-lg font-bold px-2 mt-4">
          <a href={landingPageUrl}>{name}</a>
        </h2>
        {price && <p className="standardSubTitle ">${price.value}</p>}
      </header>
      {richTextDescriptionV2 && (
        <ResponseComponent response={richTextDescriptionV2} showMore={true} />
      )}
      <section className={`px-2 space-y-1 `}>
        {(c_primaryCTA || c_secondaryCTA) && (
          <footer
            className={`flex gap-2 justify-center pt-4 pb-2 items-center uppercase flex-col`}
          >
            {c_primaryCTA && <Cta cta={c_primaryCTA} ctaType="primaryCta" />}
            {c_secondaryCTA && (
              <Cta cta={c_secondaryCTA} ctaType="secondaryCta" />
            )}
          </footer>
        )}
      </section>
    </article>
  );
};

export default ProductProminentImage;
