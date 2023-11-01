import "./app.css";
import axios from "axios";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

interface CurrentUserPayload {
  id: string;
}

export function App() {
  const USER_ID = "652f961222cec6c55ba0ffce";

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
      <section className="wrapper">
        <RegisterForm />
        <LoginForm />
        <button onClick={(e) => handleCurrentUser(e)}>Get Current User</button>
      </section>
    </>
  );
}
