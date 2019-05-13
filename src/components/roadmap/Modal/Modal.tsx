import React, { useEffect, useContext } from "react";
import { navigate } from "gatsby";
import qs from "qs";

import Grid from "@styled/Grid";

import ModalHeader from "@components/roadmap/Modal/Header";
import ModalContent from "@components/roadmap/Modal/Content";

import RoadmapService from "@components/roadmap/service";

import { Ticket } from "../types";

import { Wrapper, StyledModal, ContentWrapper } from "./styled";

const Modal: React.FunctionComponent = () => {
  const {
    pageContext: { ticket },
    location,
    scrollToTickets,
    isInitialRenderComplete,
  } = useContext(RoadmapService);

  const getExitLocation = () => {
    let path: string = `/roadmap/`;

    const { state } = location;
    if (
      state &&
      state.filters &&
      state.filters.capabilities &&
      Object.keys(state.filters.capabilities).length
    ) {
      const queryString = qs.stringify({
        capabilities: state.filters.capabilities,
      });
      path = `/roadmap/?${queryString}`;
    }

    navigate(path);
  };

  const content = (
    <ContentWrapper>
      <ModalHeader ticket={ticket} />
      <ModalContent body={ticket.body} />
    </ContentWrapper>
  );

  return (
    <StyledModal
      openComponent={null}
      onRequestClose={getExitLocation}
      show={true}
    >
      {content}
    </StyledModal>
  );
};

export default Modal;
