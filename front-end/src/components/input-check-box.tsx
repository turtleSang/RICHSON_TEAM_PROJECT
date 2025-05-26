import { HTMLAttributes } from "react";

export default function InputCheckBox({
  id,
  name,
  checked,
  ...props
}: {
  id: string;
  name: string;
  checked: boolean;
} & HTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-row items-center">
      <label
        className="border-2 border-text text-text  cursor-pointer rounded-xl px-4 my-3 duration-200 has-checked:bg-btnBg has-checked:text-background has-checked:border-btnBg"
        htmlFor={`${id}-${name}`}
      >
        {name}
        <input
          id={`${id}-${name}`}
          name={name}
          type="checkbox"
          className="hidden"
          checked={checked}
          {...props}
        />
      </label>
    </div>
  );
}
