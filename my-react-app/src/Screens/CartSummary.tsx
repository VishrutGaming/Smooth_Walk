type SummaryProps = {
  totalItems: number;
  totalPrice: number;
};

const CartSummary: React.FC<SummaryProps> = ({ totalItems, totalPrice }) => {
  return (
    <div className="w-full md:w-80 border rounded-2xl p-6 shadow-lg bg-white md:ml-10 md:sticky md:top-20  flex flex-col">
      <div className="bg-green-100 text-green-700 px-3 py-2 rounded text-sm font-medium mb-4 text-center">
        Your order is eligible for FREE Delivery.
      </div>
      <img
        src="https://cdn-icons-png.flaticon.com/512/891/891462.png"
        alt="Delivery Truck"
        className="w-32 mx-auto mb-5 animate-float transition-transform duration-300 hover:scale-110"
      />

      <h3 className="text-lg font-semibold mb-3">
        Subtotal ({totalItems} items):{" "}
        <span className="font-bold text-xl">
          ₹{totalPrice.toLocaleString()}
        </span>
      </h3>

      <button className="bg-yellow-500 w-full py-2 rounded-lg font-semibold hover:bg-yellow-600 transition">
        Proceed to Buy
      </button>

      <details className="mt-4 text-sm" open>
        <summary className="cursor-pointer font-semibold text-gray-700">
          EMI Available
        </summary>
        <p className="mt-2 text-gray-600">
          Pay in easy monthly installments with select bank cards.
        </p>
      </details>
    </div>
  );
};

export default CartSummary;
