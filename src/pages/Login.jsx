import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { password } from '../utils/pattern';
import { useAuth } from '../context/auth-context';

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login } = useAuth();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        login({ email: data.email, password: data.password }).then(() => {
            navigate("/");
        }).catch(err => {
            console.log(err);
        });
    };

    return (
        <>
            <main>
                <section className="container">
                    {/* Login Form into a box center of the page */}
                    <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
                        <h2 className="text-2xl font-bold mb-6">Login</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-6">
                                <label htmlFor="email" className="block mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
                                    {...register('email', { required: true })}
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="password" className="block mb-2">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    {...register('password', {
                                        required: true,
                                        pattern: {
                                            value: password,
                                            message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
                                        },
                                    })}
                                    className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
                                />
                                <p>{errors.password?.message}</p>
                            </div>
                            <div className="mb-6">
                                <button type="submit" className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200">
                                    Login
                                </button>
                            </div>
                            <p className="text-center">
                                Don't have an account? <Link to="/register" className="text-indigo-600 hover:underline">Register</Link>
                            </p>
                        </form>
                    </div>
                </section>
            </main>
        </>
    );
};

export default LoginPage;
