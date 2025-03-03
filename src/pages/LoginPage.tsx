import { useState } from "react";
import { LuLoader } from "react-icons/lu";
import { Link, Navigate } from "react-router-dom";
import { useLogin, useUser } from "../hooks";
import { Loader } from "../components/shared/Loader";

export const LoginPage = () => {
  const [email, setEmail] = useState("7u0d213l4o@wyoxafp.com");
  const [password, setPassword] = useState("44049293");
  const { mutate, isPending } = useLogin();
  const { session, isLoading } = useUser();
  const onLogin = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ email, password });
  };

  if (isLoading) return <Loader />;
  if (session) return <Navigate to="/" />;

  return (
    <div className="h-full flex flex-col items-center mt-12 gap-5">
      <h1 className="text-3xl font-bold capitalize">INICIA SESIÓN</h1>
      <p className="text-sm font-medium">¡Que bueno tenerte de vuelta!</p>

      {isPending ? (
        <div className="w-full h-full flex justify-center mt-20">
          <LuLoader className="animate-spin" size={60} />
        </div>
      ) : (
        <>
          <form
            className="flex flex-col items-center gap-4 w-full mt-15 sm:w-[400px] lg:w-[500px]"
            onSubmit={onLogin}
          >
            <input
              type="email"
              placeholder="Ingresa tu correo electrónico"
              className="border border-pink-300 text-pink-300 px-5 py-4 placeholder:text-pink-300 text-sm rounded-full w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              className="border border-pink-300 text-pink-300 px-5 py-4 placeholder:text-pink-300 text-sm rounded-full w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="bg-pink-300 hover:bg-green-400 text-black cursor-pointer uppercase font-semibold tracking-widest text-s py-4 rounded-full mt-4 w-full">
              Iniciar sesión
            </button>

            <p className="text-sm text-pink-300">
              ¿No estás registrado?
              <Link
                to="/registro"
                className="ml-2 text-pink-300 py-1 px-1.5 font-semibold underline"
              >
                Registrate
              </Link>
            </p>
          </form>
        </>
      )}
    </div>
  );
};
