'use client';

import { EmailPattern } from '@/Components/shared/EmailPattern';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
    name: string;
    email: string;
    password: string;
};

export function RegisterForm({
    dictionary,
}: {
    dictionary: {
        register_text: string;
        log_in: string;
        register: string;
        name: string;
        password: string;
        email: string;
    };
}) {
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
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label className="label">
                    <span className="label-text">{dictionary.name}</span>
                </label>
                <input
                    className="input input-bordered w-full"
                    type="text"
                    placeholder="example"
                    {...register('name', { required: true })}
                />
                {errors.name && (
                    <span className="text-error">{errors.name.message}</span>
                )}

                <label className="label">
                    <span className="label-text">{dictionary.email}</span>
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
                    <span className="text-error">{errors.email.message}</span>
                )}

                <label className="label">
                    <span className="label-text">{dictionary.password}</span>
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
                value={dictionary.register}
            />
        </form>
    );
}
