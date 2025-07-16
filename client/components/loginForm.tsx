'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiCall } from '@/context/apiservice';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent page refresh

    const sendParam = {
      email,
      password
    };

    try {
      const response = await apiCall("user/create", "POST", sendParam);
      console.log('Login response:', response);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={submit}>
        <h2>Login</h2>
        <input
          type="text"
          value={email}
          placeholder="Email or Username"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <p>Don&apos;t have an account? <a href="#">Register</a></p>
      </form>
    </div>
  );
}
