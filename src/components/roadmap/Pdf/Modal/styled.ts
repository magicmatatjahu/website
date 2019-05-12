import styled, { media } from "@styled";

import Modal from "@components/shared/Modal";

export const Wrapper = styled.div`
  margin-top: 52px;
`;

export const StyledModal = styled(Modal)`
  > div {
    padding: 96px 0;
  }

  ${media.phone`
    > div {
      padding: 0;
    }
  `};
`;

export const ContentWrapper = styled.div`
  border-radius: 8px;

  ${media.phone`
    border-radius: 0;
  `};
`;
