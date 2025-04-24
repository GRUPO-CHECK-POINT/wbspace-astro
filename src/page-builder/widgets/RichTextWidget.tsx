import type { RichTextWidgetType } from "@checkpoint/shared-types";
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";

type RichTextWidgetProps = {
	data: RichTextWidgetType;
};


function RichTextWidget({ data }: RichTextWidgetProps) {
	const window = new JSDOM("").window;
	const DOMPurify = createDOMPurify(window);

	const cleanHtml = DOMPurify.sanitize(data.content as string);

	return (
		<section className="rich_text flex flex-col items-center gap-6">
			{data.author && (
				<>
					<div className="flex items-center gap-8 px-5 w-full">
						<div className="size-20 aspect-square shrink-0">
							{data.author?.photo?.filename_disk && (
								<img src={`${import.meta.env.PUBLIC_DIRECTUS_URL}/assets/${data.author?.photo?.filename_disk}`} alt={data.author.name} className="w-full h-full object-contain" />)}
						</div>
						<div className="flex flex-col">
							<span className="font-medium">{data.author?.name}</span>
							<span>{data.author?.role}</span>
						</div>
					</div>
					<hr className="w-full" />
				</>)}
			{data.content && (
				<>
					<div
						className="content text-balance px-10"
						// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
						dangerouslySetInnerHTML={{ __html: cleanHtml }}
					/>
					<div className="size-5 rounded-full bg-primary mt-5"/>
				</>
			)}
		</section>
	);
}
RichTextWidget.widgetInfo = {
	name: "rich_text",
	isReactive: false
};

export default RichTextWidget;
