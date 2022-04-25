// import React, { useState } from "react";
// import { loginUser } from "../axios-services/index";

// const Login = ({
//   setUser,
//   username,
//   setUsername,
//   password,
//   setPassword,
//   setIsLoggedIn,
//   setToken,
// }) => {
//   // the message to be displayed is the message received from the server
//   const [message, setMessage] = useState("");
//   const [clickedSubmit, setClickedSubmit] = useState(false);

//   return (
//     <div className="registration-page">
//       <h2>Welcome Back to the Chameleonaires' Reptile Shop!</h2>
//       <div className="form-container">
//         <form
//           onSubmit={async (e) => {
//             e.preventDefault();
//             try {
//               const response = await loginUser(username, password);
//               if (response.message === "you're logged in!") {
//                 setIsLoggedIn(true);
//                 setToken(response.token);
//                 localStorage.setItem("token", response.token);
//                 setUser(response.user);
//               }
//               setMessage(response.message);
//               setClickedSubmit(true);
//               setUsername("");
//               setPassword("");
//             } catch (error) {
//               console.error("There was a problem with your login.", error);
//             }
//           }}
//         >
//           <label>Username</label>
//           <input
//             type="text"
//             value={username}
//             placeholder="Username"
//             onChange={(e) => {
//               setUsername(e.target.value);
//             }}
//           />
//           <label>Password</label>
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => {
//               setPassword(e.target.value);
//             }}
//           />
//           <button type="submit">Login</button>
//         </form>
//         <span className="registration-confirm">
//           {clickedSubmit ? <p>{message}</p> : null}
//         </span>
//       </div>
//     </div>
//   );
// };
// export default Login;
import React, { useState } from "react";
import { loginUser } from "../axios-services";

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log({ username, password });
          const result = await loginUser(username, password);
          console.log(result);

          localStorage.setItem("token", result.data.token);
          const myToken = localStorage.getItem("token");
          console.log("the token", myToken);
          setToken(myToken);
        }}
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit"> LOGIN</button>
      </form>
    </div>
  );
};

export default Login;
