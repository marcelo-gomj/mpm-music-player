import { useState } from "react"
import { musics, Prisma } from "@prisma/client";
import { includes, map, toPairs } from "ramda";

export type OrderProps = Prisma.musicsOrderByWithAggregationInput | Prisma.musicsOrderByWithRelationInput[];


type HeaderLibraryProps = {
  title: string,
  mainField: keyof musics,
  handleOrderByConfig : (orderBy: OrderProps ) => void
}

type FiltersKey = (
  "A-Z" | "Z-A" | "MOST_POPULAR" | "LEAST_PLAYED" 
  | "MOST_PLAYED" | "BETTER_REATED" | "ADDED_AT_ASC" 
  | "ADDED_AT_DESC" | "YEAR_DESC" | "YEAR_ASC" 
);
type OrderByProps = {
   [key in FiltersKey ] : ([string, OrderProps] | null ) 
}


function HeaderLibrary({ title, mainField, handleOrderByConfig } : HeaderLibraryProps ){
  const HEADERS_FILTERS :  OrderByProps = {
    "A-Z" : [ "Ordem de A-Z", { [mainField] : "asc" } ],
    "Z-A" : [ "Ordem de Z-A", { [mainField] : "desc" } ],
    "MOST_POPULAR" : ["Mais Populares", [{ played : "desc" }, { reated : "desc" }]],
    "LEAST_PLAYED" : ["Menos reproduzido", { played: "asc"}],
    "MOST_PLAYED" : ["Mais reproduzido", { played: "desc" }],
    "BETTER_REATED": ["Melhor classificado", { reated: "desc" }],
    "ADDED_AT_ASC" : ["Mais recentes", { added_at: "asc" }],
    "ADDED_AT_DESC" : ["Mais antigos", { added_at : "desc" }],
    "YEAR_ASC" : checkIsPublishedItem(["Anos recentes", { year: "asc"}]),
    "YEAR_DESC" : checkIsPublishedItem(["Anos antigos", { year : "desc"}]),
  }

  const [currentFilters, setCurrentFilters] = useState<FiltersKey>("A-Z");
  const [isOpenFilters, setIsOpenFilters] = useState(false);

  return (
    <header
      className="flex justify-between h-[5rem] px-4  border-[1px]"
    >
      <h1
        className="text-[1.5rem] font-medium"
      >
        {title}
      </h1>

      <div
        className="relative left-0 top-0 border-[1px] w-[35%] text-[0.95rem] z-[800] "
      >
        <div 
          onClick={handleClickOpenFilters}
          className="py-1.5 cursor-pointer text-center w-full border-2 rounded-full border-base-600 hover:border-base-900"
        >
          {HEADERS_FILTERS[currentFilters][0]}
        </div>

        <div
          className={`absolute ${ isOpenFilters ? 'flex' : 'hidden' } flex-col top-0 py-2 left-0 w-full rounded-lg z-[900] bg-base-500`}
        >
          {
            map(([key, [ filterTitle, filterConfig ]]) => {

              const isCurrentFilter = key === currentFilters;

              return (
                <div  
                  className="relative py-2 text-center hover:bg-base-800 w-full cursor-pointer"
                  onClick={handleClickFilter( key, filterConfig )}
                  key={key}
                >
                  { filterTitle }
                  { isCurrentFilter ? 
                    <div className="absolute left-1 top-[50%] h-6 w-1.5 rounded-2xl translate-y-[-50%] bg-white"></div> 
                    : null 
                  }
                </div>
              )
            }, toPairs(HEADERS_FILTERS))
          }
        </div>
      </div>
    </header>
  )

  function checkIsPublishedItem(fieldFildter : [string, OrderProps] ){
    return mainField === "artist" ? null : fieldFildter;
  }

  function handleClickOpenFilters(){
    setIsOpenFilters(true)
  }

  function handleClickFilter(key: FiltersKey, filter: OrderProps ){
    return () => {
      setCurrentFilters(key);
      setIsOpenFilters(false);
      handleOrderByConfig(filter);
    }
  }
}

export default HeaderLibrary;
