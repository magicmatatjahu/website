import React from "react";
import Helmet from "react-helmet";
import { useStaticQuery, graphql, withPrefix } from "gatsby";

import { injectIntl, IntlInterface } from "@common/i18n";
import { getActualYear } from "@common/utils";

import StructureData from "./StructureData";
import Facebook from "./Facebook";
import Twitter from "./Twitter";

interface Props {
  language?: string;
  pageTitle?: string;
  pageDescription?: string;
  pathname?: string;
  article?: boolean;
}

const SEO: React.FunctionComponent<Props & IntlInterface> = ({
  language = "en",
  pageTitle,
  pageDescription,
  pathname,
  article = false,
  formatMessage,
}) => {
  const {
    site: {
      buildTime,
      siteMetadata: { twitterUsername },
    },
  } = useStaticQuery(query);

  const siteUrl = process.env.GATSBY_SITE_URL || "";
  const logoPath = `${siteUrl}${withPrefix("/favicon-32x32.png")}`;
  const image = `${siteUrl}${withPrefix("/logo.png")}`;
  const pageUrl = `${siteUrl}${pathname || ""}`;

  let title = `${formatMessage({ id: "title" })} - ${formatMessage({
    id: "shortDescription",
  })}`;
  title = pageTitle ? `${pageTitle} | ${title}` : title;

  const description = pageDescription
    ? pageDescription
    : formatMessage({ id: "description" });

  const copyright = formatMessage(
    { id: "copyright" },
    {
      actualYear: getActualYear(),
    },
  );
  const keywords = formatMessage({ id: "keywords" });

  return (
    <>
      <Helmet title={title}>
        <html lang={language} />
        <meta name="description" content={description} />
        <meta name="copyright" content={copyright} />
        <meta name="keywords" content={keywords} />
        <meta name="image" content={image} />
        <meta name="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="theme-color" content="#2b5797" />
      </Helmet>
      <StructureData />
      <Facebook
        description={description}
        image={image}
        title={title}
        type={article ? "article" : "website"}
        pageUrl={pageUrl}
        locale={"en_US"} // Extract it to config file!
      />
      <Twitter
        title={title}
        image={image}
        description={description}
        username={twitterUsername as string}
      />
    </>
  );
};

const query = graphql`
  query SEO {
    site {
      buildTime(formatString: "YYYY-MM-DD")
      siteMetadata {
        twitterUsername
      }
    }
  }
`;

export default injectIntl("seo")(SEO);
