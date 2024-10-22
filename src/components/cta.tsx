import { Link } from "@yext/pages-components";

type Cta = {
  link?: string;
  label?: string;
  linkType?: string;
};

type CTAProps = {
  cta: Cta;
  ctaType: "primaryCta" | "secondaryCta";
};

const Cta = ({ cta, ctaType }: CTAProps) => {
  return (
    <Link
      className={`border-2 text-sm md:text-base p-2 flex justify-center md:w-[220px] ${ctaType}`}
      cta={{
        link: cta.link,
        label: cta.label,
        linkType: cta.linkType,
      }}
    />
  );
};

export default Cta;
