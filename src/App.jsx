import { useState, useEffect } from "react";
// import {
//   useQuery,
//   useQueryClient,
//   QueryClient,
//   QueryClientProvider,
// } from "@tanstack/react-query";

import NameForm from "./components/NameForm/NameForm";
import Users from "./components/Users/Users";

import { isEqual } from "underscore";

// const queryClient = new QueryClient();

const App = () => {
  const [users, setUsers] = useState([]);
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    // should be async get request
    setUsers(retrieveExistingUsersList());
  };

  const userExists = (newUserObj) => {
    for (let i = 0; i < users.length; i++) {
      const existingUserObj = users[i];
      if (isEqual(newUserObj, existingUserObj)) return true;
    }

    return false;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newUser = buildNewUser();

    // check if newUser exists in users array
    if (!userExists(newUser)) {
      const updatedUsersList = [newUser, ...retrieveExistingUsersList()];
      setUsers(updatedUsersList);
      localStorage.setItem("usersList", JSON.stringify(updatedUsersList));
    }

    setGivenName("");
    setFamilyName("");
  };

  const buildNewUser = () => {
    const joinedName = `${givenName} ${familyName}`;
    const charCodes = getCharCodes(joinedName);
    const asciiSum = sumCharCodes(charCodes);
    const binaryConversion = convertToBinary(asciiSum);
    return {
      givenName: givenName,
      familyName: familyName,
      asciiSum: asciiSum,
      binaryConversion: binaryConversion,
      consecutiveZeroes: calConsecutiveZeroes(binaryConversion),
    };
  };

  const getCharCodes = (str) => {
    let charCodeArr = [];

    for (let i = 0; i < str.length; i++) {
      const code = str.charCodeAt(i);
      charCodeArr.push(code);
    }

    return charCodeArr;
  };

  const sumCharCodes = (arr) => {
    return arr.reduce((acc, curr) => acc + curr);
  };

  const convertToBinary = (num) => {
    return parseInt(num).toString(2);
  };

  const calConsecutiveZeroes = (num) => {
    const splitNumArr = num.toString().split("1").filter(Boolean);
    let longestLength = 0;

    for (let i = 0; i < splitNumArr.length; i++) {
      const valueLength = splitNumArr[i].length;

      if (valueLength > longestLength) longestLength = valueLength;
    }

    return longestLength;
  };

  const retrieveExistingUsersList = () =>
    JSON.parse(localStorage.getItem("usersList")) || [];

  return (
    <div>
      <NameForm
        onSubmit={onSubmit}
        givenName={givenName}
        familyName={familyName}
        setGivenName={setGivenName}
        setFamilyName={setFamilyName}
      />
      <button
        onClick={() => {
          localStorage.clear();
          setUsers([]);
        }}
      >
        Clear Local Storage
      </button>
      <Users users={users} />
    </div>
  );
};

export default App;
