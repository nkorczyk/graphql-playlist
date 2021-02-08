import { useState } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';

import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

const AddBook = props => {
  const [book, setBook] = useState({ name: '', genre: '', authorId: '' });

  const displayAuthors = () => {
    const {
      getAuthorsQuery: { authors, loading },
    } = props;

    if (loading) {
      return <option disabled>Loading Authors...</option>;
    } else {
      return authors.map(({ name, id }) => (
        <option key={id} value={id}>
          {name}
        </option>
      ));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const { addBookMutation } = props;

    addBookMutation({
      variables: book,
      refetchQueries: [{ query: getBooksQuery }],
    });
  };

  return (
    <form id="add-book" onSubmit={handleSubmit}>
      <div className="field">
        <label>Book name:</label>
        <input
          type="text"
          onChange={({ target: { value } }) => setBook({ ...book, name: value })}
        />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          onChange={({ target: { value } }) => setBook({ ...book, genre: value })}
        />
      </div>
      <div className="field">
        <label>Author:</label>
        <select onChange={({ target: { value } }) => setBook({ ...book, authorId: value })}>
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' }),
)(AddBook);
