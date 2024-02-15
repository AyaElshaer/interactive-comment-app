export const TextArea = (props) => (
  <textarea
    {...props}
    className={`rounded-lg border border-grayish-blue p-4 w-full h-max resize-none focus:border placeholder:text-sm ${props.className}`}
  />
);
