import React, {useEffect, useState} from 'react';
import {ProductionOrder} from "../../types/Types";
import {getData} from "../actions/GetData";
import {Table} from "react-bootstrap";
import Barcode from 'react-barcode';

type Props = {
    id: string,
    type: string
};

function Production({id, type} : Props) {
    const [data, setData] = useState<ProductionOrder>();
    const endpoint = `productionorders/${id}`;

    useEffect(() => {
        getData(endpoint, null).then((result) => {
            setData(result);
            console.log(result);
        });
    }, [])

    const stringWithBreaks = data?.productionText.split("\r").map((line, index) => (
        <React.Fragment key={index}>
            {line}
            <br />
        </React.Fragment>
    ));


    if (!data) return <div>Loading...</div>;
    return (
        <div className="">
            <h2 className="">
                Productieorder {data.docNum}
            </h2>
            <Barcode value={data.docNum.toString()} width={4} height={75} displayValue={false} />
            <div className="row mt-4">
                <div className="col col-1 fw-bold">Eindproduct:</div>
                <div className="col">{data.itemCode} - {data.itemName}</div>
            </div>
            <div className="row mb-2">
                <div className="col col-1 fw-bold">Verkoop:</div>
                <div className="col">{stringWithBreaks}</div>
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
            {(data.testInstruction && type === 'test') && (
                <div className="row">
                    <div className="col col-1 fw-bold">Testprocedure: </div>
                    <div className="col">{data.testInstruction}</div>
                </div>
            )}
            {data.quantity && (
                <div className="row">
                    <div className="col col-1 fw-bold">Aantal: </div>
                    <div className="col">{data.quantity}</div>
                </div>
            )}
            {type === 'test' && (
                <div className="row">
                    <div className="col col-1 fw-bold">Foto maken: </div>
                    <div className="col">{data.photo ? 'JA' : 'NEE'}</div>
                </div>
            )}
            {(data.whsName) && (
                <div className="row">
                    <div className="col col-1 fw-bold">Magazijn: </div>
                    <div className="col">{data.whsName}</div>
                </div>
            )}
            {/*<button className="btn btn-primary mt-4">Generate Serial</button>*/}
            {type === 'test' && (
                <Table className="mt-2">
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
                                <td><Barcode value={serialNumber.SerialNo.toString()} width={4} height={75} displayValue={false} /></td>
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