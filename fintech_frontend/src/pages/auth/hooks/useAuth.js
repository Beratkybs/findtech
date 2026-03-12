import { useState } from "react";
import { useAuthentication } from "../../../../backend/store/useAuthentication.js";
import toast from "react-hot-toast";

export const useAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, signup, loading } = useAuthentication();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ username: "", password: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(formData);
      } else {
        await signup(formData);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Bir hata oluştu";
      toast.error(errorMessage);
    }
  };

  return {
    state: { isLogin, formData, loading },
    handlers: { handleInputChange, toggleMode, handleSubmit },
  };
};
