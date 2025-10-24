import React from 'react';
import {useForm} from "react-hook-form"
import {useAuth} from "../context/AuthContext";
import Container from "react-bootstrap/Container";

type LoginFormInput = {
    email: string,
    password: string
}

function Login() {
    const {register, handleSubmit, formState: {errors}} = useForm<LoginFormInput>();
    const {loginUser} = useAuth();

    function handleFormSubmit(form: LoginFormInput) {
        loginUser(form.email, form.password);
    }

    return (
        <Container className={"m-4"} fluid={true} style={{minHeight: "50vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <form className="login-form" onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="form-group mt-4">
                    <label htmlFor="Email">Email address</label>
                    <input type="email"
                           className={`form-control mt-2 ${errors.email ? "is-invalid border-danger" : ""}`}
                           id="Email"
                           aria-describedby="emailHelp"
                           placeholder="Enter email" {...register("email")}/>
                    {errors.email && (
                        <p className="text-danger mt-1">{errors.email.message}</p>
                    )}
                </div>
                <div className="form-group mt-4">
                    <label htmlFor="Password">Password</label>
                    <input type="password"
                           className={`form-control mt-2 ${errors.password ? "is-invalid border-danger" : ""}`}
                           id="Password"
                           placeholder="Password"
                           {...register("password")}/>
                    {errors.password && (
                        <p className="text-danger mt-1">{errors.password.message}</p>
                    )}
                </div>
                <div className="form-group mt-4">
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
            </form>
        </Container>
    );
}

export default Login;