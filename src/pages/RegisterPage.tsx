import { Link, Navigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRegister, useUser } from "../hooks";
import { LuLoader } from "react-icons/lu";
import { Loader } from "../components/shared/Loader";
import { UserRegisterFormValues, userRegisterSchema } from "../lib/validators";

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegisterFormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      phone: "",
    },
    resolver: zodResolver(userRegisterSchema),
  });

  const { mutate, isPending } = useRegister();

  const onRegister = handleSubmit((data) => {
    const { email, password, fullName, phone } = data;
    mutate({ email, password, fullName, phone });
  });

  const { session, isLoading } = useUser();
  if (isLoading) return <Loader />;
  if (session) return <Navigate to="/" />;

  return (
    <div className="h-full flex flex-col items-center mt-10 gap-5">
      <h1 className="text-4xl font-bold capitalize">Registrate</h1>
      <p className="text-sm font-medium">
        Por favor, complete los siguientes campos
      </p>

      {isPending ? (
        <div className="w-full h-full flex justify-center mt-20">
          <LuLoader className="animate-spin" size={60} />
        </div>
      ) : (
        <>
          <form
            className="flex flex-col items-center gap-4 w-full mt-12 sm:w-[400px] lg:w-[500px]"
            onSubmit={onRegister}
          >
            <input
              type="text"
              placeholder="Nombre completo"
              className="border border-pink-300 text-pink-300 px-5 py-4 placeholder:text-pink-300 text-sm rounded-full w-full"
              {...register("fullName")}
            />
            {errors.fullName && (
              <p className="text-red-400">{errors.fullName.message}</p>
            )}

            <input
              type="text"
              placeholder="Celular"
              className="border border-pink-300 text-pink-300 px-5 py-4 placeholder:text-pink-300 text-sm rounded-full w-full"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-red-400">{errors.phone.message}</p>
            )}

            <input
              type="email"
              placeholder="Email"
              className="border border-pink-300 text-pink-300 px-5 py-4 placeholder:text-pink-300 text-sm rounded-full w-full"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-400">{errors.email.message}</p>
            )}

            <input
              type="password"
              placeholder="Contraseña"
              className="border border-pink-300 text-pink-300 px-5 py-4 placeholder:text-pink-300 text-sm rounded-full w-full"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-400">{errors.password.message}</p>
            )}

            <button className="bg-pink-300 hover:bg-green-400 text-black cursor-pointer uppercase font-semibold tracking-widest text-xs py-4 rounded-full mt-5 w-full">
              Registrarme
            </button>

            <p className="text-sm text-pink-300">
              ¿Ya tenes una cuenta?
              <Link to="/login" className="ml-2 underline">
                Inicia sesión
              </Link>
            </p>
          </form>
        </>
      )}
    </div>
  );
};
