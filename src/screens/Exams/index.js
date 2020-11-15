import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Home/style.scss';
import Loading from '../../common/Loading';
import StudentItem from '../../components/StudentItem';
import { actions, getexams, getLoading } from '../../redux/thunk/app/exams';


function Exams(props) {
    const dispatch = useDispatch();
    const exams = useSelector(getexams);
    const loading = useSelector(getLoading);

    useEffect(() => {
        dispatch(actions.onfetchAllexams());
    }, []);

    const renderExams = () => {
        if (loading) {
            return <Loading />
        }
        return exams.map(item => (
            <StudentItem
                id={"exam id : "+item.id + "   student: "+item.studentID}
                name={"lenda: "+item.lendaID+ "   profesori: "+item.ProfesoriID}
                lastName={"piket: "+item.piket + "  nota: "+item.nota}
                key={item.id}
                onClick={()=>{}}
            />
        ))
    }
    return (
        <div className="container-home">
        <div className="main">
            <span className="students">Exams</span>
            <div className="students-body">
                {renderExams()}
            </div>
        </div>
    </div>
    )
};

export default Exams;