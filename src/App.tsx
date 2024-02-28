import './App.css'
import Footer from './blocks/footer'
import Header from './blocks/header'
import Main from './blocks/main/main'
import { NewsCategoryProvider } from './context/news-category'
import { SearchContextProvider } from './context/search'

function App() {
  return (
    <>
      <NewsCategoryProvider>
        <SearchContextProvider>
          <Header />
          <Main />
        </SearchContextProvider>
      </NewsCategoryProvider>
      <Footer />
    </>
  )
}

export default App
