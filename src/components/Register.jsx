// import React, { useState } from "react";
// import { registerUser } from "../axios-services";
// // see login component for specific notes
// const Register = ({
//   setUser,
//   username,
//   setUsername,
//   password,
//   setPassword,
//   setIsLoggedIn,
//   setToken,
// }) => {
//   const [message, setMessage] = useState("");
//   const [clickedSubmit, setClickedSubmit] = useState(false);

//   return (
//     <div className="registration-page">
//       <h2>Welcome to the Chameleonaires' Reptile Shop!</h2>
//       <div className="form-container">
//         <form
//           onSubmit={async (e) => {
//             e.preventDefault();
//             try {
//               const response = await registerUser(username, password);
//               if (response.message === "you're signed up!") {
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
//               console.error(
//                 "There was a problem with your registration.",
//                 error
//               );
//             }
//           }}
//         >
//           <label>Username:</label>
//           <input
//             type="text"
//             value={username}
//             placeholder="Username"
//             onChange={(e) => {
//               setUsername(e.target.value);
//             }}
//           />
//           <label>Password:</label>
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => {
//               setPassword(e.target.value);
//             }}
//           />
//           <button type="submit">Register</button>
//         </form>
//         <span className="registration-confirm">
//           {clickedSubmit ? <p>{message}</p> : null}
//         </span>
//       </div>
//     </div>
//   );
// };

// export default Register;
import React, { useState } from "react";
import { registerUser } from "../axios-services";

const Register = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email,setEmail]=useState("")

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const result = await registerUser(username, password,email);
          localStorage.setItem("token", result.data.token);
          const myToken = localStorage.getItem("token");
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
        <input
          type="text"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>



        {/* <input
          type="text"
          placeholder="Verify Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input> */}
        <button type="submit"> REGISTER</button>
      </form>
    </div>
  );
};

export default Register;
