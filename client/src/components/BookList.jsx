import { graphql } from 'react-apollo';

import { getBooksQuery } from '../queries/queries';

const BookList = props => {
  const displayBooks = () => {
    const {
      data: { books, loading },
    } = props;

    if (loading) {
      return <div>Loading Books...</div>;
    } else {
      return books.map(({ name, id }) => <li key={id}>{name}</li>);
    }
  };

  return (
    <div>
      <ul id="book-list">{displayBooks()}</ul>
    </div>
  );
};

export default graphql(getBooksQuery)(BookList);
