// import React, { useState } from "react";
// import styles from "../styles/Login.module.css";
// import axios from "axios";
// import { BASE_URL } from "../config";
// import { useNavigate } from "react-router-dom";
// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const loginData = {
//       email: email,
//       password: password,
//     };
//     try {
//       const response = await axios.post(`${BASE_URL}/login`, loginData);
//       console.log("Login Successful:", response.data);
//       // Store token in local storage for future use
//       const token = response.data.token;
//       const role = response.data.roleName;
//       const roleId = response.data.roleId;
//       const email = response.data.email;
//       const departmentName = response.data.departmentName;
//       const departmentId = response.data.departmentId;
//       const userId = response.data.userId;
//       const data = {
//         token: token,
//         role: role,
//         roleId: roleId,
//         email: email,
//         departmentName: departmentName,
//         departmentId: departmentId,
//         userId: userId,
//       };
//       localStorage.setItem("mexcargoUserData", JSON.stringify(data));
//       alert("login successful");
//       navigate("/");
//       console.log(token);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <div className={styles.login_main_container}>
//         <div className={styles.formContainer}>
//           <p className={styles.title}>Welcome </p>
//           <form className={styles.form} onSubmit={handleSubmit}>
//             <input
//               type="email"
//               className={styles.input}
//               placeholder="Email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <input
//               type="password"
//               className={styles.input}
//               placeholder="Password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />

//             <button type="submit" className={styles.formBtn}>
//               Log in
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;

import React, { useState } from "react";
import styles from "../styles/Login.module.css";
import axios from "axios";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = { email, password };

    try {
      const response = await axios.post(`${BASE_URL}/login`, loginData);
      console.log("Login Successful:", response.data);
      const {
        token,
        roleName,
        roleId,
        email,
        departmentName,
        departmentId,
        userId,
      } = response.data;
      const data = {
        token,
        role: roleName,
        roleId,
        email,
        departmentName,
        departmentId,
        userId,
      };
      localStorage.setItem("mexcargoUserData", JSON.stringify(data));
      alert("Login successful");
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className={styles.login_main_container}>
      <div className={styles.formContainer}>
        <p className={styles.title}>Welcome</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="email"
            className={styles.input}
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              className={styles.input}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className={styles.eyeIcon} onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button type="submit" className={styles.formBtn}>
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
