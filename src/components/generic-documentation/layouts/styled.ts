import styled, { media } from "@styled";

export const DocsLayoutWrapper = styled.div`
  &&& {
    width: 100%;

    .grid-container {
      padding: 15px;
    }

    .grid-unit-content {
      padding: 0 32px;

      ${media.phone`
        padding: 0 16px;
      `}
    }

    .grid-unit-navigation {
      ${media.tablet`
        /* Fix strange behavior of grid unit */
        flex: 0 0 0;
        max-width: 0;
      `};
    }

    .grid-unit-toc-navigation {
      ${media.phone`
        /* Fix strange behavior of grid unit */
        flex: 0 0 0;
        max-width: 0;
      `};
    }
  }
`;

export const CommunityLayoutWrapper = styled.div`
  &&& {
    width: 100%;
    margin-top: 72px;

    .grid-container {
      padding: 15px;
    }

    .grid-unit-content {
      padding: 0 32px;

      ${media.phone`
        padding: 0 16px;
      `}
    }

    .grid-unit-navigation {
      ${media.tablet`
        /* Fix strange behavior of grid unit */
        flex: 0 0 0;
        max-width: 0;
      `};
    }

    .grid-unit-toc-navigation {
      ${media.phone`
        /* Fix strange behavior of grid unit */
        flex: 0 0 0;
        max-width: 0;
      `};
    }

    .hash-link {
      width: 100%;

      h1 {
        margin: 76px 0 0 0;
        width: 100%;
        display: flex;
        align-items: center;

        img {
          margin: 0;
        }

        span {
          margin-left: 16px;
          display: inline-block;
        }
      }
    }
  }
`;

interface TitleHeaderProps {
  marginBottom?: boolean;
}

export const TitleHeader = styled.h1<TitleHeaderProps>`
  &&&&& {
    box-sizing: border-box;
    font-size: 40px;
    font-weight: 600;
    margin: 0;
    padding-top: 16px;
    margin-bottom: ${props => (props.marginBottom ? `16px` : `0`)};
  }
`;
