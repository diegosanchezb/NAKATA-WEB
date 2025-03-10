import { zodResolver } from "@hookform/resolvers/zod";
import { ProductFormValues, productSchema } from "../../../lib/validators";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { SectionFormProduct } from "./SectionFormProduct";
import { InputForm } from "./InputForm";
import { useForm } from "react-hook-form";
import { FeaturesInput } from "./FeaturesInput";
import { useEffect } from "react";
import { generateSlug } from "../../../helpers";
import { VariantsInput } from "./VariantsInput";
import { UploaderImages } from "./UploaderImages";
import { Editor } from "./Editor";

interface Props {
  titleForm: string;
}

export const FormProduct = ({ titleForm }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
  });

  const navigate = useNavigate();
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const watchName = watch("name");
  useEffect(() => {
    if (!watchName) return;

    const generatedSlug = generateSlug(watchName);
    setValue("slug", generatedSlug, { shouldValidate: true });
  }, [watchName, setValue]);

  return (
    <div className="flex flex-col gap-6 relative text-black">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button
            className="bg-pink-300 cursor-pointer p-1.5 rounded-md shadow-sm border border-black transition-all hover:bg-green-400 group hover:scale-105"
            onClick={() => navigate(-1)}
          >
            <IoIosArrowBack
              size={18}
              className="transition-all group-hover:scale-125 text-black"
            />
          </button>
          <h2 className="font-bold tracking-tight text-2xl capitalize">
            {titleForm}
          </h2>
        </div>
      </div>

      <form
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 auto-rows-max flex-1"
        onSubmit={onSubmit}
      >
        <SectionFormProduct
          titleSection="Detalles del producto"
          className="lg:col-span-2 lg:row-span-2"
        >
          <InputForm
            type="text"
            placeholder="Ejemplo: iPhone 13 Pro Max"
            label="nombre"
            name="name"
            register={register}
            errors={errors}
            required
          />
          <FeaturesInput control={control} errors={errors} />
        </SectionFormProduct>

        <SectionFormProduct>
          <InputForm
            type="text"
            label="Slug"
            name="slug"
            placeholder="iphone-13-pro-max"
            register={register}
            errors={errors}
          />

          <InputForm
            type="text"
            label="Marca"
            name="brand"
            placeholder="Apple"
            register={register}
            errors={errors}
            required
          />
        </SectionFormProduct>

        <SectionFormProduct
          titleSection="Variantes del producto"
          className="lg:col-span-2 h-fit"
        >
          <VariantsInput
            control={control}
            errors={errors}
            register={register}
          />
        </SectionFormProduct>

        <SectionFormProduct titleSection="Imágenes del producto">
          <UploaderImages errors={errors} setValue={setValue} watch={watch} />
        </SectionFormProduct>

        <SectionFormProduct
          titleSection="Descripción de producto"
          className="col-span-full"
        >
          <Editor setValue={setValue} errors={errors} />
        </SectionFormProduct>

        <div className="flex gap-3 absolute top-0 right-0">
          <button
            className="btn-secondary-outline"
            type="button"
            onClick={() => navigate(-1)}
          >
            Cancelar
          </button>
          <button className="btn-primary" type="submit">
            Guardar producto
          </button>
        </div>
      </form>
    </div>
  );
};
