import React, { useEffect, useContext } from "react";
import { navigate } from "gatsby";
import qs from "qs";

import Grid from "@styled/Grid";

import RoadmapService from "@components/roadmap/service";

import { Wrapper, StyledModal, ContentWrapper } from "./styled";

export const WithoutModal: React.FunctionComponent = ({ children }) => (
  <Wrapper>
    <Grid.Container>
      <Grid.Row>
        <Grid.Unit df={12}>{children}</Grid.Unit>
      </Grid.Row>
    </Grid.Container>
  </Wrapper>
);

interface Props {
  openComponent: React.ReactNode;
}

const Modal: React.FunctionComponent<Props> = ({ openComponent }) => {
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

  const content = <ContentWrapper>dupa</ContentWrapper>;

  return (
    <StyledModal
      openComponent={openComponent}
      onRequestClose={getExitLocation}
      show={true}
    >
      {content}
    </StyledModal>
  );
};

export default Modal;
