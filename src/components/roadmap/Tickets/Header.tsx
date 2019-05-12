import React from "react";

import { FormattedMessage } from "@common/i18n";

import H from "@components/shared/H";

import Dropdown from "@components/roadmap/Dropdown/Dropdown";
import PdfViewer from "@components/roadmap/Pdf/Pdf";

import Filters from "@components/roadmap/Filters/Filters";

import { HeaderWrapper, HeaderButtonsWrapper } from "./styled";

const Header: React.FunctionComponent = () => (
  <HeaderWrapper>
    <FormattedMessage id="roadmap.timeline.header">
      {header => <H as="h2">{header}</H>}
    </FormattedMessage>
    <HeaderButtonsWrapper>
      <Dropdown />
      <PdfViewer />
    </HeaderButtonsWrapper>
    <Filters />
  </HeaderWrapper>
);

export default Header;
