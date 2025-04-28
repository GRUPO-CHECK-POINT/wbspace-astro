import { createDirectus, rest } from "@directus/sdk";
import { readItems } from "@directus/sdk";
import type { Page, PageInfoType } from "../types";

const directus = createDirectus(import.meta.env.PUBLIC_DIRECTUS_URL).with(
	rest(),
);
console.log();
const baseRelationship = {
	fields: ["slug", "title"],
};

export const getPages = async (organizationId: string) => {
	try {
		const data = await directus.request<Page[]>(
			readItems("pages", {
				filter: {
					organization_id: {
						_eq: organizationId,
					},
				},
				...baseRelationship,
			}),
		);
		return data;
	} catch (error) {
		console.error("Error fetching pages:", error);
		return null;
	}
};

export const getPage = async (organizationId: string, slug: string) => {
	try {
		if (!organizationId) {
			throw new Error("Page not found");
		}
		const data = await directus.request<Page[]>(
			readItems("pages", {
				filter: {
					slug: { _eq: slug },
					organization_id: { _eq: organizationId },
				},
				...baseRelationship,
			}),
		);

		if (!data || data.length === 0) {
			throw new Error("Page not found");
		}
		return data[0];
	} catch (error) {
		console.error("Error fetching page:", error);
		return null;
	}
};

export const getSiteInfo = async (organizationId: string) => {
	const result = await directus.request<PageInfoType[]>(
		readItems("page_info", {
			filter: {
				organization_id: {
					_eq: organizationId,
				},
			},
			fields: [
				"*",
				{
					favicon: ["filename_disk"],
					logo_dark: ["filename_disk"],
					logo_light: ["filename_disk"],
				},
			],
		}),
	);

	if (!result || result.length === 0) {
		throw new Error("Error Getting Site Info");
	}
	return result[0];
};
