import type { Button, HeroWidgetType } from "@checkpoint/shared-types";
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";

type HeroWidgetProps = {
	data: HeroWidgetType;
};

function HeroWidget({ data }: HeroWidgetProps) {
	const window = new JSDOM("").window;
	const DOMPurify = createDOMPurify(window);

	const { headline, content, buttons, image } = data;

	// Sanitizar el HTML proveniente del CMS
	const cleanHtml = content ? DOMPurify.sanitize(content) : "";

	const getButtonColor = (buttonColor: Button["button_color"]): string => {
		switch (buttonColor) {
			case "neutral":
				return "btn-neutral";
			case "primary":
				return "btn-primary";
			case "secondary":
				return "btn-secondary";
			case "accent":
				return "btn-accent";
			case "info":
				return "btn-info";
			case "success":
				return "btn-success";
			case "warning":
				return "btn-warning";
			case "error":
				return "btn-error";
			default:
				return "btn";
		}
	}

	const getButtonStyle = (buttonStyle: Button["button_style"]): string => {
		switch (buttonStyle) {
			case "outline":
				return "btn-outline";
			case "dash":
				return "btn-dashed";
			case "soft":
				return "btn-soft";
			case "ghost":
				return "btn-ghost";
			case "link":
				return "btn-link";
			default:
				return "";
		}
	}

	const getBackgroundColor = (backgroundColor: HeroWidgetType["background_color"]): string => {
		switch (backgroundColor) {
			case "none":
				return "bg-transparent";
			case "base-100":
				return "bg-base-100 px-16 py-4";
			case "base-200":
				return "bg-base-200 px-16 py-4";
			case "base-300":
				return "bg-base-300 px-16 py-4";
			case "primary":
				return "bg-primary px-16 py-4";
			case "secondary":
				return "bg-secondary px-16 py-4";
			case "accent":
				return "bg-accent px-16 py-4";
			case "neutral":
				return "bg-neutral px-16 py-4";
			case "info":
				return "bg-info px-16 py-4";
			case "success":
				return "bg-success px-16 py-4";
			case "warning":
				return "bg-warning px-16 py-4";
			case "error":
				return "bg-error px-16 py-4";
			default:
				return "bg-transparent px-16 py-4";
		}
	}

	const getDisplayOrientation = (displayOrientation: HeroWidgetType["display_orientation"]): string => {
		switch (displayOrientation) {
			case "normal":
				return "lg:flex-row";
			case "reverse":
				return "lg:flex-row-reverse";
			default:
				return "lg:flex-row";
		}
	}

	return (
		<section className="rounded-box w-full">
			<div className={`w-full hero ${getBackgroundColor(data.background_color)}  rounded-box`}>
				<div className={`hero-content w-full flex-col ${getDisplayOrientation(data.display_orientation)} ${image?.filename_disk ? "justify-between" : "justify-center"} gap-8`}>
					<div className="max-w-5/12 flex flex-col gap-8">
						<h1 className="text-5xl font-medium">{headline}</h1>
						{/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
						<div dangerouslySetInnerHTML={{ __html: cleanHtml }} className="py-5 text-balance text-xl" />
						{buttons && buttons.length > 0 && (
							<div className="flex flex-wrap gap-4">
								{buttons.map((button, index) => (
									<a
										// biome-ignore lint/suspicious/noArrayIndexKey: Botones son estáticos del CMS
										key={index}
										href={button.href || "#"}
										className={`btn ${getButtonColor(button.button_color)} ${getButtonStyle(button.button_style)}`}
									>
										{button.label}
									</a>
								))}
							</div>
						)}
					</div>
					{image?.filename_disk && (
						<img
							src={`${import.meta.env.PUBLIC_DIRECTUS_URL}/assets/${image.filename_disk}`}
							alt={headline || "Hero image"}
							className="max-w-1/2 rounded-lg"
						/>
					)}
				</div>
			</div>
		</section>
	);
}

HeroWidget.widgetInfo = {
	name: "hero",
	isReactive: true
};

export default HeroWidget;
