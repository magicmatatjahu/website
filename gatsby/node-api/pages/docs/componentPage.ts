import { CreatePageFn } from "../../../types";
import { DOCS_ROOT_TYPE, DOCS_KYMA_ID } from "../../../constants";

export interface CreatDocsPageArgs {
  createPage: CreatePageFn;
  context: any;
  path: string;
  rootPath: string;
}

export const createComponentDocsPage = ({
  createPage,
  context: { docsType, topic },
  path,
  rootPath,
}: CreatDocsPageArgs) => {
  createPage({
    path,
  });

  if (DOCS_ROOT_TYPE === docsType && DOCS_KYMA_ID === topic) {
    createPage({
      path: rootPath,
    });
  }
};
