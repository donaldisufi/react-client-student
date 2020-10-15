import './style.scss';
import React, { useState, useEffect } from 'react';
import { actions as authActions } from '../../redux/thunk/app/auth';
import { useDispatch, useSelector } from 'react-redux';
import { getStudents, actions as studentsActions, getLoading } from '../../redux/thunk/app/students';
import StudentItem from '../../components/StudentItem';
import Loading from '../../common/Loading';
import { NavLink } from 'react-router-dom';


function Home(props) {
    const dispatch = useDispatch();

    const students = useSelector(getStudents);
    const loading = useSelector(getLoading);
    const [searchValue, setSearchValue] = useState('');

    
    useEffect(() => {
        dispatch(studentsActions.onfetchAllStudents());
    }, []);
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
    return (
        <div className="container-home">
            <div className="main">
                <span className="students">Students</span>
                <div className="students-body">
                    {renderStudents()}
                </div>
            </div>
        </div>
    )
};

export default Home;