const React = require("react");
const Default = require("./layouts/Default");

function New({ bakers }) {
  return (
    <Default>
      <h2>Add a new bread</h2>
      <form action="/breads" method="POST">
        <label htmlFor="name">Name</label>
        <input type={"text"} name={"name"} id={"id"} required />
        <label htmlFor="image">Image</label>
        <input type={"text"} name={"image"} id={"id"} />

        <label htmlFor="baker">Baker</label>
        <select name="baker" id="baker">
          {bakers.map((baker) => {
            return (
              <option value={baker.id} key={baker.id}>
                {baker.name}
              </option>
            );
          })}
        </select>

        <label htmlFor="hasGluten">Has Gluten?</label>
        <input
          type={"checkbox"}
          name="hasGluten"
          id="hasGluten"
          defaultChecked
        />
        <br />
        <input type={"submit"} value="Add Bread" />
      </form>

      <div className="backButton">
        <a href="/breads">
          <button>Go back to the index</button>
        </a>
      </div>
    </Default>
  );
}

module.exports = New;
