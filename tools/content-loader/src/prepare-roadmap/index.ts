import { resolve } from "path";
import { mkdirs } from "fs-extra";
import to from "await-to-js";
import { VError } from "verror";

import GitClient from "../github-client/git-client";

import { CoreConfig } from "../config";

const prepareRoadmapContent = async (coreConfig: CoreConfig) => {
  let err: Error | null;

  console.log(`Cloning ${coreConfig.organization}/${coreConfig.communityRepository}`);
  [err] = await to(GitClient.clone(coreConfig.communityRepository));
  if (err)
    throw new VError(
      err,
      `while cloning ${coreConfig.organization}/${coreConfig.communityRepository}`,
    );
}

export default prepareRoadmapContent;