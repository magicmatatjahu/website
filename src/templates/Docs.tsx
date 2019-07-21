import React from "react";

import DocsPage from "@components/docs/DocsPage";

import { PageContext } from "@common/types";
import { DocsPageContext } from "@components/docs/types";

const DocsPageTemplate: React.FunctionComponent<
  PageContext<DocsPageContext>
> = ({ pageContext }) => <DocsPage pageContext={pageContext} />;

export default DocsPageTemplate;
