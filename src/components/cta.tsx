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
      className={`border-2 w-full px-2 py-1 flex justify-center ${ctaType}`}
      cta={{
        link: cta.link,
        label: cta.label,
        linkType: cta.linkType,
      }}
    />
  );
};

export default Cta;
