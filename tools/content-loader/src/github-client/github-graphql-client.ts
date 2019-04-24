import to from "await-to-js";
import { VError } from "verror";

import { CoreConfig } from "../config";

class GitHubGraphQLClient {
  private graphql: any; 
  private config: CoreConfig;

  constructor() {
    this.config = {} as CoreConfig;
  }

  withConfig = (config: CoreConfig) => {
    this.config = config;

    if (config.token) {
      this.graphql = require('@octokit/graphql').defaults({
        headers: {
          authorization: `token ${config.token}`,
        }
      })
    }
  };

  query = async (query: string, variables: any) => {
    const [err, data] = await to(this.graphql(query, variables));
    if (err) throw new VError(err, `while query to Github graphQl API`);

    return data;
  }
}

export default new GitHubGraphQLClient();