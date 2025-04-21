import { createContext, useContext, useState, useEffect } from "react";

const AvatarContext = createContext();

export const AvatarProvider = ({ children }) => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const [avatar, setAvatar] = useState(accessToken?.avatarURL);

  useEffect(() => {
    const syncAvatarAcrossTabs = (e) => {
      if (e.key === "accessToken") {
        const token = JSON.parse(e.newValue);
        setAvatar(token.avatarURL);
      }
    };

    window.addEventListener("storage", syncAvatarAcrossTabs);

    return () => {
      window.removeEventListener("storage", syncAvatarAcrossTabs);
    };
  }, []);

  //   useEffect(() => {
  //     // localStorage.setItem("avatar", avatar);
  //     accessToken.avatarURL = avatar;
  //   }, [avatar]);

  return (
    <AvatarContext.Provider value={{ avatar, setAvatar }}>
      {children}
    </AvatarContext.Provider>
  );
};

export const useAvatar = () => useContext(AvatarContext);
