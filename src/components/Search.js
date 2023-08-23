import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Octicon from "react-octicon";
import { CacheContext } from "../context/CacheContext";
import useDebounce from "../hooks/useDebounce";

const Wrapper = styled.div`
  padding: 8px;

  width: 100%;
  font-size: 16px;
  &:focus {
    outline: 0;
  }
`;

const ErrorText = styled.p`
  color: red;
  margin-top: 8px;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  padding: 6px;
  border-radius: 4px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  margin-left: 6px;
  width: 100%;
`;

const Search = ({ setGists }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  // const [publicGists, setPublicGists] = useState([]);
  const { getGistForUser,  initialPublicGists } =
    useContext(CacheContext);
  const debouncedUsername = useDebounce(username, 500);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setError(null);

        let data;
        if (debouncedUsername !== "") {
          data = await getGistForUser(debouncedUsername);
        } else {
          if (!initialPublicGists) {
            if (isMounted) {
              data = initialPublicGists;
            }
          } else {
            setGists(initialPublicGists);
          }
        }

        if (isMounted) {
          setGists(data);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    if (isMounted) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [debouncedUsername, getGistForUser, initialPublicGists, setGists]);

  return (
    <Wrapper>
      <InputBox>
        <Octicon name="search" />
        <Input
          type="text"
          placeholder="Search Gists for the username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </InputBox>
      {error && <ErrorText>{error}</ErrorText>}
    </Wrapper>
  );
};

export default Search;
