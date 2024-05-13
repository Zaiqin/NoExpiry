import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../AuthGoogle.css";

const AuthGoogle = () => {
  const navigate = useNavigate(); // Access the navigate function

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate("/home"); // Navigate to /home after successful sign-in
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert(error.message);
      });
  };

  return (
    <button className="login-with-google-btn" onClick={handleGoogleSignIn}>
      Sign in with Google
    </button>
  );
};

export default AuthGoogle;