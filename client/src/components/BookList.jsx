import { useState } from 'react';
import { graphql } from 'react-apollo';

import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

const BookList = props => {
  const [selected, setSelected] = useState(null);

  const displayBooks = () => {
    const {
      data: { books, loading },
    } = props;

    if (loading) {
      return <div>Loading Books...</div>;
    } else {
      return books.map(({ name, id }) => {
        const handleClick = () => {
          setSelected(id);
        };

        return (
          <li key={id} onClick={handleClick}>
            {name}
          </li>
        );
      });
    }
  };

  return (
    <div>
      <ul id="book-list">{displayBooks()}</ul>
      <BookDetails bookId={selected} />
    </div>
  );
};

export default graphql(getBooksQuery)(BookList);
