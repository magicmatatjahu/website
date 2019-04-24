export interface RoadmapConfig {
  outputCapabilitiesPath: string;
  outputTicketsPath: string;
  tempPath: string;
}

const config: RoadmapConfig = {
  outputCapabilitiesPath: process.env.APP_ROADMAP_CAPABILITIES_OUTPUT || "capabilities",
  outputTicketsPath: process.env.APP_ROADMAP_TICKETS_OUTPUT || "tickets",
  tempPath: process.env.APP_ROADMAP_TEMP_DIR || "tempDir",
};

export default config;
