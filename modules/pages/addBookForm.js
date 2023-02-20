const addBookForm = () => `
    <form action="">
    <h1>Add a new book</h1>

    <div class="form-group">
      <input type="text" placeholder="Title" required name="title" />
    </div>
    <div class="form-group">
      <input type="text" placeholder="Author" required name="author" />
    </div>

    <div class="form-group">
      <button type="submit">Add</button>
    </div>
  </form>
    `;

export default addBookForm;
