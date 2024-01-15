/* eslint-disable react/prop-types */

export default function ActionButton({label}) {
  return (
    <button className="w-20 lg:w-20 text-white rounded-lg bg-moderate-blue px-6 py-2 hover:opacity-50 uppercase text-sm h-10 flex justify-center items-center">
      {label}
    </button>
  );
}
