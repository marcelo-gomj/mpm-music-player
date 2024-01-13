import { musics } from "@prisma/client";
import SearchIcon from "../../assets/search.svg?react";

import DiscIcon from "../../assets/album.svg?react";
import ArtistIcon from "../../assets/artist.svg?react"; 
import FolderIcon from "../../assets/folders.svg?react"; 

import ArrowDownIcon from "../../assets/arrowDown.svg?react";
import { groupBy, last, prop, split, toPairs, __, pipe } from "ramda";
import { FunctionComponent, useMemo, useState } from "react";
import { fieldsKeys } from "./ListComponent";


type functionGetAlbumsById = (id: string, subField?: fieldsKeys) => () => void

type SideBarCategory = {
	albums: musics[];
	getAlbumsByField: functionGetAlbumsById;
	isSelected: musics | null;
	uniqueField: fieldsKeys;
	title: string;
	hasSubCategory?: boolean;
};

type CategoryProps = musics | [string, musics[]]

function SideBarCategories({
	albums,
	getAlbumsByField,
	isSelected,
	hasSubCategory,
	uniqueField,
	title,
}: SideBarCategory) {
	// const categories = useMemo(divideSubCategoriesItems, [title]);
	const categories = useMemo(divideSubCategoriesItems, [albums]);

	const ICONS_FIELDS : Record<fieldsKeys, FunctionComponent<any>> = {
		album: DiscIcon,
		artist : ArtistIcon,
		folder : FolderIcon,
		genres : null
	}

	return (
		<div className="relative flex flex-col overflow-hidden h-full">
			<div className="pr-2">
				<div className="flex py-2 justify-between">
					<h2 className="text-large font-medium">{title}</h2>
					<SearchIcon className="w-5 h-5" />
				</div>

				<div className="hidden justify-end text-mini py-2">
					<p>Mais recentes</p>
				</div>
			</div>

			<ul className="relative h-full w-full overflow-auto bar-scroll">
				{categories.map(checkSubCategoresAndCategories)}
			</ul>
		</div>
	);

	function checkSubCategoresAndCategories(category: CategoryProps, index: number) {
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

	function divideSubCategoriesItems() {
		if (hasSubCategory) return toPairs(groupBy(prop(uniqueField), albums));

		return albums;
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

	if(!firstTitle || field === 'folder') return defaultFolder(content.folder);

	return firstTitle
}

function CategoryItem({
	Icon, category, field, isCurrentSelected, getAlbumsByField
}: CategoryItemProps) {
	const [isOpenSubCategory, setIsOpenSubCategory] = useState(false);
	const hasSubCategories = Array.isArray(category);
	const categoryId = hasSubCategories ? category[0] : category[field];
	const categotyTitle = hasSubCategories ? categoryId: defaultTitleCheck(category, field)
	const currentSelected = isCurrentSelected && isCurrentSelected[field] === categoryId;
	
	return (
		<li 
			key={categoryId}
			className="animation-[all_1s_ease]"
		>
			<div
				className="flex px-3 py-1.5 hover:bg-base-500 group items-center gap-4 rounded-md cursor-pointer"
				onClick={handleClickCategory(categoryId)}
			>
				<Icon
					className={`w-5 shrink-0 h-5 ${currentSelected ? "opacity-100" : "opacity-50"} ${hasSubCategories ? "hover:opacity-100" : ""}`}
				/>

				<div className="flex items-center justify-between w-full">
					<p className={`text-[0.9rem] line-clamp-2 ${currentSelected ? "opacity-100" : "opacity-75"}`}>
						{categotyTitle}
					</p>

					{hasSubCategories ?
						<ArrowDownIcon
							className={`w-5 h-5 ${isOpenSubCategory ? 'rotate-180' : ""}`}
							onClick={handleClickArrowDown}
						/>
						: null
					}
				</div>


			</div>

				{isOpenSubCategory && hasSubCategories ?
					<div className="py-1">
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
					className={`flex items-center gap-2 pl-8 py-1 text-[.9rem] ${ subCategoryActive ? 'opacity-100' : "opacity-50"} cursor-pointer`}
					onClick={getAlbumsByField(subcategory.album, "album")} 
					key={subcategory.album}
				>
					<DiscIcon className="w-5 h-5" />
					<p>{subcategory.album}</p>
				</div>
			)
			})
	}

	function handleClickCategory(id: string){
		return () => {
			if(!isOpenSubCategory){
				getAlbumsByField(id)();
				return;
			}

			setIsOpenSubCategory(!isOpenSubCategory)
		}
	}

	function handleClickArrowDown(){
		setIsOpenSubCategory(!isOpenSubCategory)
	}
}


export default SideBarCategories;


