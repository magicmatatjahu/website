export interface CoreConfig {
  token: string | null;
  organization: string;
  coreRepository: string;
  communityRepository: string;
}

const config: CoreConfig = {
  token: process.env.APP_TOKEN || null,
  organization: process.env.APP_ORGANIZATION || "kyma-project",
  coreRepository: process.env.APP_CORE_REPOSITORY || "kyma",
  communityRepository: process.env.APP_COMMUNITY_REPOSITORY || "community",
};

export default config;
