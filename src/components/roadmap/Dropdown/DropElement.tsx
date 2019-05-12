import React, { useContext } from "react";

import H from "@components/shared/H";
import Icon from "@components/shared/Icon";
import Checkbox from "@components/shared/Checkbox";

import RoadmapService from "@components/roadmap/service";
import TicketsService from "@components/roadmap/Tickets/service";

import { Capability } from "../types";

import {
  DropdownContent,
  DropdownListWrapper,
  DropdownListHeader,
  DropdownList,
  DropdownListItem,
  DropdownListItemName,
} from "./styled";

const DropElement: React.FunctionComponent = () => {
  const { capabilities } = useContext(RoadmapService);
  const { extractReleases, filters, setRelease, setCapability } = useContext(
    TicketsService,
  );

  const releasesList = (
    <DropdownListWrapper>
      <DropdownListHeader>
        <H as="h5">Releases</H>
      </DropdownListHeader>
      <DropdownList>
        {extractReleases().map((release, idx) => (
          <DropdownListItem key={idx}>
            <label>
              <DropdownListItemName>
                {release === "Future" ? "Future planned" : release}
              </DropdownListItemName>
              <Checkbox
                checked={filters.releases.includes(release)}
                onChange={() => null}
                onClick={() => {
                  setRelease(release);
                }}
              />
            </label>
          </DropdownListItem>
        ))}
      </DropdownList>
    </DropdownListWrapper>
  );

  const capabilitiesList = (
    <DropdownListWrapper>
      <DropdownListHeader>
        <H as="h5">Capabilities</H>
      </DropdownListHeader>
      <DropdownList>
        {capabilities.map((capability, idx) => (
          <DropdownListItem key={idx}>
            <label>
              <DropdownListItemName>
                {capability.frontmatter.displayName}
              </DropdownListItemName>
              <Checkbox
                checked={filters.capabilities.includes(
                  capability.frontmatter.id,
                )}
                onChange={() => null}
                onClick={() => {
                  setCapability(capability.frontmatter.id);
                }}
              />
            </label>
          </DropdownListItem>
        ))}
      </DropdownList>
    </DropdownListWrapper>
  );

  return (
    <DropdownContent>
      {capabilitiesList}
      {releasesList}
    </DropdownContent>
  );
};

export default DropElement;
