import React, { useContext } from "react";

import Checkbox from "@components/shared/Checkbox";

import { Capability } from "@components/roadmap/types";

import {
  OptionsWrapper,
  OptionsList,
  OptionsListItem,
  OptionsListItemName,
} from "./styled";

interface Props {
  capabilities: Capability[];
}

const Options: React.FunctionComponent<Props> = ({ capabilities }) => {
  const list = (
    <OptionsList>
      {capabilities.map((capability, idx) => (
        <OptionsListItem key={idx}>
          <label>
            <OptionsListItemName>
              {capability.frontmatter.displayName}
            </OptionsListItemName>
            <Checkbox
              checked={true}
              onChange={() => null}
              onClick={() => null}
            />
          </label>
        </OptionsListItem>
      ))}
    </OptionsList>
  );

  return (
    <OptionsWrapper>
      <div>{list}</div>
    </OptionsWrapper>
  );
};

export default Options;
