import { useState } from "react";
import Pagination from "./Pagination";

export default function PaginationTest() {
    const dummyData = Array.from({ length: 100 }, (_, index) => ({
        id: index + 1,
        name: `Product ${index + 1}`,
    }));
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentListOfItems = dummyData.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    function handlePageChange(currentPage) {
        setCurrentPage(currentPage);
    }

    return (
        <div>
            <h1>Pagination</h1>
            <ul className="grid grid-cols-4">
                {currentListOfItems.map((listItem) => (
                    <li key={listItem.id}>{listItem.name}</li>
                ))}
            </ul>
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(dummyData.length / itemsPerPage)}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

// 20:49
