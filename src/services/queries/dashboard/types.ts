export type OptionsPaginate<TFilters> = {
   filterKey: string;
   initialFilters?: TFilters;
   isKeepPrevious?: boolean;
}