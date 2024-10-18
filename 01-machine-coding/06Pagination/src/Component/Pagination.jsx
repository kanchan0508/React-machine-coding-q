import React from "react";

const Pagination = ({ page, products, total, setPage }) => {

    if (!products || !Array.isArray(products)) {
        return <p>No items available.</p>; 
    }

    const totalPages = Math.ceil(total / 20);  // Total number of pages

    const handlePagination = (selectedPage) => {
        if (selectedPage >= 1 && selectedPage <= totalPages) {
            setPage(selectedPage);
        }
    }

    return (
        <>
            {products.length ? (
                <div className="flex justify-center mb-2">
                    {/* Previous Button */}
                    <span
                        className={`cursor-pointer ${page <= 1 ? "opacity-0" : "opacity-1"}`}
                        onClick={() => handlePagination(page - 1)}
                    >
                        ◀️
                    </span>

                    {/* Page Numbers */}
                    {[...Array(totalPages)].map((_, i) => (
                        <span
                            key={i} // Always add a key in map iterations
                            className={`cursor-pointer ${page === i + 1 ? "bg-slate-400" : ""} border p-4`}
                            onClick={() => handlePagination(i + 1)}  // Fix the comparison by adding 1 to i
                        >
                            {i + 1}
                        </span>
                    ))}

                    {/* Next Button */}
                    <span
                        className={`cursor-pointer ${page >= totalPages ? "opacity-0" : "opacity-1"}`}
                        onClick={() => handlePagination(page + 1)}
                    >
                        ▶️
                    </span>
                </div>
            ) : null}
        </>
    );
};

export default Pagination;
