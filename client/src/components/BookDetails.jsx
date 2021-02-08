import { graphql } from 'react-apollo';

import { getBookQuery } from '../queries/queries';

const BookDetails = ({ data: { book } }) => {
  const displayBookDetails = () => {
    if (book) {
      const {
        name,
        genre,
        author: { name: authorName, books },
      } = book;

      return (
        <div>
          <h2>{name}</h2>
          <p>{genre}</p>
          <p>{authorName}</p>
          <p>All books by this author:</p>
          <ul className="other-books">
            {books.map(({ id, name: bookName }) => (
              <li key={id}>{bookName}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <div>No book selected...</div>;
    }
  };

  return (
    <div id="book-details">
      <p>Output book details</p>
      <div>{displayBookDetails()}</div>
    </div>
  );
};

export default graphql(getBookQuery, {
  options: props => {
    return {
      variables: {
        id: props.bookId,
      },
    };
  },
})(BookDetails);
