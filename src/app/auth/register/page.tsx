'use client';

import { EmailPattern } from '@/Components/shared/EmailPattern';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
    name: string;
    email: string;
    password: string;
};

export default function App() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data, event) => {
        event?.preventDefault();
        console.log(data);
        fetch('/api/user/register', {
            method: 'POST',
            body: JSON.stringify(data),
        }).then((value) => console.log(value));
    };

    return (
        <div className="card w-96 bg-base-200">
            <div className="card-body">
                <h2 className="card-title">Create a new account</h2>
                <form
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="label">
                            <span className="label-text">name</span>
                        </label>
                        <input
                            className="input input-bordered w-full"
                            type="text"
                            placeholder="example"
                            {...register('name', { required: true })}
                        />
                        {errors.name && (
                            <span className="text-error">
                                {errors.name.message}
                            </span>
                        )}

                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            className="input input-bordered w-full"
                            placeholder="example@example.com"
                            {...register('email', {
                                required: true,
                                pattern: EmailPattern,
                            })}
                        />
                        {errors.email && (
                            <span className="text-error">
                                {errors.email.type}
                            </span>
                        )}

                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            className="input input-bordered w-full"
                            {...register('password', {
                                required: true,
                            })}
                        />
                        {errors.password && (
                            <span className="text-error">
                                {errors.password.message}
                            </span>
                        )}
                    </div>

                    <input
                        className="btn btn-primary"
                        type="submit"
                        value="Register"
                    />
                </form>
            </div>
        </div>
    );
}
