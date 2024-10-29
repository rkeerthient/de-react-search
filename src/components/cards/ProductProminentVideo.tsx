import { CardProps } from "@yext/search-ui-react";
import ResponseComponent from "../ResponseComponent";
import Cta from "../cta";

const ProductProminentVideo = ({ result }: CardProps<any>) => {
  const {
    id,
    name,
    c_primaryCTA,
    description,
    landingPageUrl,
    c_secondaryCTA,
    youtube_videoURL,
  } = result.rawData;
  return (
    <article id={`video-card-${id}`} className={`border rounded-lg `}>
      <header className={`relative flex flex-col `}>
        <a
          href={landingPageUrl}
          className={`group aspect-square block overflow-hidden rounded-t-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 `}
        >
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="video"
            className="border-0 w-full h-full"
          />
        </a>
        <h2 className=" text-lg font-bold px-2 mt-4">
          <a href={youtube_videoURL}>{name}</a>
        </h2>
      </header>
      {description && (
        <ResponseComponent response={description} showMore={true} />
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

export default ProductProminentVideo;
