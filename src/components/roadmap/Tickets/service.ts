import { useState, useEffect, useContext } from "react";
import qs from "qs";
import { navigate } from "gatsby";
import createContainer from "constate";

import TicketsProcessor from "@components/roadmap/Tickets/TicketsProcessor";
import RoadmapService from "@components/roadmap/service";

import { Release } from "../types";

import tickets from "../../../../content/roadmap/tickets.json";

interface State {
  filters: {
    releases: string[];
    capabilities: string[];
  };
  initial: boolean;
}

const initialState: State = {
  filters: {
    releases: [],
    capabilities: [],
  },
  initial: true,
};

const TicketsService = () => {
  const {
    capabilities,
    scrollToTicketsReference,
    scrollToTickets,
    location,
  } = useContext(RoadmapService);
  const [{ filters, initial }, setState] = useState<State>(initialState);
  const ticketsProcessor = new TicketsProcessor(tickets);

  interface ReleaseWithNumber {
    release: Release;
    orderNumber: number;
  }

  const prepareReleases = (): ReleaseWithNumber[] =>
    ticketsProcessor
      .sortReleases()
      .filterReleasesByQueryParams(filters.releases)
      .filterCapabilitiesByQueryParams(filters.capabilities, capabilities)
      .filterCapabilitiesWithoutCapabilities()
      .removeCapabilitiesWithoutTickets()
      .createReleasesWithNumber()
      .returnReleasesWithNumber();

  const extractReleases = (): string[] =>
    ticketsProcessor
      .returnReleases()
      .filter(release =>
        Object.keys(release.capabilities).some(
          capability => release.capabilities[capability].length > 0,
        ),
      )
      .map(release => release.displayName);

  useEffect(() => {
    prepareReleases();
    const { pathname, search = ``, state } = location;
    const { releases, capabilities: caps } = qs.parse(search.replace(`?`, ``), {
      comma: true,
    });

    let formattedCapabilities: string[] = [];
    if (Array.isArray(caps)) {
      formattedCapabilities = caps;
    } else {
      if (caps) {
        formattedCapabilities = [caps];
      }
    }

    let formattedReleases: string[] = [];
    if (Array.isArray(releases)) {
      formattedReleases = releases;
    } else {
      if (releases) {
        formattedReleases = [releases];
      }
    }

    if (
      (formattedCapabilities && formattedCapabilities.length) ||
      (formattedReleases && formattedReleases.length)
    ) {
      setState({
        filters: {
          releases: formattedReleases,
          capabilities: formattedCapabilities,
        },
        initial: false,
      });
      return;
    }

    if (
      state &&
      state.filters &&
      ((state.filters.capabilities && state.filters.capabilities.length) ||
        (state.filters.releases && state.filters.releases.length))
    ) {
      setState({
        filters: {
          releases: state.filters.releases,
          capabilities: state.filters.capabilities,
        },
        initial: false,
      });
      return;
    }
  }, []);

  useEffect(() => {
    if (location.hash) {
      clearFilters();
    }
  }, [location.hash]);

  useEffect(() => {
    const { pathname, search, hash } = location;
    const queryString = qs.stringify(
      {
        releases: filters.releases,
        capabilities: filters.capabilities,
      },
      { arrayFormat: "comma", encode: false },
    );

    if (!filters.releases.length && !filters.capabilities.length && hash) {
      return;
    }

    if (!initial && queryString === "capabilities=") {
      navigate(pathname, { replace: true });
      return;
    }

    if (
      !initial &&
      search.replace(/^\?/, ``) !== queryString &&
      !/roadmap\/[a-z]/.test(pathname)
    ) {
      navigate(`${pathname}?${queryString}`, { replace: true });
    }
  }, [filters.releases, filters.capabilities]);

  const setRelease = (release: string) => {
    let filteredReleases: string[];
    if (filters.releases.includes(release)) {
      filteredReleases = filters.releases.filter(rel => rel !== release);
    } else {
      filteredReleases = [...filters.releases, release];
    }

    setState(state => ({
      filters: {
        ...state.filters,
        releases: filteredReleases,
      },
      initial: false,
    }));

    scrollToTicketsReference({});
  };

  const setCapability = (capability: string) => {
    let filteredCapabilities: string[];
    if (filters.capabilities.includes(capability)) {
      filteredCapabilities = filters.capabilities.filter(
        cap => cap !== capability,
      );
    } else {
      filteredCapabilities = [...filters.capabilities, capability];
    }

    setState(state => ({
      filters: {
        ...state.filters,
        capabilities: filteredCapabilities,
      },
      initial: false,
    }));

    scrollToTicketsReference({});
  };

  const clearFilters = () => {
    setState({
      ...initialState,
      initial: false,
    });
  };

  return {
    filters,
    extractReleases,
    prepareReleases,
    setRelease,
    setCapability,
    clearFilters,
  };
};

const { Provider, Context } = createContainer(TicketsService);
export { Provider };
export default Context;
