import React, {useEffect, useState} from 'react';
import {getData} from "../../actions/data";
import Container from "react-bootstrap/Container";
import {Link} from "react-router-dom";
import {Table} from "react-bootstrap";
import {useParamsStore} from "../../hooks/useParamsStore";
import {useShallow} from "zustand/react/shallow";
import {PagedResult, ProductionOrder} from "../../../types/Types";
import AppPagination from "../../components/AppPagination";
import {StatusBar} from "../../components/StatusBar";
import {useAuth} from "../../context/AuthContext";

function ProductionorderList() {
    const [data, setData] = useState<PagedResult<ProductionOrder>>();
    const params = useParamsStore(useShallow(state => ({
        pageNumber: state.pageNumber,
        pageSize: state.pageSize,
        pageCount: state.pageCount,
        searchTerm: state.searchTerm,
        searchValue: state.searchValue,
        orderBy: state.orderBy,
    })))
    const setParams = useParamsStore(state => state.setParams)
    const auth = useAuth();
    const endpoint = 'search';
    let query = `?PageNumber=${params.pageNumber}&PageSize=${params.pageSize}`;
    if (params.searchTerm !== null || params.searchTerm !== '') {
        query += `&SearchTerm=${params.searchValue}`;
    }

    if (!auth) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }
    const { user } = auth;

    function setPageNumber(pageNumber: number) {
        setParams({pageNumber})
    }

    useEffect(() => {
        getData(endpoint, query).then((result) => {
            setData(result);
            console.log(result);
        });
    }, [query]);

    if (!data) return <div className="mnt-4">Loading...</div>;

    return (
        <>
            {data.totalCount === 0 ? (
                <h4 className="mt-4">Geen productieorders gevonden.</h4>
            ) : (
                <>
                    <Container className="mt-4">
                        <div className="table-responsive">
                            <Table width="100%">
                                <thead>
                                <tr className="border-b text-left">
                                    <th>Productieorder</th>
                                    <th>Product nummer</th>
                                    <th>Eindproduct</th>
                                    <th>Startdatum</th>
                                    <th>Status</th>
                                    <th colSpan={2}>Acties</th>
                                </tr>
                                </thead>
                                <tbody>
                                {data.results && data.results.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{item.docNum}</td>
                                        <td>{item.itemCode}</td>
                                        <td>{item.itemName}</td>
                                        <td>{item.startDate.toString().split("T", 1)}</td>
                                        <td><StatusBar status={item.status} /></td>
                                        <td>
                                            <Link to={`/productionorder/${item.id}/productie`} className="btn btn-primary">
                                               Open
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </div>
                        <AppPagination
                            pageNumber={params.pageNumber}
                            pageCount={data.pageCount}
                            setPageNumber={setPageNumber}
                        />
                    </Container>
                </>
            )}
        </>
    );
}

export default ProductionorderList;