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

export const OptionsWrapper = styled.div`
  height: 100%;
  background: #2068df;
  color: #fff;
  position: relative;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;

  > div {
    padding: 72px 68px 32px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    background-image: linear-gradient(
      244deg,
      rgba(0, 232, 51, 0.5),
      rgba(60, 144, 228, 0)
    );
  }

  ${media.phone`
    border-radius: 0;

    > div {
      padding: 62px 44px 24px;
      border-radius: 0;
    }
  `};
`;

export const OptionsList = styled.ul`
  margin: 0;
`;

export const OptionsListItem = styled.li`
  padding: 16px 0;
  margin: 0;
  border-bottom: 1px solid #fff;
  font-size: 14px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #fff;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }

  > label {
    display: flex;
    cursor: pointer;

    > div {
      position: relative;
      margin-left: auto;
      order: 2;

      > div {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
      }
    }
  }
`;

export const OptionsListItemName = styled.span`
  line-height: 1.43;
`;

export const RendererWrapper = styled.div`
  height: 100%;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  background: #fff;

  ${media.phone`
    border-radius: 0;
  `};
`;
