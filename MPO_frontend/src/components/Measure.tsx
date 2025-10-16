import React, {useEffect} from 'react';
import {useForm, SubmitHandler} from "react-hook-form";
import {postData} from "../actions/GetData";
import {toast} from "react-toastify";

type MeasureProps = {
    id: string;
    iWeight1: number,
    iWght1Unit: number,
    sWeight1: number,
    sWght1Unit: number,
    sLength1: number,
    sLen1Unit: number,
    sWidth1: number,
    sWdth1Unit: number,
    sHeight1: number,
    sHght1Unit: number,
};

function Measure(props: MeasureProps) {
    const {register, handleSubmit, reset} = useForm<MeasureProps>();

    useEffect(() => {
        if (props.iWeight1 !== undefined) {
            reset(props)
        }
        console.log(props)
    }, [props, reset])

    const handleFormSubmit: SubmitHandler<MeasureProps> = (data) => {
        console.log(data);
        postData("productionorders", `/${props.id}`, data).then(() => {
            toast.success("Data saved successfully");
        }).catch((error) => {
            console.error("Save failed:", error);
            toast.error("Failed to save data");
        });
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="container mt-4">
            <div className="row mb-3">
                <div className="col-md-4">
                    <label htmlFor="iWeight1" className="form-label fw-bold">Product gewicht</label>
                    <input
                        id="iWeight1"
                        type="number"
                        className="form-control"
                        {...register("iWeight1", { required: true, valueAsNumber: true })}
                    />
                </div>
                <div className="col-md-2">
                    <label htmlFor="IWght1Unit" className="form-label fw-bold">Unit</label>
                    <select
                        id="IWght1Unit"
                        className="form-select"
                        {...register("iWght1Unit", { required: true, valueAsNumber: true })}
                    >
                        <option value={3}>Kilogram (kg)</option>
                        <option value={2}>Gram (g)</option>
                    </select>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-4">
                    <label htmlFor="SWeight1" className="form-label fw-bold">Verzend gewicht</label>
                    <input
                        id="SWeight1"
                        type="number"
                        className="form-control"
                        {...register("sWeight1", { required: true, valueAsNumber: true })}
                    />
                </div>
                <div className="col-md-2">
                    <label htmlFor="SWght1Unit" className="form-label fw-bold">Unit</label>
                    <select
                        id="SWght1Unit"
                        className="form-select"
                        {...register("sWght1Unit", { required: true, valueAsNumber: true })}
                    >
                        <option value={3}>Kilogram (kg)</option>
                        <option value={2}>Gram (g)</option>
                    </select>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-4">
                    <label htmlFor="SLength1" className="form-label fw-bold">Lengte</label>
                    <input
                        id="SLength1"
                        type="number"
                        className="form-control"
                        {...register("sLength1", { required: true, valueAsNumber: true })}
                    />
                </div>
                <div className="col-md-2">
                    <label htmlFor="SLen1Unit" className="form-label fw-bold">Unit</label>
                    <div>Millimeter (mm)</div>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-4">
                    <label htmlFor="SWidth1" className="form-label fw-bold">Breedte</label>
                    <input
                        id="SWidth1"
                        type="number"
                        className="form-control"
                        {...register("sWidth1", { required: true, valueAsNumber: true })}
                    />
                </div>
                <div className="col-md-2">
                    <label htmlFor="SWdth1Unit" className="form-label fw-bold">Unit</label>
                    <div>Millimeter (mm)</div>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-md-4">
                    <label htmlFor="SHeight1" className="form-label fw-bold">Hoogte</label>
                    <input
                        id="SHeight1"
                        type="number"
                        className="form-control"
                        {...register("sHeight1", { required: true, valueAsNumber: true })}
                    />
                </div>
                <div className="col-md-2">
                    <label htmlFor="SHght1Unit" className="form-label fw-bold">Unit</label>
                    <div>Millimeter (mm)</div>
                </div>
            </div>

            <button className="btn btn-success w-50" type="submit">
                Save
            </button>
        </form>
    );
}

export default Measure;