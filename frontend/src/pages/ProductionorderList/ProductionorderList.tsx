'use client'

import React, {useEffect, useState} from 'react';
import {getData} from "../../actions/GetData";
import {ProductionOrder} from "../../../types/Types";
import Container from "react-bootstrap/Container";
import {Link} from "react-router-dom";
import {Table} from "react-bootstrap";

function ProductionorderList() {
    const [data, setData] = useState<ProductionOrder[]>();
    const query = 'productionorders';

    useEffect(() => {
        getData(query).then((result) => {
            setData(result);
            console.log(result);
        });
    }, [])

    if (!data) return <h4>Loading...</h4>
    return (
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
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.docNum}</td>
                            <td>{item.itemCode}</td>
                            <td>{item.itemName}</td>
                            <td>{item.startDate.toString().split("T", 1)}</td>
                            <td><Link to={`/productionorder/${item.id}/productie`} className="btn btn-primary">Prod</Link></td>
                            <td><Link to={`/productionorder/${item.id}/test`} className="btn btn-warning">Test</Link></td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
}

export default ProductionorderList;