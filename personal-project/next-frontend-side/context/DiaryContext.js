import { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";

export const DiaryContext = createContext();

export const DiaryProvider = ({ children }) => {
  const [diary, setDiary] = useState(null);
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (user) {
      handleGetAllEntries(user.user_id);
    }
  }, [user]);
  const handleGetAllEntries = (userId) => {
    axios
      .get(`http://localhost:3333/diary/getAllEntries/${userId}`)
      .then((res) => setDiary(res.data))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <DiaryContext.Provider value={{ diary, setDiary, handleGetAllEntries }}>
      {children}
    </DiaryContext.Provider>
  );
};
