import { useEffect, useState } from "react";
import img from "./../assets/loginBg.avif";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUserDetails } from "../Context/AppContext";

function Auth() {
  const { setuser } = useUserDetails();
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL;

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API}/api/users`);
        setUsers(response.data.users);
      } catch (err: any) {
        console.log("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, [API]);

  // Login
  const handleLogin = () => {
    const matchedUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (matchedUser) {
      toast.success("Login Successful");
      setuser(email);
      localStorage.setItem("user", JSON.stringify(email));
      setError("");
      navigate("/Dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  // Signup
  const handleSignup = async () => {
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const emailExists = users.find((user) => user.email === email);
    if (emailExists) {
      setError("Email already exists");
      return;
    }

    try {
      const response = await axios.post(`${API}/api/signup`, {
        email,
        password,
      });

      if (response.data.success) {
        toast.success("Signup successful");
        setUsers([...users, { email, password }]);
        setIsLogin(true);
      }
    } catch (err: any) {
      console.log(err);
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="h-screen flex">
      <div
        className="hidden md:block w-full bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${img})` }}
      ></div>

      <div className="w-full md:w-1/2 flex flex-col bg-gray-500 p-10 h-full gap-8">
        <div className="flex justify-center items-center mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl text-[#feab11] font-extrabold tracking-wider drop-shadow-lg whitespace-nowrap">
            Smooth Walk
          </h1>
        </div>

        <div className="grow p-2">
          <div className="flex justify-center mb-4">
            <h2 className="cursor-pointer text-3xl font-extrabold text-amber-500 tracking-wide drop-shadow-md ">
              {isLogin ? "Log In" : "Sign Up"}
            </h2>
          </div>

          <div className="mt-3 flex flex-col gap-5">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              className="w-full p-3 rounded-lg bg-gray-900 text-amber-50 placeholder-amber-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Enter email"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-900 text-amber-50 placeholder-amber-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Enter password"
            />

            {!isLogin && (
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-900 text-amber-50 placeholder-amber-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="Confirm password"
              />
            )}

            {error && <p className="text-red-500">{error}</p>}

            <button
              onClick={isLogin ? handleLogin : handleSignup}
              className="w-full mt-4 p-3 rounded-lg bg-amber-500 text-gray-900 font-bold hover:bg-amber-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-300"
            >
              {isLogin ? "Log In" : "Sign Up"}
            </button>

            <div className="mt-4 text-center">
              <span className="text-gray-300">
                {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}
              </span>
              <button
                onClick={toggleForm}
                className="text-amber-500 font-semibold hover:underline hover:text-amber-400 transition-colors duration-200"
              >
                {isLogin ? "Create Account" : "Log In"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
