import './style.scss';
import React, { useState, useEffect } from 'react';
import { actions as authActions } from '../../redux/thunk/app/auth';
import { useDispatch, useSelector } from 'react-redux';
import { getStudents, actions as studentsActions, getLoading } from '../../redux/thunk/app/students';
import StudentItem from '../../components/StudentItem';
import Loading from '../../common/Loading';

function Home(props) {
    const dispatch = useDispatch();

    const students = useSelector(getStudents);
    const loading = useSelector(getLoading);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        dispatch(studentsActions.onfetchAllStudents());
    }, []);

    const onLogOut = () => {
        dispatch(authActions.logOut());
    };
    const onClickStudent = id => {

    }
    const renderStudents = () => {
        if (loading) {
            return <Loading />
        }
        return students.map(item => (
            <StudentItem
                {...item}
                key={item.id}
                onClick={onClickStudent}
            />
        ))
    }
    const onSearchStudent = e => {
        e.preventDefault();
        dispatch(studentsActions.searchByName(searchValue));
    }
    return (
        <div className="container-home">
            <nav className="navbar navbar-dark bg-dark">
                <a class="navbar-brand" href="/">Home</a>
                <a class="navbar-brand" href="/">Register Student </a>
                <a class="navbar-brand" href="/">Register Exam </a>

                <form onSubmit={onSearchStudent} class="form-inline">
                    <input
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}
                        class="form-control"
                        type="search"
                        placeholder="Search student"
                        aria-label="Search"
                    />
                    <button
                        class="btn btn-info"
                        type="submit"
                    >
                        Search
                    </button>
                </form>
                <span
                    onClick={onLogOut}
                    className="navbar-brand logout"
                >
                    Log out
                </span>
            </nav>
            <div className="main">
                <span class="students">Students</span>
                <div className="students-body">
                    {renderStudents()}
                </div>
            </div>
        </div>
    )
};

export default Home;