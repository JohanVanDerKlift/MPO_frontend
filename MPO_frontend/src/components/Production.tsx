import React, {useEffect, useState} from 'react';
import {ProductionOrder, ProductionProps} from "../../types/Types";
import "./Production.css";
import {getData, putData} from "../actions/data";
import Barcode from 'react-barcode';
import QualityTest from "./QualityTest";
import ProductionorderItems from "./ProductionorderItems";
import Measure from "./Measure";
import {useAuth} from "../context/AuthContext";
import {toast} from "react-toastify";

enum Status {
    Ingepland,
    Productie,
    Testen,
    Verzenden,
    Compleet,
    Afgehandeld
}

const statusPermissions: Record<string, string[]> = {
    Ingepland: ['Admin', 'Manager'],
    Productie: ['Admin', 'Manager', 'Production', 'Production'],
    Testen: ['Admin', 'Manager', 'Testing', 'Production'],
    Verzenden: ['Admin', 'Manager', 'Packing', 'Testing'],
    Compleet: ['Admin', 'Manager', 'Packing'],
    Afgehandeld: ['Admin']
};


function Production(props: ProductionProps) {
    const [data, setData] = useState<ProductionOrder>();
    const [loading, setLoading] = useState(true);
    const endpoint = `productionorders/${props.id}`;
    const auth = useAuth();
    const [selectedStatus, setSelectedStatus] = useState<number>();
    const statusOptions = Object.values(Status).filter(v => typeof v === "string");


    if (!auth) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    const { user } = auth;

    useEffect(() => {
        getData(endpoint, null).then((result) => {
            setData(result);
            setSelectedStatus(result.status);
            setLoading(false);
            console.log(result);
        });
    }, [])

    const stringWithBreaks = data?.productionText?.split("\r").map((line, index) => (
        <React.Fragment key={index}>
            {line}
            <br />
        </React.Fragment>
    ));


    if (!data) return <div>Loading...</div>;

    const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = parseInt(e.target.value, 10);
        setSelectedStatus(newStatus);
        putData("productionorders/status", `/${props.id}`, newStatus).then((result) => {
            toast.success("Data saved successfully");
        }).catch((err) => {
            console.error("Save failed:", err);
            toast.error("Failed to save data");
        });
    }

    return (
        <>
        {loading ? (
            <div className="spinner-container">
                <div className="spinner" />
                <p>Loading data...</p>
            </div>
        ) : (
            <div className="">
                <div className="production-header">
                    <h2 className="">
                        Productieorder {data.docNum}
                    </h2>
                    <select
                        className="form-select w-auto"
                        value={selectedStatus}
                        onChange={handleStatusChange}
                    >
                        {statusOptions.map((label, index) => {
                            const allowedRoles = statusPermissions[label] || [];
                            const isDisabled = !user?.roles.some(role => allowedRoles.includes(role));

                            return (
                                <option key={index} value={index} disabled={isDisabled}>
                                    {label}
                                </option>
                            )
                        })}
                    </select>
                </div>

                <Barcode value={data.docNum.toString()} width={4} height={75} displayValue={false} />
                <div className="row mt-4">
                    <div className="col col-2 fw-bold">Eindproduct:</div>
                    <div className="col">{data.itemCode} - {data.itemName}</div>
                </div>
                <div className="row mb-2">
                    <div className="col col-2 fw-bold">Verkoop:</div>
                    <div className="col">{stringWithBreaks}</div>
                </div>

                {data.comment && (
                    <div className="row">
                        <div className="col col-2 fw-bold">Opmerking: </div>
                        <div className="col">{data.comment}</div>
                    </div>
                )}
                {data.instruction && (
                    <div className="row">
                        <div className="col col-2 fw-bold">Instructie: </div>
                        <div className="col">{data.instruction}</div>
                    </div>
                )}
                {data.instructionFile && (
                    <div className="row">
                        <div className="col col-2 fw-bold">Instructie link: </div>
                        <div className="col">
                            <a href={data.instructionFile} target="_blank" rel="noopener noreferrer">
                                Download instructie
                            </a>
                        </div>
                    </div>
                )}
                {data.testInstruction && (
                    <div className="row">
                        <div className="col col-2 fw-bold">Testprocedure: </div>
                        <div className="col">{data.testInstruction}</div>
                    </div>
                )}
                {data.quantity && (
                    <div className="row">
                        <div className="col col-2 fw-bold">Aantal: </div>
                        <div className="col">{data.quantity}</div>
                    </div>
                )}
                    <div className="row">
                        <div className="col col-2 fw-bold">Foto: </div>
                        <div className="col">{data.photo ? 'JA' : 'NEE'}</div>
                    </div>

                {(data.whsName) && (
                    <div className="row">
                        <div className="col col-2 fw-bold">Magazijn: </div>
                        <div className="col">{data.whsName}</div>
                    </div>
                )}
                {user?.roles.some(role => ['Controller', 'Testing', 'Manager', 'Admin'].includes(role)) && (
                    <QualityTest items={data.qualityTests} productionorderId={data.id} />
                )}

                {user?.roles.some(role => ['Packing', 'Manager', 'Admin'].includes(role)
                        && !data.isVariableProduct) &&
                    <Measure
                        id={data.id}
                        iWeight1={data.iWeight1}
                        iWght1Unit={data.iWght1Unit}
                        sWeight1={data.sWeight1}
                        sWght1Unit={data.sWght1Unit}
                        sLength1={data.sLength1}
                        sLen1Unit={data.sLen1Unit}
                        sWidth1={data.sWidth1}
                        sWdth1Unit={data.sWdth1Unit}
                        sHeight1={data.sHeight1}
                        sHght1Unit={data.sHght1Unit}
                    />
                }

                <br/>
                {user?.roles.some(role => ['Production', 'Manager', 'Admin'].includes(role)) &&
                    <ProductionorderItems items={data.productionOrderItems} />
                }
            </div>
        )}
        </>
    );
}

export default Production;