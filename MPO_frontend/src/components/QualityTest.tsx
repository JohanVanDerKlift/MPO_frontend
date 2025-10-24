import React, {JSX, useMemo} from 'react';
import Barcode from "react-barcode";
import {Table} from "react-bootstrap";
import './QualityTest.css';
import {useForm} from "react-hook-form";
import {QualityTestItem, QualityTestProps} from "../../types/Types";
import {postData} from "../actions/data";
import {useAuth} from "../context/AuthContext";
import CheckboxRow from "./CheckboxRow";
import { toast } from "react-toastify";

function QualityTest({items, productionorderId}: QualityTestProps): JSX.Element {
    const initialStates = useMemo(() => getInitialStates(items), [items]);
    const {control, handleSubmit} = useForm({
        defaultValues: initialStates,
    });
    const auth = useAuth();

    if (!auth) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    const { user } = auth;

    function getInitialStates(items: QualityTestItem[]): Record<string, boolean> {
        const states: Record<string, boolean> = {};
        items.forEach(({ serialNo = 0, mechanicalTest, electricalTest, visualTest, operationalTest, testResult }) => {
            const serial = serialNo.toString();
            states[`mechanicalTest-${serial}`] = !!mechanicalTest;
            states[`electricalTest-${serial}`] = !!electricalTest;
            states[`visualTest-${serial}`] = !!visualTest;
            states[`operationalTest-${serial}`] = !!operationalTest;
            states[`testResult-${serial}`] = !!testResult;
        });
        return states;
    }

    function handleFormSubmit(data: Record<string, boolean>) {
        console.log(data);
        console.log(formatFormData(data));
        postData("qualitytests", `/${productionorderId}`, formatFormData(data)).then(() => {
            toast.success("Data saved successfully");
        }).catch((error) => {
            console.error("Save failed:", error);
            toast.error("Failed to save data");
        });
    }

    function formatFormData(formData: Record<string, boolean>): QualityTestItem[] {
        const grouped = Object.entries(formData).reduce((acc, [key, value]) => {
            const [testType, serial] = key.split("-");
            const serialNo = Number(serial);
            acc[serialNo] = {
                ...acc[serialNo],
                serialNo,
                [testType]: value,
            };
            return acc;
        }, {} as Record<number, Partial<QualityTestItem>>);

        return Object.values(grouped).map(item => ({
            mechanicalTest: item.mechanicalTest ?? false,
            visualTest: item.visualTest ?? false,
            electricalTest: item.electricalTest ?? false,
            operationalTest: item.operationalTest ?? false,
            testResult: item.testResult ?? false,
            serialNo: item.serialNo ?? 0,
            userEmail: user?.email,
        }));
    }

    const testTypes = ["mechanicalTest", "visualTest", "electricalTest", "operationalTest", "testResult"];

    return (
        <>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <Table className="mt-4">
                    <thead>
                    <tr>
                        {items.length > 1 && (
                            <>
                                <th className="text-center">Serienummers</th>
                                <th className="text-center">Controle/Inspectie</th>
                            </>
                        )}
                        <th className="text-center">Aandraai Momenten</th>
                        <th className="text-center">Visuele controle</th>
                        <th className="text-center">Electrisch testen</th>
                        <th className="text-center">Electrische werking</th>
                        <th className="text-center">Eind controle</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.length <= 1 ? (
                        <tr>
                            <CheckboxRow serial='0' control={control} user={user} />
                        </tr>
                    ) : (
                        items.map((qualityTest) => (
                            <tr key={qualityTest.serialNo}>
                                <td className="text-center">{qualityTest.serialNo.toString() || "N/A"}</td>
                                <td className="text-center">
                                    <Barcode value={qualityTest.serialNo.toString()} width={3} height={25} displayValue={false} />
                                </td>
                                <CheckboxRow serial={qualityTest.serialNo.toString()} control={control} user={user} />
                            </tr>
                        ))
                    )}
                    </tbody>
                </Table>
                <button className="btn btn-success flex" type="submit">Save Tests</button>
            </form>
        </>
    );
}

export default QualityTest;