import React, {useEffect, useState} from 'react';
import {ProductionOrder} from "../../types/Types";
import {getData} from "../actions/GetData";
import {Table} from "react-bootstrap";

type Props = {
    id: string,
    type: string
};

function Production({id, type} : Props) {
    const [data, setData] = useState<ProductionOrder>();
    const query = `productionorders/${id}`;

    useEffect(() => {
        getData(query).then((result) => {
            setData(result);
            console.log(result);
        });
    }, [])

    const productionText = data?.productionText.replaceAll('*', 'CR');

    if (!data) return <div>Loading...</div>;
    return (
        <div className="">
            <h2 className="">
                Productieorder {data.docNum}
            </h2>
            <span>
                <img width="245" height="54"
                     src="data:image/png;base64,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"/>
            </span>
            <br/>
            <div className="row">
                <div className="col col-1 fw-bold">Eindproduct:</div>
                <div className="col">{data.itemCode} - {data.itemName}</div>
            </div>
            <div className="row">
                <div className="col col-1 fw-bold">Verkoop:</div>
                <div className="col">{productionText}</div>
            </div>

            {data.comment && (
                <div className="row">
                    <div className="col col-1 fw-bold">Opmerking: </div>
                    <div className="col">{data.comment}</div>
                </div>
            )}
            {data.instruction && (<
                    div className="row">
                    <div className="col col-1 fw-bold">Instructie: </div>
                    <div className="col">{data.instruction}</div>
                </div>
            )}
            {data.quantity && (
                <div className="row">
                    <div className="col col-1 fw-bold">Aantal: </div>
                    <div className="col">{data.quantity}</div>
                </div>
            )}
            {(data.testInstruction && type === 'test') && (
                <div className="row">
                    <div className="col col-1 fw-bold">Testprocedure: </div>
                    <div className="col">{data.testInstruction}</div>
                </div>
            )}
            {(data.whsName) && (
                <div className="row">
                    <div className="col col-1 fw-bold">Magazijn: </div>
                    <div className="col">{data.whsName}</div>
                </div>
            )}
            {type === 'test' && (
                <Table className="mt-4">
                    <thead>
                    <tr>
                        <th>Serienummers</th>
                        <th>Controle/Inspectie</th>
                        <th>Aandraai Momenten</th>
                        <th>Visuele controle</th>
                        <th>Electrisch testen</th>
                        <th>Electrische werking</th>
                        <th>Eind controle</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.serialNumbers.map((serialNumber, index) => (
                        <>
                            <tr key={index}>
                                <td>{serialNumber.SerialNo}</td>
                                <td>{serialNumber.SerialNo}</td>
                                <td><input type="checkbox" /></td>
                                <td><input type="checkbox" /></td>
                                <td><input type="checkbox" /></td>
                                <td><input type="checkbox" /></td>
                                <td><input type="checkbox" /></td>
                            </tr>
                        </>
                    ))}
                    </tbody>
                </Table>
            )}

            <br/>
            <Table>
                <thead>
                <tr>
                    <th>Artikel</th>
                    <th>Fabrikant code</th>
                    <th>Omschrijving / Instructies</th>
                </tr>
                </thead>
                <tbody>
                {data.productionOrderItems.map((item, index) => (
                    <tr key={index}>
                        <td>{item.itemCode}</td>
                        <td>{item.suppCatNum}</td>
                        <td>{item.itemName} <br/> {item.instruction} <br/> {item.remark}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Production;