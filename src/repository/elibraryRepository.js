import axios from "../custom-axios/axios";

const ELibraryService = {
    fetchBooks:() => {
        return axios.get("/books");
    },
    fetchCategories:() => {
        return axios.get("/categories")
    },
    fetchAuthors:() => {
        return axios.get("/authors")
    },
    getBook:(id) => {
        return axios.get(`/books/${id}`)
    },
    editBook:(id, name, category, author, availableCopies) => {
        return axios.put(`/books/edit/${id}`, {
            "name":name,
            "category":category,
            "author":author,
            "availableCopies":availableCopies
        })
    },
    deleteBook:(id) => {
        return axios.delete(`/books/delete/${id}`)
    },
    markAsTakenBook:(id) => {
        return axios.get(`/books/markAsTaken/${id}`)
    }
}

export default ELibraryService;