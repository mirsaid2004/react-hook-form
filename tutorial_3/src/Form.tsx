import { useForm } from "react-hook-form";

function Form() {
  const form = useForm();
  return (
    <form className="bg-gray-700 w-full h-screen flex flex-col gap-4 items-center justify-center">
      <div className="w-full max-w-60">
        <label htmlFor="name" className="text-white">
          Name:
        </label>
        <br />
        <input type="text" name="name" id="name" className="w-full" />
      </div>
      <div className="w-full max-w-60">
        <label htmlFor="email" className="text-white">
          Email:
        </label>
        <br />
        <input type="email" name="email" id="email" className="w-full" />
      </div>
      <div className="w-full max-w-60">
        <label htmlFor="channel" className="text-white">
          Channel:
        </label>
        <br />
        <input type="text" name="channel" id="channel" className="w-full" />
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
  );
}

export default Form;
