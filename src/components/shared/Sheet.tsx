import { useEffect, useRef } from "react";
import { useGlobalStore } from "../../store/global.store";
import { Cart } from "./Cart";
import { Search } from "./Search";

export const Sheet = () => {
  const sheetContent = useGlobalStore((state) => state.sheetContent);
  const closeSheet = useGlobalStore((state) => state.closeSheet);

  const sheetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        sheetRef.current &&
        !sheetRef.current.contains(event.target as Node)
      ) {
        closeSheet();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [closeSheet]);

  const renderContent = () => {
    switch (sheetContent) {
      case "cart":
        return <Cart />;
      case "search":
        return <Search />;
      default:
        return null;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end animate-fadeIn"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div
        ref={sheetRef}
        className="bg-black text-pink-300 border-1 border-pink-300 h-screen w-[500px] shadow-lg"
      >
        {renderContent()}
      </div>
    </div>
  );
};
