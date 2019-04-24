import to from "await-to-js";

import GitHubClient from "../github-client/github-client";

class CapabilitiesFetcher {
  async get() {
    const [err, tags] = await to(GitHubClient.getTags());
    if (err) throw err;

    return tags;
  }
}

export default new CapabilitiesFetcher();
