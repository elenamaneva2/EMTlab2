import logo from '../../logo.svg';
import './App.css';
import {Component} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ELibraryService from "../../repository/elibraryRepository";
import Books from '../books/booksList/books';
import BookEdit from "../books/bookEdit/bookEdit";
import BookAdd from "../books/bookAdd/bookAdd";
import Categories from '../categories/categories';
import Header from '../head/header';

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      categories: [],
      authors: [],
      selectedBook: {}
    }
  }

  render() {
    return (
        <Router>
          <Header/>
          <main>
            <div className="container">
              <Routes>
                <Route path="/categories" element={<Categories
                    categories={this.state.categories}/>}/>
                <Route path="/books/add" element={<BookAdd
                    categories={this.state.categories} authors={this.state.authors} onAddBook={this.addBook}/>}/>
                <Route path="/books/edit/:id" element={<BookEdit
                    book={this.state.selectedBook} categories={this.state.categories} authors={this.state.authors}
                    onEditBook={this.editBook}/> }/>
                <Route path="/books" element={<Books
                    books={this.state.books} onEdit={this.getBook} onDelete={this.deleteBook}
                    onMarkAsTaken={this.markAsTakenBook}/>}/>
                <Route path="/" element={<Books
                    books={this.state.books} onEdit={this.getBook} onDelete={this.deleteBook}
                    onMarkAsTaken={this.markAsTakenBook}/>}/>
              </Routes>
            </div>
          </main>
        </Router>
    );
  }

  componentDidMount() {
    this.loadBooks();
    this.loadCategories();
    this.loadAuthors();
  }

  loadBooks = () => {
    ELibraryService.fetchBooks()
        .then((data) => {
          this.setState({
            books: data.data
          })
        });
  }

  loadCategories = () => {
    ELibraryService.fetchCategories()
        .then((data) => {
          this.setState({
            categories: data.data
          })
        })
  }

  loadAuthors = () => {
    ELibraryService.fetchAuthors()
        .then((data) => {
          this.setState({
            authors: data.data
          })
        })
  }

  getBook = (id) => {
    ELibraryService.getBook(id)
        .then((data) => {
          this.setState({
            selectedBook: data.data
          })
        })
  }

  editBook = (id, name, category, author, availableCopies) => {
    ELibraryService.editBook(id, name, category, author, availableCopies)
        .then(() => {
          this.loadBooks()
        })
  }

  deleteBook = (id) => {
    ELibraryService.deleteBook(id)
        .then(() => {
          this.loadBooks()
        })
  }

  markAsTakenBook = (id) => {
    ELibraryService.markAsTakenBook(id)
        .then(() => {
          this.loadBooks()
        })
  }

  addBook = (name, category, author, availableCopies) => {
    ELibraryService.addBook(name, category, author, availableCopies)
        .then(() => {
          this.loadBooks()
        })
  }
}

export default App;