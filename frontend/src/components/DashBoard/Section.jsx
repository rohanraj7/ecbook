import React, { useEffect, useState } from 'react';
import axios from '../../Axios';
import { getBooks, url } from '../../constants/Constants';
import PdfFile from './PdfFile';
import { PDFDownloadLink } from '@react-pdf/renderer';

const Section = ({ setTBooks, query }) => {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Default to page 1

    useEffect(() => {
        if (!query) {
            // If there's no search query, fetch books
            fetchBooks();
        } else {
            // If there's a search query, set books directly from the query prop
            setBooks(query.results);
        }
    }, [query, currentPage]); // Refetch books when query or currentPage changes

    const fetchBooks = async () => {
        try {
            let endpoint = `${getBooks}?page=${currentPage}`;
            const response = await axios.get(endpoint);
            setBooks(response.data.results);
            // console.log(, "the total objects books");
            setTBooks(response.data.count);
        } catch (error) {
            console.error('Error fetching book information:', error);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-2">
                <ul role="list" className="grid sm:grid-cols-4 sm:gap-y-16 xl:col-span-2">
                    {books.length > 0 ? (
                        books.map((book) => (
                            <li key={book.id}>
                                <div className="gap-x-6">
                                    {book.photo && (
                                        <img className="h-32 w-24 rounded" src={url + book.photo} alt="photo" />
                                    )}
                                    <div>
                                        <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{book.title}</h3>
                                        <p className="text-sm font-semibold leading-6 text-indigo-600">Author: {book.author.name}</p>
                                        <p className='text-sm'>Language: {book.language}</p>
                                        <p className='text-sm'>Subject: {book.subjects[0].name}</p>
                                        <p className='text-sm'>Genre: {book.genre}</p>
                                        {/* <button className='text-red-500' onClick={() => { "handlePDF(book.id)" }}>PDF</button> */}
                                        <PDFDownloadLink  document={<PdfFile book={book} />} fileName="book.pdf">
                                            {({ loading, error }) => {
                                                if (loading) return <button>Loading Document</button>;
                                                if (error) return <button>Error: {error.message}</button>;
                                                return <button className='text-red-500'>Download</button>;
                                            }}
                                        </PDFDownloadLink>
                                    </div>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>No books available</p>
                    )}
                </ul>
            </div>
            {/* Pagination controls */}
            {query ? null : ( // Render pagination only if there's no search query
                <>
                    <h1 className='text-center mt-5'>PAGE NO</h1>
                    <div className="flex gap-6 justify-center">
                        {currentPage > 1 && (
                            <button className='text-red-600' onClick={() => handlePageChange(currentPage - 1)}>Prev</button>
                        )}
                        <span className='text-green-600'>{currentPage}</span>
                        {books.length === 20 && (
                            <button className='text-red-500' onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Section;
