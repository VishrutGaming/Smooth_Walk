type SummaryProps = {
  totalItems: number;
  totalPrice: number;
};

const CartSummary: React.FC<SummaryProps> = ({ totalItems, totalPrice }) => {
  return (
    <div className="w-80 border rounded-lg p-5 h-max shadow-md bg-white ml-10 sticky top-20">

      <div className="bg-green-100 text-green-700 px-3 py-2 rounded text-sm font-medium mb-4">
        Your order is eligible for FREE Delivery.
      </div>

      <h3 className="text-lg font-semibold mb-3">
        Subtotal ({totalItems} items):{" "}
        <span className="font-bold text-xl">₹{totalPrice.toLocaleString()}</span>
      </h3>

      <label className="flex items-center gap-2 text-sm mb-4 cursor-pointer">
        <input type="checkbox" className="w-4 h-4" />
        <span>This order contains a gift</span>
      </label>

      <button className="bg-yellow-500 w-full py-2 rounded-lg font-semibold hover:bg-yellow-600 transition">
        Proceed to Buy
      </button>

      <details className="mt-4 text-sm">
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
