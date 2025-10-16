import React from 'react';
import {Controller, useWatch} from "react-hook-form";
import TestCheckbox from "./TestCheckbox";

function CheckboxRow({
                         serial,
                         control,
                         user,
                     }: {
    serial: string;
    control: any;
    user: any;
}) {
    const testResultValue = useWatch({ control, name: `testResult-${serial}` });
    const testTypes = ["mechanicalTest", "visualTest", "electricalTest", "operationalTest", "testResult"];

    return (
        <>
            {testTypes.map((type) => {
                const id = `${type}-${serial}`;
                const isDisabled =
                    (type === 'testResult' && !user?.roles.some((role: string) =>
                        ['Controller', 'Manager', 'Admin'].includes(role))) ||
                    (type !== 'testResult' && testResultValue);

                return (
                    <td className="text-center" key={id}>
                        <Controller
                            name={id}
                            control={control}
                            render={({ field }) => (
                                <TestCheckbox
                                    {...field}
                                    id={id}
                                    type={type}
                                    checked={field.value}
                                    disabled={isDisabled}
                                />
                            )}
                        />
                    </td>
                );
            })}
        </>
    );
}

export default CheckboxRow;