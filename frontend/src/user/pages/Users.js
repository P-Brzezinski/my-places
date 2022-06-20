import React from "react";

import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Max Schwarz",
      image:
        "https://images.pexels.com/photos/12211618/pexels-photo-12211618.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      places: 3,
    },
  ];

  return <UsersList items={USERS} />;
};

export default Users;
