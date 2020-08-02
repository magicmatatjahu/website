export interface Tickets {
  [release: string]: {
    [capability: string]: Issue[];
  };
}

export interface Milestone {
  id: string | number;
  state: "OPEN" | "CLOSED";
  title: string;
  description: string;
  dueOn: string;
  issues: Issue[];
}

export interface Repository {
  name: string;
  id: string | number;
  milestones: Milestone[];
}

export interface Capability {
  displayName: string;
  epicsLabels: string[];
  id: string;
}

export interface Issue {
  title: string;
  body: string;
  number: number;
  labels: string[];
  githubUrl: string;
  dueDate: string;
  milestone: Milestone;
  repository: Repository;
  capability: Capability;
}

export interface ReleasesIssuesData {
  [release: string]: ReleaseIssue[];
}

export interface ReleaseIssue {
  repo_id: number;
  issue_number: number;
}
