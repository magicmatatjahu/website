import React from "react";
import Helmet from "react-helmet";

interface Props {
  siteName?: string;
  locale: string;
  pageUrl: string;
  type: string;
  title: string;
  description: string;
  image: string;
}

const Facebook: React.FunctionComponent<Props> = ({
  siteName = null,
  locale = null,
  pageUrl = null,
  type = "website",
  title = null,
  description = null,
  image = null,
}) => (
  <Helmet>
    {siteName && <meta property="og:site_name" content={siteName} />}
    {locale && <meta property="og:locale" content={locale} />}
    {pageUrl && <meta property="og:url" content={pageUrl} />}
    <meta property="og:type" content={type} />
    {title && <meta property="og:title" content={title} />}
    {description && <meta property="og:description" content={description} />}
    {image && <meta property="og:image" content={image} />}
    {description && <meta property="og:image:alt" content={description} />}
  </Helmet>
);

export default Facebook;
