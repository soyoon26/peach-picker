import { useTable, usePagination } from "react-table";
import TablePagination from "./TablePagination";
import Link from "next/link";

const TableView = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state: { pageIndex, pageSize },
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
  } = useTable({ columns, data }, usePagination);

  return (
    <div className="w-4/5 p-6 mt-8 bg-white rounded-lg shadow-lg bg-opacity-30 backdrop-blur-md dark:bg-gray-800">
      <table
        {...getTableProps()}
        className="w-full text-gray-800 dark:text-gray-100"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              key={headerGroup.id}
              {...headerGroup.getHeaderGroupProps()}
              className="bg-gray-100"
            >
              {headerGroup.headers.map((column) => (
                <th
                  key={column.id}
                  {...column.getHeaderProps()}
                  className="px-4 py-2 text-center"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr
                key={row.id}
                {...row.getRowProps()}
                className="hover:bg-rose-200"
              >
                {row.cells.map((cell) => (
                  <td
                    key={cell.id}
                    {...cell.getCellProps()}
                    className="px-4 py-2 text-center"
                  >
                    {cell.column.id === "title" ? (
                      <Link
                        href={{
                          pathname: "/drawings/[drawId]",
                          query: {
                            drawId: row.original.id,
                            drawingType: row.original.drawingType,
                            viewType: "table",
                          },
                        }}
                        as={`/drawings/${row.original.id}`}
                        className="text-center hover:underline"
                      >
                        {cell.render("Cell")}
                      </Link>
                    ) : (
                      cell.render("Cell")
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <TablePagination
        pageIndex={pageIndex}
        pageOptions={pageOptions}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        gotoPage={gotoPage}
        nextPage={nextPage}
        previousPage={previousPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </div>
  );
};

export default TableView;
