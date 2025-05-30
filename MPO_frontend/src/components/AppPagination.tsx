import React from 'react';

type Props = {
    currentPage: number
    pageCount: number
    pageChanged: (page: number) => void;
}

function AppPagination({currentPage, pageCount, pageChanged}: Props) {
    return (
        // <Pagination
        //     currentPage={currentPage}
        //     onPageChange={e => pageChanged(e)}
        //     totalPages={pageCount}
        //     layout='pagination'
        //     showIcons={false}
        //     className='text-blue-500 mb-5'
        // />
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item"><a className="page-link" href="#">Next</a></li>
            </ul>
        </nav>
    );
}

export default AppPagination;