import { MapPinIcon, PhoneIcon } from "@heroicons/react/20/solid";
import { Address, Image, Link } from "@yext/pages-components";
import { CardProps } from "@yext/search-ui-react";
import HoursText from "../HoursText";
import Cta from "../cta";
import { format_phone } from "../../utils/reusableFunctions";

const ProfessionalStandard = ({ result }: CardProps<any>) => {
  const { name } = result;
  const {
    headshot,
    mainPhone,
    hours,
    landingPageUrl,
    address,
    timezone,
    c_primaryCTA,
    c_secondaryCTA,
  } = result.rawData;

  return (
    <article className="border rounded-lg">
      <header className="relative flex flex-col">
        <a
          href={landingPageUrl}
          className="group aspect-square block w-full overflow-hidden rounded-t-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100"
        >
          {headshot && (
            <Image
              image={headshot!}
              className="pointer-events-none object-cover group-hover:opacity-75"
            />
          )}
        </a>
        <h2 className="text-primary text-lg font-bold px-2 mt-4">
          <a href={landingPageUrl}>{name}</a>
        </h2>
      </header>
      <section className="px-2 space-y-1">
        {hours ? (
          <HoursText timezone={timezone} hours={hours} />
        ) : (
          <p>Fill in your hours</p>
        )}
        {address && (
          <address className="flex justify-center md:justify-start font-medium leading-loose items-start text-sm text-secondary not-italic">
            <MapPinIcon className="h-4 w-4 mt-2" />
            <span className="ml-2">
              <Address address={address} />
            </span>
          </address>
        )}
        {mainPhone && (
          <section className="flex justify-center md:justify-start font-medium leading-loose items-center text-sm text-secondary">
            <PhoneIcon className="h-4 w-4" />
            <span className="ml-2">{format_phone(mainPhone)}</span>
          </section>
        )}
        {(c_primaryCTA || c_secondaryCTA) && (
          <footer className="flex flex-col   gap-2 justify-center pt-4 pb-2 items-center uppercase">
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

export default ProfessionalStandard;
