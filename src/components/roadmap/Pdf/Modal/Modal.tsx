import React, { useContext } from "react";

import Grid from "@styled/Grid";

import RoadmapService from "@components/roadmap/service";

import Options from "@components/roadmap/Pdf/Modal/Options";
import Renderer from "@components/roadmap/Pdf/Modal/Renderer";

import { Capability } from "@components/roadmap/types";

import { StyledModal, ContentWrapper } from "./styled";

interface ContentProps {
  capabilities: Capability[];
}

export const Content: React.FunctionComponent<ContentProps> = ({
  capabilities,
}) => (
  <ContentWrapper>
    <Grid.Container>
      <Grid.Row>
        <Grid.Unit df={5} withoutPadding={true}>
          <Options capabilities={capabilities} />
        </Grid.Unit>
        <Grid.Unit df={7} withoutPadding={true}>
          <Renderer />
        </Grid.Unit>
      </Grid.Row>
    </Grid.Container>
  </ContentWrapper>
);

interface Props {
  openComponent: React.ReactNode;
}

const Modal: React.FunctionComponent<Props> = ({ openComponent }) => {
  const { capabilities } = useContext(RoadmapService);

  return (
    <StyledModal openComponent={openComponent} show={true}>
      <Content capabilities={capabilities} />
    </StyledModal>
  );
};

export default Modal;
