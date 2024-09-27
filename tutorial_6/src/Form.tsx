import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormValuesType = {
  name: string;
  email: string;
  channel: string;
};

let renderCount = 0;
function Form() {
  const form = useForm<FormValuesType>();
  const { register, control } = form;

  renderCount++;
  return (
    <>
      <h1>Rerendering the form {renderCount}</h1>
      <form className="bg-gray-700 w-full h-screen flex flex-col gap-4 items-center justify-center">
        <div className="w-full max-w-60">
          <label htmlFor="name" className="text-white">
            Name:
          </label>
          <br />
          <input
            type="text"
            id="name"
            className="w-full"
            {...register("name")}
          />
        </div>
        <div className="w-full max-w-60">
          <label htmlFor="email" className="text-white">
            Email:
          </label>
          <br />
          <input
            type="email"
            id="email"
            className="w-full"
            {...register("email")}
          />
        </div>
        <div className="w-full max-w-60">
          <label htmlFor="channel" className="text-white">
            Channel:
          </label>
          <br />
          <input
            type="text"
            id="channel"
            className="w-full"
            {...register("channel")}
          />
        </div>
        <div className="flex justify-end gap-2 w-full max-w-60">
          <button
            type="reset"
            className="rounded bg-gray-400 text-white p-2 px-4"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded bg-gray-600 text-white p-2 px-4"
          >
            Submit
          </button>
        </div>
      </form>
      <DevTool control={control} />
    </>
  );
}

export default Form;
