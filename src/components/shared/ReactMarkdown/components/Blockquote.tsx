import React from "react";
import styled from "@styled";

import Panel from "@components/shared/Panel";

const StyledBlockQuote = styled.blockquote`
  margin-left: 0;
  padding-left: 1.6rem;
  border-left: 3px solid rgba(27, 31, 35, 0.2);
`;

interface BlockQuoteProps {}

export const BlockQuote: React.FunctionComponent<BlockQuoteProps> = ({
  children,
}) => {
  const getPanelType = (child: any) => {
    const type =
      child.props.children[0] &&
      child.props.children[0].props.children[0] &&
      child.props.children[0].props.children[0].props &&
      child.props.children[0].props.children[0].props.value;

    return type && type.replace(":", "").toLowerCase();
  };

  const extractChildren = (child: any) => {
    const [strong, ...rest] = child.props.children;
    return rest;
  };

  const createPanels = (children: any) => {
    return children.map((child: any, index: number) => {
      const typeOfPanel = getPanelType(child);
      const extractedChildren = extractChildren(child);

      return typeOfPanel ? (
        <Panel type={typeOfPanel} key={index}>
          {extractedChildren}
        </Panel>
      ) : (
        <StyledBlockQuote key={index}>{child}</StyledBlockQuote>
      );
    });
  };

  return children && <>{createPanels(children)}</>;
};
