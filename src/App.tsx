import { useState } from 'react'
import './App.css'
import Navbar from './blocks/navbar/navbar'
import MainContainer from './blocks/main/main'
import Header from './blocks/main/header/header'
import Footer from './blocks/footer/footer'
import BookGrid from './blocks/main/book-grid/book-grid'
import BookCard from './components/book-grid-card/card'
import { dummyBookData } from './lib/dummy-book-data'
import { filterByTitleValue } from './lib/filter'

function App() {
  const bookData = [...dummyBookData];
  const [filteredData, setfilteredData] = useState<typeof bookData>(bookData);

  function onFilter(needle: string) {
    if (needle.length > 0) {
      const data = filterByTitleValue(bookData, 'title', needle);
      setfilteredData(data);
    } else {
      setfilteredData(bookData);
    }
  }

  function onSorting(type: string) {
    switch (type) {
      case "name_asc":
        console.log(type);
        setfilteredData([...filteredData].sort((a, b) => a.title.localeCompare(b.title)));
        break;

      case "name_desc":
        setfilteredData([...filteredData].sort((a, b) => b.title.localeCompare(a.title)));
        break;

      case "year_asc":
        setfilteredData([...filteredData].sort((a, b) => a.publicationYear - b.publicationYear));
        break;

      case "year_desc":
        setfilteredData([...filteredData].sort((a, b) => b.publicationYear - a.publicationYear));
        break;

      default:
        break;
    }
    if (filteredData.length > 0) {
    }
  }

  return (
    <>
      <Navbar />
      <MainContainer>
        <Header onFilter={onFilter} onSorting={onSorting} />
        <BookGrid>
          <></>
          {(filteredData || bookData).map((book, bookIdx) => (
            <BookCard key={bookIdx} book={book} />
          ))}
        </BookGrid>
      </MainContainer>
      <Footer />
    </>
  )
}

export default App
