import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API_URL from "../../constants.js";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  const handleApi = (e) => {
    e.preventDefault();
    const data = { username, password, mobile, email };
    const url = API_URL + "/signup";
    axios
      .post(url, data)
      .then((res) => {
        console.log(res.data.message);
        alert(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
    setUsername("");
    setPassword("");
    setMobile("");
    setEmail("");
  };

  return (
    <form
      onSubmit={handleApi}
      className="w-full h-[50%] flex flex-col items-center justify-center py-8"
    >
      <h1 className="text-2xl font-semibold">Welcome to Signup page</h1>
      <label htmlFor="username" className="text-xl font-medium py-2">
        Username : &nbsp;
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border-[1px] border-black"
          required
        />
      </label>
      <label htmlFor="password" className="text-xl font-medium pb-2">
        Password : &nbsp;
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-[1px] border-black"
          required
        />
      </label>
      <label htmlFor="mobile" className="text-xl font-medium pb-2">
        Mobile : &nbsp;
        <input
          type="number"
          id="mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="border-[1px] border-black"
          required
        />
      </label>
      <label htmlFor="email" className="text-xl font-medium pb-2">
        Email : &nbsp;
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-[1px] border-black"
          required
        />
      </label>
      <div>
        <button
          className="px-4 py-2 text-lg font-semibold text-white rounded-md bg-blue-600 hover:bg-blue-700 m-2"
          type="submit"
        >
          Signup
        </button>
        <Link to="/login" className="font-medium underline hover:no-underline">
          Login
        </Link>
      </div>
    </form>
  );
}

export default Signup;
