import { CardProps } from "@yext/search-ui-react";
import Event from "../../types/events";
import ResponseComponent from "../ResponseComponent";
import Cta from "../cta";
import { getGoogleMapsLink } from "../../utils/reusableFunctions";
import { MapPinIcon } from "@heroicons/react/20/solid";
const EventStandard = ({ result }: CardProps<Event>) => {
  const { name } = result;
  const {
    description,
    time,
    keywords,
    address,
    ticketUrl,
    websiteUrl,
    landingPageUrl,
    yextDisplayCoordinate,
  } = result.rawData;

  const formatDateTimeRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const startDateStr = startDate.toLocaleDateString("default", {
      month: "long",
      year: "numeric",
      day: "2-digit",
    });
    const endDateStr = endDate.toLocaleDateString("default", {
      month: "long",
      year: "numeric",
      day: "2-digit",
    });

    const startTimeStr = startDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const endTimeStr = endDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (startDateStr === endDateStr) {
      return `${startDateStr} at ${startTimeStr} - ${endTimeStr}`;
    }

    return `${startDateStr} ${startTimeStr} - ${endDateStr} ${endTimeStr}`;
  };

  return (
    <article
      className="flex gap-2 md:gap-8 cards justify-start w-full items-start md:items-center flex-col md:flex-row"
      aria-labelledby={`job-title-${result.id}`}
    >
      <div className="flex-col justify-between items-center w-16 h-16 hidden md:flex">
        <div className="m-auto font-bold text-xl">
          {new Date(time.start).getDate()}
        </div>
        <div className="m-auto font-medium">
          {new Date(time.start).toLocaleString("default", { month: "long" })}
        </div>
      </div>
      <header className="flex flex-col ">
        <h2 id={`job-title-${result.id}`} className="standardTitle">
          {name}
        </h2>
        {time && (time.start || time.end) && (
          <p className="standardSubTitle !text-base">
            {formatDateTimeRange(time.start, time.end)}
          </p>
        )}
        <address className="not-italic w-full flex gap-2 flex-col  my-2">
          {address && (
            <section className="flex gap-2 items-center text-base">
              <MapPinIcon className="h-4 w-4 " />
              {address.line1}
            </section>
          )}
        </address>
        {description && <ResponseComponent response={description} />}
      </header>
      <footer
        className="w-full md:w-auto flex flex-row md:flex-col items-center justify-center gap-2 md:pt-4 pb-2 uppercase md:ml-auto md:mr-4"
        aria-label="Call to Actions"
      >
        <Cta
          cta={{
            label: "RSVP",
            linkType: "URL",
            link: ticketUrl || websiteUrl?.url || landingPageUrl || "yext.com",
          }}
          ctaType="primaryCta"
          aria-label="Primary call to action"
        />

        <Cta
          cta={{
            label: "Get Directions",
            link: getGoogleMapsLink(yextDisplayCoordinate!),
            linkType: "URL",
          }}
          ctaType="secondaryCta"
          aria-label="Secondary call to action"
        />
      </footer>
    </article>
  );
};

export default EventStandard;
