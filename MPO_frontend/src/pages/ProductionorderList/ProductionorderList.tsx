import React, {useEffect, useState} from 'react';
import {getData} from "../../actions/GetData";
import Container from "react-bootstrap/Container";
import {Link} from "react-router-dom";
import {Table} from "react-bootstrap";
import {useParamsStore} from "../../hooks/useParamsStore";
import {useShallow} from "zustand/react/shallow";
import {PagedResult, ProductionOrder} from "../../../types/Types";

function ProductionorderList() {
    const [data, setData] = useState<PagedResult<ProductionOrder>>();
    const params = useParamsStore(useShallow(state => ({
        pageNumber: state.pageNumber,
        pageSize: state.pageSize,
        pageCount: state.pageCount
    })))
    const setParams = useParamsStore(state => state.setParams)
    const endpoint = 'search';
    const query = `?PageNumber=${params.pageNumber}&PageSize=${params.pageSize}`;

    function setPageNumber(pageNumber: number) {
        setParams({pageNumber})
    }

    useEffect(() => {
        getData(endpoint, query).then((result) => {
            setData(result);
            console.log(result);
        });
    }, [query])

    if (!data) return <div className="mnt-4">Loading...</div>;

    return (
        <>
            {data.totalCount === 0 ? (
                <h4 className="mt-4">Loading...</h4>
            ) : (
                <>
                    <Container className="mt-4">
                        <Table width="100%">
                            <thead>
                            <tr className="border-b text-left">
                                <th>Productieorder</th>
                                <th>Product nummer</th>
                                <th>Eindproduct</th>
                                <th>Startdatum</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.results && data.results.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{item.docNum}</td>
                                    <td>{item.itemCode}</td>
                                    <td>{item.itemCode}</td>
                                    <td>{item.itemName}</td>
                                    <td>{item.startDate.toString().split("T", 1)}</td>
                                    <td><Link to={`/productionorder/${item.id}/productie`} className="btn btn-primary">Productie</Link></td>
                                    <td><Link to={`/productionorder/${item.id}/test`} className="btn btn-warning">Test</Link></td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                {(params.pageNumber !== 1) &&
                                    <>
                                        <li className="page-item">
                                            <button className="page-link" onClick={() => setPageNumber(params.pageNumber - 1)}>Previous</button>
                                        </li>
                                    </>
                                }
                                {!(params.pageNumber < data.pageCount - 1) &&
                                    <>
                                        <li className="page-item"><button className="page-link" onClick={() => setPageNumber(params.pageNumber - 2)}>{params.pageNumber - 2}</button></li>
                                        <li className="page-item"><button className="page-link" onClick={() => setPageNumber(params.pageNumber - 1)}>{params.pageNumber - 1}</button></li>
                                    </>
                                }
                                {((params.pageNumber < data.pageCount - 1) && (params.pageNumber > 1)) &&
                                    <li className="page-item"><button className="page-link" onClick={() => setPageNumber(params.pageNumber - 1)}>{params.pageNumber - 1}</button></li>
                                }

                                <li className="page-item active"><button className="page-link" onClick={() => setPageNumber(params.pageNumber)}>{params.pageNumber}</button></li>

                                {(params.pageNumber === 1) &&
                                    <>
                                        <li className="page-item"><button className="page-link" onClick={() => setPageNumber(params.pageNumber + 1)}>{params.pageNumber + 1}</button></li>
                                        <li className="page-item"><button className="page-link" onClick={() => setPageNumber(params.pageNumber + 2)}>{params.pageNumber + 2}</button></li>
                                    </>
                                }
                                {((params.pageNumber < data.pageCount - 1) && (params.pageNumber > 1)) &&
                                    <li className="page-item"><button className="page-link" onClick={() => setPageNumber(params.pageNumber + 1)}>{params.pageNumber + 1}</button></li>
                                }

                                {(params.pageNumber < data.pageCount - 1) &&
                                    <>
                                        <li className="page-item">
                                            <button className="page-link" onClick={() => setPageNumber(params.pageNumber + 1)}>Next</button>
                                        </li>
                                    </>
                                }
                            </ul>
                        </nav>
                    </Container>
                </>
            )}
        </>
    );
}

export default ProductionorderList;