import React from "react";
import { Content, Renderers } from "@kyma-project/documentation-component";
import { StickyContainer, Sticky } from "react-sticky";

import Grid from "@styled/Grid";
import { DocsNavigation, DocsManifest } from "@components/docs/types";

import {
  Navigation,
  linkSerializer,
  activeLinkChecker,
} from "../render-engines/markdown/navigation";
import { HeadersNavigation } from "../render-engines/markdown/headers-toc";
import { CommunityLayoutWrapper } from "./styled";
import { MarkdownWrapper } from "../styled";

export interface CommunityLayoutProps {
  renderers: Renderers;
  navigation: DocsNavigation;
  manifest: DocsManifest;
}

export const CommunityLayout: React.FunctionComponent<CommunityLayoutProps> = ({
  renderers,
  navigation,
  manifest,
}) => {
  const linkFn: linkSerializer = ({ group, items, id }) =>
    `/community/${items.length > 1 ? `${group}/` : ""}${id}`;
  const activeLinkFn: activeLinkChecker = ({ group, items, id, lastItem }) => {
    if (lastItem === "community" && group === "contributing") {
      return true;
    }
    return lastItem === id;
  };

  return (
    <CommunityLayoutWrapper>
      <MarkdownWrapper className="custom-markdown-styling">
        <Grid.Container className="grid-container" padding="0">
          <StickyContainer>
            <Grid.Row>
              <Grid.Unit
                df={2}
                sm={0}
                className="grid-unit-navigation"
                withoutPadding={true}
              >
                <Sticky>
                  {({ style }: any) => (
                    <div style={{ ...style, zIndex: 200 }}>
                      <Navigation
                        navigation={navigation}
                        linkFn={linkFn}
                        activeLinkFn={activeLinkFn}
                      />
                    </div>
                  )}
                </Sticky>
              </Grid.Unit>
              <Grid.Unit
                df={8}
                sm={12}
                className="grid-unit-content"
                withoutPadding={true}
              >
                <Content renderers={renderers} />
              </Grid.Unit>
              {/* <Grid.Unit
                df={2}
                sm={0}
                className="grid-unit-navigation"
                withoutPadding={true}
              >
                <Sticky>
                  {({ style }: any) => (
                    <div style={{ ...style, zIndex: 200 }}>
                      <HeadersNavigation />
                    </div>
                  )}
                </Sticky>
              </Grid.Unit> */}
            </Grid.Row>
          </StickyContainer>
        </Grid.Container>
      </MarkdownWrapper>
    </CommunityLayoutWrapper>
  );
};
