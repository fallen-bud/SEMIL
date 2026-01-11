import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { useAuthContext } from "../../../context/AuthContext";

interface RegisterFormData {
  Username: string;
  Name: string;
  Number: string;
  Address: string;
  Password: string;
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, loading, error } = useAuthContext();

  const [formData, setFormData] = useState<RegisterFormData>({
    Username: "",
    Name: "",
    Number: "",
    Address: "",
    Password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await register(formData);

    if (result.success) {
      navigate("/");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 text-white backdrop-blur">
        
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/20 text-indigo-400">
            <UserPlus />
          </div>
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="mt-1 text-sm text-gray-400">
            Join the platform to help reunite families
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="Username"
            placeholder="Username"
            value={formData.Username}
            onChange={handleChange}
            required
            className="w-full rounded-xl bg-black/40 px-4 py-3 text-sm text-white outline-none ring-1 ring-white/10 focus:ring-indigo-500"
          />

          <input
            type="text"
            name="Name"
            placeholder="Full Name"
            value={formData.Name}
            onChange={handleChange}
            required
            className="w-full rounded-xl bg-black/40 px-4 py-3 text-sm text-white outline-none ring-1 ring-white/10 focus:ring-indigo-500"
          />

          <input
            type="tel"
            name="Number"
            placeholder="Mobile Number"
            value={formData.Number}
            onChange={handleChange}
            required
            className="w-full rounded-xl bg-black/40 px-4 py-3 text-sm text-white outline-none ring-1 ring-white/10 focus:ring-indigo-500"
          />

          <input
            type="text"
            name="Address"
            placeholder="Address"
            value={formData.Address}
            onChange={handleChange}
            required
            className="w-full rounded-xl bg-black/40 px-4 py-3 text-sm text-white outline-none ring-1 ring-white/10 focus:ring-indigo-500"
          />

          <input
            type="password"
            name="Password"
            placeholder="Password"
            value={formData.Password}
            onChange={handleChange}
            required
            className="w-full rounded-xl bg-black/40 px-4 py-3 text-sm text-white outline-none ring-1 ring-white/10 focus:ring-indigo-500"
          />

          {/* Error */}
          {error && (
            <p className="text-sm text-red-400">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="cursor-pointer text-indigo-400 hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
