import React from 'react';
import {useForm} from "react-hook-form"
import {useAuth} from "../context/AuthContext";
import Container from "react-bootstrap/Container";

type RegisterFormInput = {
    email: string,
    password: string,
    role: string[],
}

function Register() {
    const {register, handleSubmit, formState: {errors}} = useForm<RegisterFormInput>();
    const {registerUser} = useAuth();

    function handleFormSubmit(form: RegisterFormInput) {
        console.log(registerUser);
        registerUser(form.email, form.password, form.role);
    }

    return (
        <Container className={"m-4"} fluid={true} style={{minHeight: "50vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <form className="login-form" onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="form-group mt-4">
                    <label htmlFor="Email">Email address</label>
                    <input type="email" className="form-control mt-2" id="Email" aria-describedby="emailHelp"
                           placeholder="Enter email" {...register("email")}/>
                    {errors.email ? (
                        <p className="text-white">{errors.email.message}</p>
                    ) : (
                        ""
                    )}
                </div>
                <div className="form-group mt-4">
                    <label htmlFor="Password">Password</label>
                    <input type="password" className="form-control mt-2" id="Password" placeholder="Password"
                           {...register("password")}/>
                    {errors.password ? (
                        <p className="text-white">{errors.password.message}</p>
                    ) : (
                        ""
                    )}
                </div>
                <div className="form-group mt-4">
                    <label htmlFor="Role">Role</label>
                    <select
                        id="Role"
                        className="form-control mt-2"
                        multiple={true}
                        {...register("role", { required: "Please select at least one role"})}
                        aria-invalid={errors.role ? "true" : "false"}
                    >
                        <option value="">Select a role</option>
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                        <option value="Testing">Testing</option>
                        <option value="Controller">Controller</option>
                        <option value="Production">Production</option>
                        <option value="Packing">Packing</option>
                    </select>

                    {errors.role ? (
                        <p className="text-danger">{errors.role.message}</p>
                    ) : (
                        ""
                    )}
                </div>
                <div className="form-group mt-4">
                    <button type="submit" className="btn btn-primary">Register new User</button>
                </div>
            </form>
        </Container>
    );
}

export default Register;