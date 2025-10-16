import React from 'react';

type Props = {
    pageNumber: number
    pageCount: number
    setPageNumber: (page: number) => void;
}

function AppPagination({pageNumber, pageCount, setPageNumber}: Props) {
    const getVisiblePages = () => {
        const pages = [];

        if (pageCount <= 3) {
            for (let i = 1; i <= pageCount; i++) pages.push(i);
        } else if (pageNumber === 1) {
            pages.push(1, 2, 3);
        } else if (pageNumber === pageCount) {
            pages.push(pageCount - 2, pageCount - 1, pageCount);
        } else {
            pages.push(pageNumber - 1, pageNumber, pageNumber + 1);
        }

        return pages.filter(p => p >= 1 && p <= pageCount);
    };

    const visiblePages = getVisiblePages();

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
                {/* Previous Button */}
                <li className={`page-item ${pageNumber === 1 ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={() => setPageNumber(pageNumber - 1)}
                        disabled={pageNumber === 1}
                    >
                        Previous
                    </button>
                </li>

                {/* Page Numbers */}
                {visiblePages.map((page) => (
                    <li
                        key={page}
                        className={`page-item ${page === pageNumber ? 'active' : ''}`}
                        aria-current={page === pageNumber ? 'page' : undefined}
                    >
                        <button className="page-link" onClick={() => setPageNumber(page)}>
                            {page}
                        </button>
                    </li>
                ))}

                {/* Next Button */}
                <li className={`page-item ${pageNumber === pageCount ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={() => setPageNumber(pageNumber + 1)}
                        disabled={pageNumber === pageCount}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default AppPagination;