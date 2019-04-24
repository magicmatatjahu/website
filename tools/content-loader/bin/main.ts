import to from "await-to-js";
import { VError } from "verror";

import config from "../src/config";
import docsConfig from "../src/prepare-docs/config";
import roadmapConfig from "../src/prepare-roadmap/config";

import GitClient from "../src/github-client/git-client";
import GitHubClient from "../src/github-client/github-client";
import GitHubGraphQLClient from "../src/github-client/github-graphql-client";

import prepareDocs from "../src/prepare-docs";
import prepareRoadmap from "../src/prepare-roadmap";

const setConfigs = () => {
  GitClient.withConfig(config, {
    docs: docsConfig.tempPath,
    roadmap: roadmapConfig.tempPath,
  });
  GitHubClient.withConfig(config);
  GitHubGraphQLClient.withConfig(config);
};

const prepareDocsFn = async () => {
  let [err] = await to(prepareDocs(config));
  if (err) throw new VError(err, "while preparing documentation");
}

const prepareRoadmapFn = async () => {
  let [err] = await to(prepareRoadmap(config));
  if (err) throw new VError(err, "while preparing roadmap content");
}

const main = async () => {
  setConfigs();

  let err: Error | null;
  [err] = await to(prepareDocsFn());
  if (err) err;

  [err] = await to(prepareRoadmapFn());
  if (err) err;
};

(async () => {
  const [err] = await to(main());
  if (err) {
    console.error(err);
    process.exit(1);
  }
})();
