import { createContext, useState, useContext } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";
import { useRouter } from "next/router";
import { DiaryContext } from "./DiaryContext";

export const EntryContext = createContext();

export const EntryProvider = ({ children }) => {
  const [entry, setEntry] = useState(null);
  const { user } = useContext(UserContext);
  const { handleGetAllEntries } = useContext(DiaryContext);
  const router = useRouter();
  const handleGetEntry = (entryId) => {
    axios
      .get(`http://localhost:3333/entry/getEntry/${entryId}`)
      .then((res) => {
        setEntry(res.data);
      })
      .catch((err) => console.log(err));
  };
  const handleAddEntry = (
    restaurant_name,
    entry_date,
    entry_meal,
    entry_alcohol,
    bathroom_experience,
    customer_experience,
    other,
    genre_id
  ) => {
    axios
      .post(`http://localhost:3333/entry/addToDiary/${user.user_id}`, {
        restaurant_name,
        entry_date,
        entry_meal,
        entry_alcohol,
        bathroom_experience,
        customer_experience,
        other,
        genre_id,
      })
      .then((res) => {
        console.log(res.data);
        handleGetAllEntries(user.user_id);
        router.push("/diary");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 511) {
          router.push("/auth");
        }
      });
  };

  const handleDeleteEntry = (entry_id) => {
    axios
      .delete(
        `http://localhost:3333/entry/deleteEntry?entry_id=${entry_id}&user_id=${user.user_id}`
      )
      .then((res) => {
        console.log(res.data);
        handleGetAllEntries(user.user_id);
      })
      .catch((err) => console.log(err));
  };

  const handleEditEntry = (
    entry_meal,
    entry_alcohol,
    bathroom_experience,
    customer_experience,
    other,
    entry_id
  ) => {
    axios
      .put(`http://localhost:3333/entry/editEntry/${user.user_id}`, {
        entry_meal,
        entry_alcohol,
        bathroom_experience,
        customer_experience,
        other,
        entry_id,
      })
      .then((res) => {
        console.log(res.data);
        handleGetEntry(entry_id);
      })
      .catch((err) => console.log(err));
  };

  return (
    <EntryContext.Provider
      value={{
        entry,
        setEntry,
        handleGetEntry,
        handleAddEntry,
        handleDeleteEntry,
        handleEditEntry,
      }}
    >
      {children}
    </EntryContext.Provider>
  );
};
