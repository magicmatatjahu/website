import React from "react";
import Helmet from "react-helmet";
import { Breadcrumb } from "schema-dts";

const StructureData: React.FunctionComponent = () => {
  const breadcrumbList: Breadcrumb = {};

  const breadcrumbs = {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    description: "Breadcrumbs list",
    name: "Breadcrumbs",
    itemListElement: breadcrumbList,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(breadcrumbs)}</script>
    </Helmet>
  );
};
