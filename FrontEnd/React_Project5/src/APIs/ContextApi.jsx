import react, {
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
} from "react";

const ContextAPI = createContext();

export const ContextProvider = ({ children }) => {
  const jwt_token = localStorage.getItem("JWT_TOKEN") || null;

  const [token, SetToken] = useState(jwt_token);
  const [currentUser, setCurrentUser] = useState(null);
  const [theme, SetTheme] = useState("dark");
  const [image, SetImage] = useState(null);
  const [result, SetResult] = useState("");

  const [Tapped, SetTapped] = useState(1);

  const fetchUser = async () => {
    const user = JSON.parse(localStorage.getItem("USER"));
    if (user?.username) {
      try {
        setCurrentUser(user);
      } catch (error) {
        console.error("Error fetching current user", error);
        toast.error("Error fetching current user");
      }
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  return (
    <ContextAPI.Provider
      value={{
        token,
        SetToken,
        currentUser,
        setCurrentUser,
        theme,
        SetTheme,
        image,
        SetImage,
        result,
        SetResult,
        Tapped,
        SetTapped,
      }}
    >
      {children}
    </ContextAPI.Provider>
  );
};

export const useMycontext = () => {
  const context = useContext(ContextAPI);
  if (!context) {
    throw new Error("useMyContext must be used within a ContextProvider");
  }
  return context;
};
