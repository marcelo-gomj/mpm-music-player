import { musics } from "@prisma/client";
import SearchIcon from "../../assets/search.svg?react";

import DiscIcon from "../../assets/album.svg?react";
import ArtistIcon from "../../assets/artist.svg?react";
import FolderIcon from "../../assets/folders.svg?react";

import ArrowDownIcon from "../../assets/arrowDown.svg?react";
import { last, split, __ } from "ramda";
import { FunctionComponent, useState } from "react";
import { CategoriesAlbumsType, fieldsKeys } from "./ListComponent";


type functionGetAlbumsById = (id: string, subField?: fieldsKeys) => () => void

type SideBarCategory = {
	categories: CategoriesAlbumsType;
	getAlbumsByField: functionGetAlbumsById;
	isSelected: musics | null;
	uniqueField: fieldsKeys;
	title: string;
	hasSubCategory?: boolean;
};

function SideBarCategories({
	categories,
	getAlbumsByField,
	isSelected,
	uniqueField,
	title,
}: SideBarCategory) {

	const ICONS_FIELDS: Record<fieldsKeys, FunctionComponent<any>> = {
		album: DiscIcon,
		artist: ArtistIcon,
		folder: FolderIcon,
		genres: null
	}

	return (
		<div className="relative flex flex-col overflow-hidden h-full">
			<div className="">
				<div className="flex py-2 justify-between">
					<h2 className="text-large font-medium">{title}</h2>
					<SearchIcon className="w-5 h-5" />
				</div>

				<div className="hidden justify-end text-mini py-2">
					<p>Mais recentes</p>
				</div>
			</div>

			<ul className="relative h-full w-full text-mini overflow-auto bar-scroll pr-2">
				{categories.map(checkSubCategoresAndCategories)}
			</ul>
		</div>
	);

	function checkSubCategoresAndCategories(category: CategoriesAlbumsType[0], index: number) {
		return (
			<CategoryItem
				category={category}
				getAlbumsByField={getAlbumsByField}
				field={uniqueField}
				isCurrentSelected={isSelected}
				Icon={ICONS_FIELDS[uniqueField]}
			/>
		)
	}
}


type CategoryItemProps = {
	category: musics | [string, musics[]],
	isCurrentSelected: musics,
	field: fieldsKeys,
	getAlbumsByField: functionGetAlbumsById
	Icon: FunctionComponent<any>,
}

function defaultFolder(folder: string) {
	return last(split("\\", folder));
}

function defaultTitleCheck(content: musics, field: fieldsKeys) {
	const firstTitle = content[field];

	if (!firstTitle || field === 'folder') return defaultFolder(content.folder);

	return firstTitle
}

function CategoryItem({
	Icon, category, field, isCurrentSelected, getAlbumsByField
}: CategoryItemProps) {
	// const [isOpenSubCategory, setIsOpenSubCategory] = useState(false);
	const hasSubCategories = Array.isArray(category);
	const categoryId = hasSubCategories ? category[0] : category[field];
	const categotyTitle = hasSubCategories ? categoryId : defaultTitleCheck(category, field)
	const currentSelected = isCurrentSelected && isCurrentSelected[field] === categoryId;
	const categoryOpened = hasSubCategories ? isCurrentSelected?.artist === category[0] : false;

	return (
		<li
			key={categotyTitle}
			className=""
		>
			<div
				key={1}
				className="flex relative px-3 py-1.5 hover:bg-base-500 group items-center gap-4 rounded-md cursor-pointer"
				onClick={handleClickCategory(categoryId)}
			>
				<Icon
					className={`w-5 shrink-0 h-5 ${currentSelected ? "opacity-100" : "opacity-50"} ${hasSubCategories ? "hover:opacity-100" : ""}`}
				/>

				<div className="flex items-center justify-between w-full">
					<p
						title={categotyTitle}
						className={`text-[0.85rem] line-clamp-1 ${currentSelected ? "opacity-100" : "opacity-60"}`}
					>
						{categotyTitle}
					</p>

					{hasSubCategories ?
						<div
							// onClick={handleClickArrowDown}
							className="absolute flex items-center justify-center w-10 right-0 top-0 h-full"
						>
							<ArrowDownIcon
								className={`w-5 h-5 ${categoryOpened ? 'rotate-180' : ""}`}
							/>
						</div>
						: null
					}
				</div>
			</div>

			{hasSubCategories && categoryOpened ?
				<div key={2} className="py-1 my-0 mb-5 ml-5 rounded-r-md border-l-2 border-base-500">
					{mapSubcategories(category[1])}
				</div>
				:
				null
			}
		</li >
	);

	function mapSubcategories(subcategories: musics[]) {
		return subcategories.map(
			subcategory => {
				const subCategoryActive = isCurrentSelected?.album === subcategory.album;

				return (
					<div
						className={`flex group items-center hover:opacity-100 gap-2 pl-3 py-1 text-[.9rem] ${subCategoryActive ? 'opacity-100' : "opacity-50"} cursor-pointer`}
						onClick={getAlbumsByField(subcategory.album, "album")}
						key={subcategory.id}
					>
						<DiscIcon className="w-5 h-5 shrink-0" />
						<p className="">{subcategory.album}</p>
					</div>
				)
			})
	}

	function handleClickCategory(id: string) {
		return () => {
			// if (!isOpenSubCategory) {
			getAlbumsByField(id)();
			// 	return;
			// }

			// setIsOpenSubCategory(!isOpenSubCategory)
		}
	}

	// function handleClickArrowDown() {
	// 	setIsOpenSubCategory(!isOpenSubCategory)
	// }
}


export default SideBarCategories;


