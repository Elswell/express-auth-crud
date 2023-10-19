import { useState } from "preact/hooks";
import "./app.css";
import axios, { AxiosResponse } from "axios";

interface Response extends AxiosResponse {
  data: {
    accessToken: string;
  };
}

interface LoginPayload {
  email: string;
  password: string;
}

interface CurrentUserPayload {
  id: string;
}

export function App() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const USER_ID = "652f961222cec6c55ba0ffce";
  const URL = "http://localhost:5001";

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      const payload: LoginPayload = {
        email: email,
        password: password,
      };
      const res: Response = await axios.post(`${URL}/api/user/login`, payload);
      localStorage.setItem("accessToken", res.data.accessToken);
    } catch (error) {
      // TODO: handle error
    }
  };

  const handleCurrentUser = async (e: Event) => {
    e.preventDefault();
    try {
      const payload: CurrentUserPayload = {
        id: USER_ID,
      };

      const res = await axios.post(`${URL}/api/user/current`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log(res);
    } catch (error) {
      // TODO: handle error
    }
  };

  return (
    <>
      <section>
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
          <button type="submit">Submit</button>
        </form>

        <button onClick={(e) => handleCurrentUser(e)}>Get Current User</button>
      </section>
    </>
  );
}
