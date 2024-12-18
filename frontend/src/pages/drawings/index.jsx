import React, { useEffect, useState } from "react";
import { usePagination, useTable } from "react-table";
import useDrawingStore from "@/store/drawingStore";
import GridView from "@/components/list/GridView";
import SortSelector from "@/components/list/SortSelector";
import ViewSelector from "@/components/list/ViewSelector";
import Link from "next/link";
import { useRouter } from "next/router";
import DarkModeToggle from "@/components/button/DarkModeToggle";
import Search from "@/components/list/Search";
import darkModeStore from "@/store/darkModeStore";

export default function Index() {
  const router = useRouter();
  const { darkMode } = darkModeStore();
  const { data, fetchData } = useDrawingStore();
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("title");
  const [sortOrder, setSortOrder] = useState("등록일순");
  const [viewType, setViewType] = useState(router.query.viewType || "grid");

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 1 * 60 * 1000);

    let sortedDrawings = data.filter(
      (item) => new Date(item.drawingAt) > fiveMinutesAgo
    );

    if (sortOrder === "등록일순") {
      sortedDrawings = sortedDrawings.sort((a, b) => b.id - a.id);
    } else if (sortOrder === "추첨일시순") {
      sortedDrawings = sortedDrawings.sort(
        (a, b) => new Date(a.drawingAt) - new Date(b.drawingAt)
      );
    } else if (sortOrder === "조회수순") {
      sortedDrawings = sortedDrawings.sort((a, b) => b.viewCount - a.viewCount);
    }

    if (searchTerm.trim()) {
      sortedDrawings = sortedDrawings.filter((item) =>
        selectedFilter === "title"
          ? item.title.toLowerCase().includes(searchTerm.toLowerCase())
          : item.organizer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(sortedDrawings);
  }, [data, sortOrder, searchTerm, selectedFilter]);

  const handleSearch = (term, filter) => {
    setSearchTerm(term);
    setSelectedFilter(filter);
  };

  const columns = React.useMemo(
    () => [
      {
        accessor: "id",
        Header: (
          <div className="text-center text-gray-800 dark:text-gray-100">NO</div>
        ),
        Cell: ({ value }) => <div>{value}</div>,
      },
      {
        accessor: "title",
        Header: (
          <div className="text-center text-gray-800 dark:text-gray-100">
            제목
          </div>
        ),
        Cell: ({ value, row }) => (
          <Link
            href={{
              pathname: "/drawings/[drawId]",
              query: {
                drawId: row.original.id,
                from: "drawings",
                viewType,
              },
            }}
            passHref
          >
            <div className="font-bold text-gray-900 hover:underline dark:text-gray-200">
              {value}
            </div>
          </Link>
        ),
      },
      {
        accessor: "drawingAt",
        Header: (
          <div className="text-center text-gray-800 dark:text-gray-100">
            추첨 일시
          </div>
        ),
        Cell: ({ value }) => (
          <div>
            {new Date(value).toLocaleString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </div>
        ),
      },
      {
        accessor: "drawingType",
        Header: (
          <div className="text-center text-gray-800 dark:text-gray-100">
            추첨 방법
          </div>
        ),
        Cell: ({ value }) => <div>{value}</div>,
      },
      {
        accessor: "winner",
        Header: (
          <div className="text-center text-gray-800 dark:text-gray-100">
            당첨자 수
          </div>
        ),
        Cell: ({ value }) => <div>{value}명</div>,
      },

      {
        accessor: "organizer",
        Header: (
          <div className="text-center text-gray-800 dark:text-gray-100">
            주최자
          </div>
        ),
        Cell: ({ value }) => <div>{value}</div>,
      },
      {
        accessor: "viewCount",
        Header: (
          <div className="text-center text-gray-800 dark:text-gray-100">
            조회
          </div>
        ),
        Cell: ({ value }) => <div>{value}</div>,
      },
    ],
    [viewType]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable({ columns, data: filteredData }, usePagination);

  return (
    <div
      className={`center1 min-h-screen ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="flex w-full mt-10 mb-2 center1">
        <Search onSearch={handleSearch} />
      </div>

      <div className="flex justify-end w-4/5 gap-2 px-16 mt-2">
        <SortSelector
          sortOrder={sortOrder}
          handleSortChange={(e) => setSortOrder(e.target.value)}
        />
        <ViewSelector viewType={viewType} handleViewChange={setViewType} />
        <DarkModeToggle />
      </div>
      {filteredData.length === 0 ? (
        <div className="w-4/5 h-32 mt-20 text-xl font-bold text-gray-600 bg-gray-100 rounded-md center2 dark:text-white dark:bg-gray-500">
          진행중인 이벤트가 없습니다.
        </div>
      ) : viewType === "grid" ? (
        <GridView
          data={filteredData}
          showOrganizer={true}
          from="drawings"
          category="실시간 추첨 및 추첨 예정"
        />
      ) : (
        <div
          className={`w-4/5 p-6 mt-8 rounded-lg shadow-lg bg-opacity-30 backdrop-blur-md ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="text-xl font-bold text-gray-800 dark:text-gray-100">
              실시간 추첨 및 추첨 예정
            </div>
          </div>

          <table
            {...getTableProps()}
            className="w-full text-gray-800 dark:text-gray-100"
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  {...headerGroup.getHeaderGroupProps()}
                  className="bg-white border-t-2 border-b-2 border-black dark:bg-gray-700 bg-opacity-40 dark:bg-opacity-60"
                >
                  {headerGroup.headers.map((column) => (
                    <th
                      key={column.id}
                      {...column.getHeaderProps()}
                      className="px-4 py-2 text-left"
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, rowIndex) => {
                prepareRow(row);
                return (
                  <tr
                    key={row.id}
                    {...row.getRowProps()}
                    className="transition bg-white dark:bg-gray-800 bg-opacity-60 hover:bg-rose-50 dark:hover:bg-rose-400 hover:shadow-lg hover:translate-y-[-2px] hover:scale-105"
                  >
                    {row.cells.map((cell) => (
                      <td
                        key={cell.id}
                        {...cell.getCellProps()}
                        className="px-4 py-2 text-center text-gray-800 dark:text-gray-100"
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Page {pageIndex + 1} of {pageOptions.length}
            </div>
            <div>
              <button
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
                className="px-2 py-1 mr-2 text-gray-800 transition bg-white rounded dark:text-gray-300 dark:bg-gray-700 bg-opacity-40 hover:bg-opacity-80"
              >
                {"<<"}
              </button>
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                className="px-2 py-1 mr-2 text-gray-800 transition bg-white rounded dark:text-gray-300 dark:bg-gray-700 bg-opacity-40 hover:bg-opacity-80"
              >
                {"<"}
              </button>
              <button
                onClick={() => nextPage()}
                disabled={!canNextPage}
                className="px-2 py-1 mr-2 text-gray-800 transition bg-white rounded dark:text-gray-300 dark:bg-gray-700 bg-opacity-40 hover:bg-opacity-80"
              >
                {">"}
              </button>
              <button
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
                className="px-2 py-1 text-gray-800 transition bg-white rounded dark:text-gray-300 dark:bg-gray-700 bg-opacity-40 hover:bg-opacity-80"
              >
                {">>"}
              </button>
            </div>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="p-1 text-gray-800 bg-white rounded dark:text-gray-300 dark:bg-gray-700 bg-opacity-40"
            >
              {[5, 10, 20].map((size) => (
                <option key={size} value={size}>
                  {size}개씩 보기
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
