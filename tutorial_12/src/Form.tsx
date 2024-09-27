import { Controller, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormValuesType = {
  name: string;
  email: string;
  channel: string;
  date: string;
};

let renderCount = 0;
function Form() {
  const form = useForm<FormValuesType>({
    defaultValues: {
      name: "Fatman",
      email: "fatman@gmail.com",
      channel: "YOU_TUBE",
      date: "21.07.2004",
    },
    // defaultValues: async () => {
    //   const user = await fetch("https://fakestoreapi.com/users/1");
    //   const userResponse = await user.json();
    //   return { name: userResponse.name };
    // },
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const formatDate = (input: string) => {
    let value = input.replace(/\D/g, "");

    // Ensure day is not more than 31
    if (value.length >= 2) {
      let day = parseInt(value.substring(0, 2), 10);
      if (day > 31) day = 31;
      value = day.toString().padStart(2, "0") + value.substring(2);
    }

    // Insert dot after the day
    if (value.length > 2) {
      value = value.substring(0, 2) + "." + value.substring(2);
    }

    // Ensure month is not more than 12
    if (value.length >= 5) {
      let month = parseInt(value.substring(3, 5), 10);
      if (month > 12) month = 12;
      value =
        value.substring(0, 3) +
        month.toString().padStart(2, "0") +
        value.substring(5);
    }

    // Insert dot after the month
    if (value.length > 5) {
      value = value.substring(0, 5) + "." + value.substring(5);
    }

    // Ensure year is limited to 4 digits
    if (value.length > 10) {
      value = value.substring(0, 10); // Limit to dd.mm.yyyy
    }

    return value;
  };

  const submitForm = (data: FormValuesType) => {
    console.log("form submitted", data);
  };
  renderCount++;

  return (
    <>
      <form
        className="bg-gray-700 w-full h-screen flex flex-col gap-4 items-center justify-center"
        onSubmit={handleSubmit(submitForm)}
        noValidate
      >
        <h1 className="text-2xl text-white">
          Rerendering the form {renderCount}
        </h1>
        <div className="w-full max-w-60">
          <label htmlFor="name" className="text-white">
            Name:
          </label>
          <br />
          <input
            type="text"
            id="name"
            className="w-full"
            {...register("name", {
              required: "Name should be present",
              validate: (fieldValue, otherFieldValues) => {
                console.log(fieldValue, otherFieldValues);
                return (
                  "Mirsaid".toLocaleLowerCase() !== fieldValue ||
                  "Hell no man is that really u?"
                );
              },
            })}
          />
          <p className="text-red-500 text-sm">{errors.name?.message}</p>
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
            {...register("email", {
              required: "Email is important mf",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Invalid email address",
              },
              validate: {
                isThatMyEmail(fieldValue) {
                  return (
                    fieldValue !== "mir21.07.2004@gmail.com" ||
                    "what a hell is that my email"
                  );
                },
              },
            })}
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
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
            {...register("channel", { required: "write channel name" })}
          />
          <p className="text-red-500 text-sm">{errors.channel?.message}</p>
        </div>
        <div className="w-full max-w-60">
          <label htmlFor="channel" className="text-white">
            Date:
          </label>
          <br />
          <Controller
            name="date"
            control={control}
            rules={{
              required: "Date is required",
              pattern: {
                value: /^\d{2}\.\d{2}\.\d{4}$/,
                message: "Invalid date format",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <div className="w-full">
                <input
                  {...field}
                  placeholder="dd.mm.yyyy"
                  onChange={(e) => {
                    const { selectionStart } = e.target; // Store cursor position
                    const formattedValue = formatDate(e.target.value);
                    field.onChange(formattedValue);
                    setTimeout(() => {
                      e.target.selectionStart = e.target.selectionEnd =
                        selectionStart ? selectionStart + 1 : selectionStart; // Restore cursor position
                    }, 0);
                  }}
                  className="w-full"
                  value={field.value}
                />
                {error && (
                  <p className="text-red-500 text-sm">{error.message}</p>
                )}
              </div>
            )}
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
