import to from "await-to-js";
import { VError } from "verror";
import { exec } from "child_process";

import { Destinations } from "../types";
import { CoreConfig } from "../config";

class GitClient {
  private config: CoreConfig;
  private destinations: Destinations;

  constructor() {
    this.config = {} as CoreConfig;
    this.destinations = {};
  }

  withConfig = (config: CoreConfig, destinations: Destinations) => {
    this.config = config;
    this.destinations = destinations;
  };

  clone = async (destination: string, repo: string = this.config.coreRepository, org: string = this.config.organization) => {
    const repository = `https://github.com/${org}/${
      repo
    }.git`;

    const [err] = await to(
      this.execShellCommand(`git clone "${repository}" "${this.destinations[destination]}"`),
    );

    if (err)
      throw new VError(
        err,
        `while cloning ${repository} to ${this.destinations[destination]}`,
      );
  };

  checkout = async (destination: string, branch: string) => {
    const [err] = await to(
      this.execShellCommand(
        `cd "${this.destinations[destination]}" && git checkout "${branch}"`,
      ),
    );
    if (err) throw new VError(err, `while checkout to branch: ${branch}`);
  };

  checkoutTag = async (destination: string, tag: string) => {
    const [err] = await to(this.checkout(destination, `tags/${tag}`));
    if (err) throw err;
  };

  private execShellCommand = (cmd: string) => {
    return new Promise((resolve, reject) => {
      exec(cmd, (error, stdout, stderr) => {
        error ? reject(error) : resolve(stdout ? stdout : stderr);
      });
    });
  };
}

export default new GitClient();
