import { useState } from "react";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

type cartprop = {
  cart: any;
};

export default function Header({ cart }: cartprop) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gray-500 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        <div className="text-2xl font-bold text-[#feab11]">Smooth Walk</div>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-white hover:text-black-600">
            Men
          </a>
          <a href="#" className="text-white hover:text-black-600">
            Women
          </a>
          <a href="#" className="text-white hover:text-black-600">
            Kids
          </a>
          <button className="text-white hover:text-black-600">
            <div className="relative">
              <ShoppingCartIcon className="w-6 h-6 text-white hover:text-black-600" />

              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cart.length??0}
              </span>
            </div>
          </button>
        </nav>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {isOpen ? (
            <XMarkIcon className="w-6 h-6 text-white" />
          ) : (
            <Bars3Icon className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col items-center space-y-3 pb-4 bg-white border-t">
          <a href="#" className="text-gray-700 hover:text-[#feab11]">
            Men
          </a>
          <a href="#" className="text-gray-700 hover:text-[#feab11]">
            Women
          </a>
          <a href="#" className="text-gray-700 hover:text-[#feab11]">
            Kids
          </a>

          <button className="text-gray-700 hover:text-[#feab11]">
            <div className="relative">
              <ShoppingCartIcon className="w-6 h-6 text-gray-700 hover:text-[#feab11]" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
               {cart.length??0}
              </span>
            </div>
          </button>
        </div>
      )}
    </header>
  );
}
