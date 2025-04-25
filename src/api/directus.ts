import { createDirectus, rest } from "@directus/sdk";
import { readItems } from "@directus/sdk";
import type { Page, PageInfoType } from "../types";

const directus = createDirectus(import.meta.env.PUBLIC_DIRECTUS_URL).with(rest());
console.log()
const baseRelationship = {
	fields: [
		"slug",
		"title",
		{
			blocks: [
				"*",
				{
					item: {
						hero_widget: ["*", "image.filename_disk"],
						rich_text: ["*", "author.*", "author.photo.filename_disk"],
						card_group: ["*", "cardgroup_cards.*", "cardgroup_cards.image.*"],
						image_block: ["*"],
						image_collection: ["*", "images.directus_files_id.filename_disk"],
						separator_block: ["*", "image.filename_disk"],
						grid_widget: ["*", "items.grid_widget_items_id.*"],
						custom_widget: ["*", "collections.item.*.*"],
						contact_form: ["*", "image.filename_disk"],
						footer: [
							"*",
							"page_info.logo_light.filename_disk",
							"page_info.logo_dark.filename_disk",
							"page_info.*",
							"page_info.favicon.filename_disk",
							"navigation_items.navigation_items_id.*",
						],
						navbar: [
							"*",
							"page_info.logo_light.filename_disk",
							"page_info.logo_dark.filename_disk",
							"page_info.*",
							"page_info.favicon.filename_disk",
							"navigation_items.navigation_items_id.*",
						],
						timeline_widget: [
							"*",
							"items.timeline_items_id.*",
							"background_image.filename_disk",
						],
					},
				},
			],
		},
	],
};

export const getPages = async (organizationId: string) => {
	try {
		const data = await directus.request<Page[]>(
			readItems("Pages", {
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
		const data = await directus.request<Page[]>(
			readItems("Pages", {
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

export const getSiteInfo = async (organizationId:string) => {
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
