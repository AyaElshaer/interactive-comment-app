/* eslint-disable react/prop-types */

export const ActionButton = (props) => (
  <button
    {...props}
    className={`w-20 lg:w-20 text-white rounded-lg bg-moderate-blue px-6 py-2 hover:opacity-50 uppercase text-xs h-10 flex justify-center items-center ${props.className}`}
  />
);
