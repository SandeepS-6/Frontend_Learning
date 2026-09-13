import { useMutation } from "@tanstack/react-query";
import PublicApiClient from "../../../api/publicApiClient";

const Login = () => {
  //mutaiton sucess
  const OnSuccess = (sucess: { message: string }) => {
    console.log(sucess.message);
  };

  // whenn mutaitoin fails
  const OnError = (error: Error) => {
    console.log(error.message);
  };

  // onSettle after success and fail
  const OnSettiled = (
    data: object | undefined,
    error: Error | null,
    variables: {
      email: string;
      password: string;
    },
  ) => {
    try {
      if (!data) {
      } else {
        console.log(data);
      }
      if (error == null) {
      } else {
        console.log(error.message);
      }
      throw variables;
    } catch (values) {
      console.log(values);
    }
    setTimeout(() => {
      mutaiton.reset();
    }, 1000);
  };

  const mutaiton = useMutation({
    mutationFn: LoginUser,
    onSuccess: OnSuccess,
    onError: OnError,
    onSettled: OnSettiled,
  });

  async function LoginUser(loginObj: { email: string; password: string }) {
    return PublicApiClient("/auth/login", "POST", loginObj);
  }

  return (
    <main>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);

          const email = formData.get("email");
          const password = formData.get("password"); // FormData.get() → string | File | null
          // making the union type to narrow type using the typGuard
          if (typeof email == "string" && typeof password == "string") {
            const loginValues = {
              email: email,
              password: password,
            };
            const loginAsync = mutaiton.mutate(loginValues);
            return loginAsync;
          } else {
            throw new Error("Errorr");
          }
        }}
      >
        <label htmlFor="email">Enter Your Email</label>
        <input type="email" placeholder="Enter Your Email" name="email" />
        <label htmlFor="password">Enter Your Password</label>
        <input
          type="password"
          placeholder="Enter Your Password"
          name="password"
        />
        <button type="submit" disabled={mutaiton.isPending}>
          Submit
        </button>
        {mutaiton.isSuccess ? <p>{mutaiton.data.message}</p> : null}
        {mutaiton.isError ? <p>{mutaiton.error.message}</p> : null}
      </form>
    </main>
  );
};

export default Login;
