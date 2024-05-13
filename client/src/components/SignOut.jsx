import { signOut, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignOut = () => {
    const auth = getAuth();
    const navigate = useNavigate(); // Access the navigate function
    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log("Sign Out")
                navigate("/");
            })
            .catch((error) => console.log(error));
    };
    return (
        <button onClick={handleSignOut}>Sign Out</button>
    );
};

export default SignOut;