// import React, { useContext, useEffect, useState } from 'react'
// import AuthContext from '../../Context/AuthContext'
// import { useNavigate } from 'react-router-dom'
// import Header from '../../components/DashBoard/Header'
// import Section from '../../components/DashBoard/Section'

// const HomePage = () => {
//     const { user } = useContext(AuthContext)
//     const navigate = useNavigate()

//     useEffect(() => {
//         if(user){
//             navigate('/')
//         }
//         console.log(user,"the valueeeea")
//     }, [])

//     const [query,setQuery] = useState('')
//     const [TBooks, setTBooks] = useState('')

    

//     return (
//         <div>
//             <Header setQuery = {setQuery} TBooks={TBooks} />
//             <Section query={query} setTBooks= {setTBooks}  />
//         </div>
//     )
// }

// export default HomePage

import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/DashBoard/Header'
import Section from '../../components/DashBoard/Section'

const HomePage = () => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if(user){
            navigate('/')
        }
        console.log(user,"the valueeeea")
    }, [])

    const [query,setQuery] = useState('')
    const [TBooks, setTBooks] = useState('')
    const [currentPage, setCurrentPage] = useState(1); // Initialize currentPage state

    return (
        <div>
            <Header setQuery = {setQuery} TBooks={TBooks} />
            <Section query={query} setTBooks= {setTBooks} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    )
}

export default HomePage
