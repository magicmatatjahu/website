import styled from "@styled";

interface PanelWrapperProps {
  type?: string;
}

export const PanelWrapper = styled.blockquote`
  margin-left: 0;
  margin-right: 0;
  padding: 16px;
  border-left: 3px solid
    ${(props: PanelWrapperProps) => {
      switch (props.type) {
        case "note":
          return "#0073e6";
        default:
          return "#0073e6";
      }
    }};
  background: ${(props: PanelWrapperProps) => {
    switch (props.type) {
      case "note":
        return "#fff";
      default:
        return "#fff";
    }
  }};
`;

export const PanelHeader = styled.header``;

export const PanelTitle = styled.h5`
  && {
    margin-bottom: 8px;
  }
`;

export const PanelContent = styled.div`
  display: inline-block;
`;
