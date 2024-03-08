import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axxios from '../axios/axiosInstance';
import { password } from '../utils/pattern';

interface RegisterForm {
    firstName: string
    lastName: string
    email: string
    password: string
}

const RegisterPage: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<RegisterForm> = (data) => {
        axxios.post("/auth/register", data).then((res) => {
            const data = res.data;
            const token = data.token;
            if (data.user) {
                localStorage.setItem('accessToken', token.accessToken);

                navigate("/");
            }
            console.log(res);
        }).catch(err => {
            console.log(err);
        });
    };

    return (
        <main>
            <section className="container">
                <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
                    <h2 className="text-2xl font-bold mb-6">Register</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-6">
                            <label htmlFor="firstName" className="block mb-2">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
                                {...register('firstName', { required: true })}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="lastName" className="block mb-2">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
                                {...register('lastName', { required: true })}
                            />
                        </div>
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
                                className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
                                {...register('password', {
                                    required: true,
                                    // Example pattern: Minimum eight characters, at least one uppercase letter, one lowercase letter, and one number
                                    pattern: {
                                        value: password,
                                        message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
                                    },
                                })}
                            />
                            <p>{errors.password?.message}</p>
                        </div>
                        <div className="mb-6">
                            <button
                                className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                            >
                                Create Account
                            </button>
                        </div>
                        <p className="text-center">
                            Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
                        </p>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default RegisterPage;
