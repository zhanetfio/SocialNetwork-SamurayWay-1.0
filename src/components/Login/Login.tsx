import React from 'react';
import {Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../common/hooks/hooks";
import {useFormik} from "formik";
import * as Yup from "yup";
import {setLoginDataTC} from "../../redux/auth-reducer";

type LoginFormType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(state => state.auth.isAuth);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false

        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string()
                .min(4, 'Must be 4 characters or more')
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
        }),
        onSubmit: values => {
            dispatch(setLoginDataTC(values))
            formik.resetForm()
        },
    });
    if (isAuth) {
        return <Navigate to={'/profile'}/>
    }

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="text"
                    {...formik.getFieldProps('email')}

                />
                {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                ) : null}
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    {...formik.getFieldProps('password')}
                />
                {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                ) : null}
                <label htmlFor="rememberMe">Remember me</label>
                <input type="checkbox"
                       {...formik.getFieldProps('rememberMe')}
                       checked={formik.values.rememberMe}/>

                <button type="submit">Submit</button>
            </form>
        </div>
    )

}


