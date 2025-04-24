import type { ImageBlockType } from "@checkpoint/shared-types";

type ImageBlock = {
	data: ImageBlockType;
};

function ImageBlock({ data }: ImageBlock) {

	const objectFit = (() => {
		switch (data.object_fit) {
			case "cover":
				return "object-cover";
			case "contain":
				return "object-contain"
			default:
				return "object-cover";
		}
	})();

	const aspectRatio = (() => {
		switch (data.aspect_ratio) {
			case "16:9":
				return "aspect-video max-w-3xl";
			case "1:1":
				return "aspect-square max-w-sm"
			default:
				return "aspect-video max-w-3xl";
		}
	})();

	return (
		<section className="bg-base-200 w-full px-30 items-center py-12 image_block">
			<div className="flex flex-col w-full items-center gap-5 image_block_content">
				<div className={`w-full bg-base-100 h-full rounded-lg shadow-xl ${aspectRatio}`}>
					<img
						src={`${import.meta.env.PUBLIC_DIRECTUS_URL}/assets/${data.image}`}
						alt=""
						className={`w-full h-full ${objectFit}`}
					/>
				</div>
				{data.caption ? (
					<span className=" italic text-center text-balance image_block_caption">{data.caption}</span>
				) : null}
			</div>
		</section>
	);
}


export default ImageBlock;
