import axios, { AxiosResponse } from "axios";
import { useState } from "preact/hooks";

interface Response extends AxiosResponse {
  data: {
    accessToken: string;
  };
}

interface LoginPayload {
  email: string;
  password: string;
}

const LoginForm = ({}) => {
  const URL = "http://localhost:5001";
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      const payload: LoginPayload = {
        email: email,
        password: password,
      };
      const res: Response = await axios.post(`${URL}/api/user/login`, payload, {
        withCredentials: true,
      });
      localStorage.setItem("accessToken", res.data.accessToken);
    } catch (error) {
      console.log(error);
      // TODO: handle error
    }
  };

  return (
    <form className="form" onSubmit={(e) => handleSubmit(e)}>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <input
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
