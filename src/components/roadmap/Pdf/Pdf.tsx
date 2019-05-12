import React from "react";

import Icon from "@components/shared/Icon";

import Modal from "@components/roadmap/Pdf/Modal/Modal";

import { PdfIcon } from "./styled";

const Pdf: React.FunctionComponent = ({}) => {
  const openComponent = (
    <PdfIcon>
      <Icon iconName="file-pdf" iconPrefix="fas" />
    </PdfIcon>
  );

  return <Modal openComponent={openComponent} />;
};

export default Pdf;
