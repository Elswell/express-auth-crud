import axios from "axios";
import { useState } from "preact/hooks";

interface RegisterPayload {
  email: string;
  password: string;
  username: string;
}

const RegisterForm = ({}) => {
  const URL = "http://localhost:5001";
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const handleRegister = async (e: Event) => {
    e.preventDefault();
    if (!email || !password || !username) {
      console.log("doesnt run");
      return;
    }

    console.log("runs");

    try {
      const payload: RegisterPayload = {
        email,
        password,
        username,
      };

      const res = await axios.post(`${URL}/api/user/register`, payload);
      console.log(res);
    } catch (error) {
      // TODO: handle error
      console.log(error);
    }
  };
  return (
    <form className="form" onSubmit={(e) => handleRegister(e)}>
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
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.currentTarget.value)}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
