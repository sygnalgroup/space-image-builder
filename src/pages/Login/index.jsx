import React from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { useAuth } from '~/hooks/useAuth';
import { showAPIError } from '~/core/showAPIError';

export function Login() {
  const navigate = useNavigate();

  const { loginByEmailAndPassword } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ email, password }) =>
      loginByEmailAndPassword(email, password),
    onSuccess: () => {
      toast.success('Logged In!');
      navigate('/app');
    },
    onError: showAPIError,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: '', password: '' } });

  return (
    <div className="flex min-h-screen items-center justify-center text-gray-900 dark:text-white">
      <form
        onSubmit={handleSubmit(mutate)}
        className="w-full max-w-sm space-y-6 rounded-2xl bg-white p-8 shadow-lg dark:bg-zinc-900"
      >
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            className="mt-1 w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            placeholder="Enter email"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            className="mt-1 w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            placeholder="Enter password"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
