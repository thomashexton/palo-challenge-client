const Users = ({ users }) => {
  return (
    <div className="users">
      {!users.length ? (
        <h1>No users found.</h1>
      ) : (
        users.map((user) => {
          return (
            <>
              <p key={user.asciiSum}>
                {user.familyName}, {user.givenName}
              </p>
              <p>{user.consecutiveZeroes}</p>
            </>
          );
        })
      )}
    </div>
  );
};

export default Users;
