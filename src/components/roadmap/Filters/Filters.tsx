import React, { useContext } from "react";

import { FormattedMessage } from "@common/i18n";

import Icon from "@components/shared/Icon";

import RoadmapService from "@components/roadmap/service";
import TicketsService from "@components/roadmap/Tickets/service";

import { Capability } from "../types";

import { FiltersList, Filter, FilterButton } from "./styled";

const Filters: React.FunctionComponent = () => {
  const { capabilities } = useContext(RoadmapService);
  const { filters, setRelease, setCapability, clearFilters } = useContext(
    TicketsService,
  );

  if (!filters.capabilities || !filters.capabilities.length) {
    return null;
  }

  const displayNameForReleases = (release: string) =>
    release === "Future" ? (
      <FormattedMessage id="roadmap.timeline.futurePlanned" />
    ) : /[0-9]\.[0-9]/.test(release) ? (
      <FormattedMessage
        id="roadmap.timeline.release"
        values={{
          number: release,
        }}
      />
    ) : (
      release
    );

  return (
    <>
      <FiltersList>
        {filters.releases.map(release => (
          <Filter key={release} onClick={() => setRelease(release)}>
            <FilterButton>
              {displayNameForReleases(release)}
              <Icon iconName="times" iconPrefix="fas" />
            </FilterButton>
          </Filter>
        ))}
        {filters.capabilities.map(capability => {
          const displayName = capabilities.find(
            cap => cap.frontmatter.id === capability,
          )!.frontmatter.displayName;

          return (
            <Filter key={displayName} onClick={() => setCapability(capability)}>
              <FilterButton>
                {displayName}
                <Icon iconName="times" iconPrefix="fas" />
              </FilterButton>
            </Filter>
          );
        })}
        <Filter key={"clear-all"} onClick={clearFilters}>
          <FilterButton>Clear all</FilterButton>
        </Filter>
      </FiltersList>
    </>
  );
};

export default Filters;
