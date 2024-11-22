const TablePagination = ({
  pageIndex,
  pageOptions,
  canPreviousPage,
  canNextPage,
  gotoPage,
  nextPage,
  previousPage,
  pageSize,
  setPageSize,
}) => {
  return (
    <div className="flex items-center justify-between mt-4">
      <div className="text-sm text-gray-600">
        Page {pageIndex + 1} of {pageOptions.length}
      </div>
      <div>
        <button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          className="px-2 py-1 mr-2 text-gray-800 transition bg-white rounded bg-opacity-40 hover:bg-opacity-80"
        >
          {"<<"}
        </button>
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="px-2 py-1 mr-2 text-gray-800 transition bg-white rounded bg-opacity-40 hover:bg-opacity-80"
        >
          {"<"}
        </button>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="px-2 py-1 mr-2 text-gray-800 transition bg-white rounded bg-opacity-40 hover:bg-opacity-80"
        >
          {">"}
        </button>
        <button
          onClick={() => gotoPage(pageOptions.length - 1)}
          disabled={!canNextPage}
          className="px-2 py-1 text-gray-800 transition bg-white rounded bg-opacity-40 hover:bg-opacity-80"
        >
          {">>"}
        </button>
      </div>
      <select
        value={pageSize}
        onChange={(e) => setPageSize(Number(e.target.value))}
        className="p-1 text-gray-800 bg-white rounded bg-opacity-40"
      >
        {[5, 10, 20].map((size) => (
          <option key={size} value={size}>
            {size}개씩 보기
          </option>
        ))}
      </select>
    </div>
  );
};

export default TablePagination;
