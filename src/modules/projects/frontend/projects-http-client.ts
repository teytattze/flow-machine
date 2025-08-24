import ky from "ky";

export const projectsHttpClient = ky.create({ prefixUrl: "/api/v1/projects" });
