import React from 'react';
import {useForm} from "react-hook-form"
import {useAuth} from "../context/AuthContext";
import Container from "react-bootstrap/Container";
import {ResetPassword, ResetPasswordFormInput} from "../../types/Types";

function Register() {
    const {register, handleSubmit, watch, formState: {errors}} = useForm<ResetPasswordFormInput>();
    const {resetPasswordUser} = useAuth();

    function handleFormSubmit(form: ResetPassword) {
        resetPasswordUser(form.email, form.password);
    }

    return (
        <Container className={"m-4"} fluid={true} style={{minHeight: "50vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <form className="login-form" onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="form-group mt-4">
                    <label htmlFor="Email">Email adres</label>
                    <input type="email"
                           className={`form-control mt-2 ${errors.email ? "is-invalid border-danger" : ""}`}
                           id="Email"
                           aria-describedby="emailHelp"
                           placeholder="Enter email"
                           {...register("email", {
                               required: "Email is required",
                               pattern: {
                                   value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                   message: "Invalid email format"
                               }
                           })}/>
                    {errors.email && (
                        <p className="text-danger mt-1">{errors.email.message}</p>
                    )}
                </div>
                <div className="form-group mt-4">
                    <label htmlFor="Email">Password</label>
                    <input type="password"
                           className={`form-control mt-2 ${errors.password ? "is-invalid border-danger" : ""}`}
                           id="Password"
                           placeholder="Enter password"
                           {...register("password", {required: "password is required"})}/>
                    {errors.password && (
                        <p className="text-danger mt-1">{errors.password.message}</p>
                    )}
                </div>
                <div className="form-group mt-4">
                    <label htmlFor="ConfirmPassword">Confirm Password</label>
                    <input type="password"
                           className={`form-control mt-2 ${errors.confirmPassword ? "is-invalid border-danger" : ""}`}
                           id="ConfirmPassword"
                           placeholder="Confirm Password"
                           {...register("confirmPassword", {
                               required: "Please confirm your password",
                               validate: value =>
                                   value === watch("password") || "Password do not match"
                           })}
                    />
                    {errors.confirmPassword && (
                        <p className="text-danger mt-1">{errors.confirmPassword.message}</p>
                    )}
                </div>
                <div className="form-group mt-4">
                    <button type="submit" className="btn btn-primary">Reset Password</button>
                </div>
            </form>
        </Container>
    );
}

export default Register;