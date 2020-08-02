import to from "await-to-js";
import { VError } from "verror";

import coreConfig from "../config";
import roadmapConfig from "./config";

import GitHubGraphQLClient from "../github-client/github-graphql-client";

import { Repository, Milestone } from "./types";

export class TicketsFetcher {
  queryRepositories = async (): Promise<Repository[]> => {
    const query = `
      query repositories($organization: String!, $firstRepositories: Int!) {
        organization(login: $organization) {
          repositories(first: $firstRepositories) {
            edges {
              node {
                name
                databaseId
              }
            }
          }
        }
      }
    `;

    const options = {
      organization: coreConfig.organization,
      firstRepositories: 100,
    };

    const [err, data] = await to<any>(
      GitHubGraphQLClient.query(query, options),
    );
    if (err) {
      throw new VError(err, `while query repositories`);
    }

    const repositories: Repository[] = data.organization.repositories.edges.map(
      repo => {
        const result: Repository = {
          name: repo.node.name,
          id: repo.node.databaseId,
          milestones: [],
        };

        return result;
      },
    );

    return repositories;
  };

  queryRepoMilestones = async (
    repository: Repository,
  ): Promise<Milestone[]> => {
    const query = `
      query epics(
        $organization: String!, 
        $repositoryName: String!, 
        $firstMilestones: Int!, 
        $labels: [String!],
        $firstIssues: Int!, 
        $firstLabels: Int!, 
        $issuesStates: [IssueState!]
      ) {
        organization(login: $organization) {
          repository(name: $repositoryName) {
            name
            milestones(first: $firstMilestones) {
              edges {
                node {
                  id
                  state
                  title
                  description
                  dueOn
                  issues(first: $firstIssues, labels: $labels, states: $issuesStates) {
                    edges {
                      node {
                        title
                        body
                        url
                        number
                        labels(first: $firstLabels) {
                          edges {
                            node {
                              name
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const firstMilestones = 10;
    const firstLabels = 7;
    const firstIssues = Math.floor(500 / firstLabels);

    const options = {
      organization: coreConfig.organization,
      labels: roadmapConfig.labels,
      firstMilestones,
      firstIssues,
      firstLabels,
      issuesStates: ["OPEN"],
    };

    const [err, data] = await to<any>(
      GitHubGraphQLClient.query(query, {
        ...options,
        repositoryName: repository.name,
      }),
    );
    if (err) {
      throw new VError(
        err,
        `while query epics for repository: ${repository.name}`,
      );
    }

    // const issues: Issue[] = data.organization.repository.issues.edges.map(
    //   issue => {
    //     const node = issue.node;
    //     const labels: string[] = node.labels.edges
    //       .map(label => label.node.name)
    //       .filter((label: string) => !roadmapConfig.labels.includes(label));

    //     return {
    //       ...node,
    //       githubUrl: node.url,
    //       labels,
    //       repository: {
    //         ...repository,
    //         issues: [],
    //       },
    //     } as Issue;
    //   },
    // );

    const issues: Issue[] = data.organization.repository.issues.edges.map(
      issue => {
        const node = issue.node;
        const labels: string[] = node.labels.edges
          .map(label => label.node.name)
          .filter((label: string) => !roadmapConfig.labels.includes(label));

        return {
          ...node,
          githubUrl: node.url,
          labels,
          repository: {
            ...repository,
            issues: [],
          },
        } as Issue;
      },
    );

    return issues;
  };

  queryMilestones = async (
    repositories: Repository[],
  ): Promise<Repository[]> => {
    const result: Repository[] = [];
    for (const repository of repositories) {
      const [err, milestones] = await to<Milestone[]>(
        this.queryRepoMilestones(repository),
      );
      if (err) {
        throw err;
      }

      result.push({
        ...repository,
        milestones,
      });
    }

    return result;
  };
}

export default new TicketsFetcher();
