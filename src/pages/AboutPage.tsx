export const AboutPage = () => {
  return (
    <div className="space-y-5 ">
      <h1 className="text-center text-4xl font-semibold tracking-tight mb-5">
        Nuestro emprendimiento
      </h1>
      <img
        src="../../img/sobrenosotros.jpg"
        alt="Imágen de fondo"
        className="h-[500px] w-full object-cover"
      />
      <div className="flex flex-col gap-4 tracking-tighter leading-7 text-sm font-medium text-slate-800">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum dolore
          repellendus, maxime soluta rerum doloremque. Sequi minima nostrum
          aliquam porro iste, libero voluptatum labore non nulla iusto ipsa
          molestiae quam magni repellendus culpa maxime minus necessitatibus
          fugiat. Adipisci aliquam voluptatibus nemo ut ipsam eveniet itaque?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt quia
          voluptate quis dolores iure minima ullam dolore sint, explicabo
          quisquam esse animi cum repellat eligendi?
        </p>
        <h2 className="text-3xl font-semibold tracking-tight mt-8 mb-4">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam, eos.
        </h2>
        <p>
          Para más información, no dudes en ponerte en contacto con nosotros a
          través de nuestro{" "}
          <a href="mailto:ejemplo@gmail.com">correo electrónico</a>, o mediante
          nuestro <a href="tel:2284522717">WhatsApp</a>.
        </p>
      </div>
    </div>
  );
};
