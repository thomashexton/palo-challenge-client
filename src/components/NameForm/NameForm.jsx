const NameForm = ({
  onSubmit,
  givenName, // val
  familyName, // val
  setGivenName, // fn
  setFamilyName, // fn
}) => {
  return (
    <form action="" onSubmit={onSubmit}>
      <label htmlFor="given-name">
        Given name:
        <input
          onChange={(e) => setGivenName(e.target.value.trim())}
          type="text"
          id="given-name"
          value={givenName}
          placeholder="John"
        />
      </label>
      <label htmlFor="family-name">
        Family name:
        <input
          onChange={(e) => setFamilyName(e.target.value.trim())}
          type="text"
          id="family-name"
          value={familyName}
          placeholder="Smith"
        />
      </label>
      <input type="submit" value="?" />
    </form>
  );
};

export default NameForm;
