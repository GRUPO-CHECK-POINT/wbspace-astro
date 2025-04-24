import { getSiteInfo } from "./directus";
import type { PageInfoType } from "../types";

let cachedSiteInfo: PageInfoType | null = null;

export async function getCachedSiteInfo(organizationId: string) {
	if (cachedSiteInfo) return cachedSiteInfo;
	const info = await getSiteInfo(organizationId);
	cachedSiteInfo = info;
	return info;
}
