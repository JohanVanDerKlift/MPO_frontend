import React from 'react';
import {Table} from "react-bootstrap";

type ProductionorderItem = {
    itemCode: string,
    suppCatNum: string,
    itemName: string,
    instruction: string,
    remark: string,
}

type ProductionorderItems ={
    items: ProductionorderItem[]
}

function ProductionorderItems({items}: ProductionorderItems) {
    return (
        <>
            <Table>
                <thead>
                <tr>
                    <th>Artikel</th>
                    <th>Fabrikant code</th>
                    <th>Omschrijving / Instructies</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item, index) => (
                    <tr key={index}>
                        <td>{item.itemCode}</td>
                        <td>{item.suppCatNum}</td>
                        <td>{item.itemName} <br/> {item.instruction} <br/> {item.remark}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </>
    );
}

export default ProductionorderItems;