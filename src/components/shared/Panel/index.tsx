import React from "react";
import styled from "@styled";

import Grid from "@styled/Grid";

import { PanelWrapper, PanelHeader, PanelContent, PanelTitle } from "./styled";

export interface PanelProps {
  type: "note" | "tip" | "caution";
  className?: string;
}

const Panel: React.FunctionComponent<PanelProps> = ({
  type = "note",
  children,
  className = "",
}) => {
  const getIcon = (type: string = "note") => {
    switch (type) {
      case "note":
        return "info";
      case "tip":
        return "magic";
      case "caution":
        return "exclamation-triangle";
      default:
        return "note";
    }
  };

  return (
    <PanelWrapper type={type}>
      <PanelHeader>
        <PanelTitle>{type.toUpperCase()}</PanelTitle>
      </PanelHeader>
      <PanelContent>{children}</PanelContent>
    </PanelWrapper>
  );
};

export default Panel;
