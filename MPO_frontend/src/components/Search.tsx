import React from 'react';
import {useParamsStore} from "../hooks/useParamsStore";

function Search() {
    const setParams = useParamsStore(state => state.setParams);
    const setSearchValue = useParamsStore(state => state.setSearchValue);
    const searchValue = useParamsStore(state => state.searchValue);

    function onChange(event: any) {
        setSearchValue(event.target.value);
    }

    function search() {
        setParams({searchTerm: searchValue});
    }

    return (
        <div className='search-container'>
            <form className="d-flex">
                <input
                    onKeyDown={(event: any) => {
                        if (event.key === 'Enter') search()
                    }}
                    value={searchValue}
                    onChange={onChange}
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                />
                <button className="btn btn-outline-success" onClick={search}>
                    Search
                </button>
            </form>
        </div>
    );
}

export default Search;