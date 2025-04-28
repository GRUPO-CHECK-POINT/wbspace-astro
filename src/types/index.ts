export type Block = {
	id: string;
	Pages_id: string;
	sort: number;
	collection: string;
	item: WidgetType;
};

export type Page = {
	slug: string;
	title: string;
	blocks: Block[];
};

export type Button = {
	label: string;
	href: string;
	button_color:
		| "base"
		| "primary"
		| "secondary"
		| "accent"
		| "neutral"
		| "info"
		| "success"
		| "warning"
		| "error";
	button_style: "outline" | "dash" | "soft" | "ghost" | "link";
};
export type WidgetBase = {
	id: string;
	headline: string;
	content?: string;
};

export type HeroWidgetType = WidgetBase & {
	buttons: Button[] | null;
	image: {
		filename_disk: string;
	} | null;
	background_color:
		| "none"
		| "base-100"
		| "base-200"
		| "base-300"
		| "primary"
		| "secondary"
		| "accent"
		| "neutral"
		| "info"
		| "success"
		| "warning"
		| "error";
	display_orientation: "normal" | "reverse";
};


export type ImageBlockType = {
	id: string;
	image: string;
	caption: string | null;
	aspect_ratio: "16:9" | "1:1";
	object_fit: "cover" | "contain";
};

export type ImageCollectionType = {
	id: string;
	title: string | null;
	justify_content: "center" | "around" | "between";
	gray_scale: boolean;
	images: {
		directus_files_id: {
			filename_disk: string;
		};
	}[];
};

export type GridWidgetType = {
	id: string;
	title: string | null;
	subtitle: string | null;
	items: GridWidgetItemType[];
	style: "1" | "2";
};

export type GridWidgetItemType = {
	grid_widget_items_id: {
		title: string | null;
		sort: number | null;
		content: string | null;
		href: string | null;
	};
};

export type CardGroupType = WidgetBase & {
	cardgroup_cards: {
		headline: string | null;
		link: string | null;
		content: string | null;
		card_style: "none" | "1" | "2" | "3" | "4" | "5";
		image: {
			filename_disk: string;
		} | null;
	}[];
};


export type RichTextWidgetType = Pick<WidgetBase, "id" | "content"> & {
	author: {
		name: string;
		role: string;
		photo: {
			filename_disk: string;
		} | null;
	} | null;
};

export type CustomWidgetType<T> = {
	id: string;
	info: string | null;
	name: string;
	collections: { item: T }[] | null;
};

export type FooterType = {
	id: string;
	navigation_items: {
		navigation_items_id: {
			id: string;
			sort: number | null;
			slug: string;
			text: string;
			highlighted: boolean | null;
		};
	}[];
	page_info: PageInfoType;
};

export type NavbarType = {
	id: string;
	navigation_items: {
		navigation_items_id: {
			id: string;
			sort: number | null;
			slug: string;
			text: string;
			highlighted: boolean | null;
		};
	}[];
	page_info: PageInfoType;
};

export type TimelineWidgetType = {
	id: string;
	title: string;
	subtitle: string | null;
	items: TimelineItemType[];
	background_image: {
		filename_disk: string;
	} | null;
};

export type TimelineItemType = {
	timeline_items_id: {
		id: string;
		year: string | null;
		title: string;
		subtitle: string | null;
	};
};

export type SeparatorWidgetType = HeroWidgetType & {
	color_schema:
		| "none"
		| "base"
		| "primary"
		| "secondary"
		| "accent"
		| "neutral"
		| "info"
		| "success"
		| "warning"
		| "error";
	display_orientation: "normal" | "reverse";
	highlight_content: "image" | "text" | "none";
	highlighted_text: string | null;
};


export type PageInfoType = {
	id: string;
	logo_light: {
		filename_disk: string;
	} | null;
	logo_dark: {
		filename_disk: string;
	} | null;
	favicon: {
		filename_disk: string;
	} | null;
	primary_color: string | null;
	secondary_color: string | null;
	email: string | null;
	contact_phone: string | null;
	organization_id: string;
	contact_address: string | null;
	site_title: string;
};

export type WidgetType =
	| HeroWidgetType
	| RichTextWidgetType
	| ImageBlockType
	| ImageCollectionType
	| CardGroupType
    | NavbarType
	| FooterType
	| TimelineWidgetType
	| GridWidgetType;
