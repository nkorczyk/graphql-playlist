import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

const AddBook = props => {
  const displayAuthors = () => {
    const {
      data: { authors, loading },
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

  return (
    <form id="add-book">
      <div className="field">
        <label>Book name:</label>
        <input type="text" />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text" />
      </div>
      <div className="field">
        <label>Author:</label>
        <select>
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};

export default graphql(getAuthorsQuery)(AddBook);
