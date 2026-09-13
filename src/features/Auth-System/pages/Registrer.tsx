import { useMutation } from "@tanstack/react-query";
import PublicApiClient from "../../../api/publicApiClient";

const Registrer = () => {
  const mutation = useMutation({
    mutationFn: RegisterUser,
    onSuccess: OnSuccess,
    onError: OnError,
    onSettled: OnSettled,
  });

  // Success Funcion
  function OnSuccess(value: { message: string }) {
    console.log("This is will call when mutationFnSucess ", value);
  }

  // Error Funcion
  function OnError(value: Error) {
    console.log("This is will call when mutationFnError ", value);
  }

  //Function onSettle
  function OnSettled(
    data: { message: string } | undefined,
    error: Error | null,
    variables: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    },
  ) {
    console.log(
      "This is will call when mutationFnSucess ",
      error,
      data,
      variables,
    );
    setTimeout(() => {
      mutation.reset();
    }, 1000);
  }

  async function RegisterUser(submitValues: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    const RegisterApi = PublicApiClient("/auth/register", "POST", submitValues);
    return RegisterApi;
  }

  return (
    <main>
      <form
        onSubmit={async (submitEvenObj) => {
          submitEvenObj.preventDefault();

          const formData = new FormData(
            submitEvenObj.target as HTMLFormElement,
          );

          const firstName = formData.get("firstName");
          const lastName = formData.get("lastName");
          const email = formData.get("email");
          const password = formData.get("password");

          if (
            typeof firstName == "string" &&
            typeof lastName == "string" &&
            typeof email == "string" &&
            typeof password == "string"
          ) {
            const submitObjeValues = {
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: password,
            };
            const registerValues = mutation.mutate(submitObjeValues);
            return registerValues;
          }
        }}
      >
        <label htmlFor="firstName">FirstName</label>
        <input type="text" name="firstName" id="firstName" />
        <label htmlFor="lastName">lastName</label>
        <input type="text" name="lastName" id="lastName" />
        <label htmlFor="email">email</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">password</label>
        <input type="password" name="password" id="password" />
        <button type="submit" disabled={mutation.isPending}>
          Submit
        </button>
        {mutation.isError ? <p>{mutation.error.message}</p> : null}
        {mutation.isSuccess ? <p>{mutation.data.message}</p> : null}
      </form>
    </main>
  );
};

export default Registrer;
