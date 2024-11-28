import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useDrawingStore from "@/store/drawingStore";
import darkModeStore from "@/store/darkModeStore";
import GridView from "@/components/list/GridView";
import TableView from "@/components/list/TableView";
import SearchAndFilters from "@/components/list/SearchAndFilters";

export default function Index() {
  const router = useRouter();
  const { viewType: initialViewType } = router.query;
  const { data, fetchData } = useDrawingStore();
  const [filteredData, setFilteredData] = useState([]);
  const [sortOrder, setSortOrder] = useState("등록일순");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewType, setViewType] = useState(initialViewType || "table");
  const [selectedFilter, setSelectedFilter] = useState("title");
  const { darkMode } = darkModeStore();

  const columns = [
    {
      Header: "번호",
      accessor: "id",
    },
    {
      Header: "제목",
      accessor: "title",
    },
    {
      Header: "추첨 일시",
      accessor: "drawingAt",
      Cell: ({ value }) =>
        new Date(value).toLocaleString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
    },
    {
      Header: "추첨 방법",
      accessor: "drawingType",
    },
    {
      Header: "조회수",
      accessor: "viewCount",
    },
    {
      Header: "주최자",
      accessor: "organizer",
    },
  ];

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const sortedData = data
      .filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortOrder === "등록일순") {
          return b.id - a.id;
        } else if (sortOrder === "추첨일시순") {
          return new Date(a.drawingAt) - new Date(b.drawingAt);
        } else if (sortOrder === "조회수순") {
          return b.viewCount - a.viewCount;
        }
        return 0;
      });

    setFilteredData(sortedData);
  }, [data, searchTerm, sortOrder]);

  return (
    <div
      className={`min-h-screen center1 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <SearchAndFilters
        sortOrder={sortOrder}
        handleSortChange={(e) => setSortOrder(e.target.value)}
        viewType={viewType}
        setViewType={setViewType}
        onSearch={(term, filter) => {
          setSearchTerm(term);
          setSelectedFilter(filter);
        }}
      />
      {viewType === "grid" ? (
        <GridView data={filteredData} />
      ) : (
        <TableView columns={columns} data={filteredData} />
      )}
    </div>
  );
}
