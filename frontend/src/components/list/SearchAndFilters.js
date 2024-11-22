import SortSelector from "@/components/list/SortSelector";
import ViewSelector from "@/components/list/ViewSelector";
import DarkModeToggle from "@/components/button/DarkModeToggle";
import SearchComponent from "@/components/list/Search";

const SearchAndFilters = ({
  sortOrder,
  handleSortChange,
  viewType,
  setViewType,
  onSearch,
}) => {
  return (
    <div className="w-full px-2">
      <div className="mb-3 center1">
        <SearchComponent onSearch={onSearch} />
      </div>
      <div className="flex justify-end gap-2 mr-44">
        <SortSelector
          sortOrder={sortOrder}
          handleSortChange={handleSortChange}
        />
        <ViewSelector viewType={viewType} handleViewChange={setViewType} />
        <DarkModeToggle />
      </div>
    </div>
  );
};

export default SearchAndFilters;
