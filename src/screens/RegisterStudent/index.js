import React, { useState, useEffect } from 'react';
import './style.scss';
import { Dropdown } from 'react-bootstrap';
import RadioButton from '../../components/RadioButton';
import * as toast from '../../common/toast';
import { getError, getLoading, actions as registerStudentActions, getFormStatus, FORM_STATUS } from '../../redux/thunk/app/registerStudent';
import { useSelector, useDispatch } from 'react-redux';

const deparmentInitialValue = { id: -1, name: "Choose one status" };
const deparments = [{ id: 1, name: "Mobile dhe cloud" }, { id: 2, name: "Siguri kibernetike" }];
const statuses = [{ id: 1, name: "aktiv" }, { id: 2, name: "diplomuar" }, { id: 3, name: "regjistruar" }, { id: 4, name: "suspenduar" }];

function RegisterStudent(props) {
    const [values, setValues] = useState({ name: '', lastName: '',studentId:'', birthDate: '', status: {}, department: deparmentInitialValue });
    const loading = useSelector(getLoading);
    const error = useSelector(getError);
    const formStatus = useSelector(getFormStatus);

    const dispatch = useDispatch();
    const onSelectStatus = id => setValues({ ...values, status: statuses.find(item => item.id === id) });
    const onSelectDepartment = id => setValues({ ...values, department: deparments.find(item => item.id === parseInt(id)) })

    const _renderStatuses = () => {
        return statuses.map(item => (
            <RadioButton
                data={item}
                isSelected={values.status.id === item.id}
                key={item.id}
                onClick={onSelectStatus}
            />
        ))
    };

    const _renderDepartments = () => {
        return deparments.map(item => (
            <Dropdown.Item eventKey={item.id}>{item.name}</Dropdown.Item>
        ));
    };

    const onSubmitForm = e => {
        e.preventDefault();
        const { department, status } = values;

        if (department.id < 0) {
            toast.error("please select one department!");
            return;
        }
        if (!status.id) {
            toast.error("plesae select one status!")
            return;
        }
        dispatch(registerStudentActions.registerStudent(values));
    }
    const handleChange=({ target: { value } }, key)=>{
        console.log("target",value);
        setValues(prevState => ({...prevState,[key]:value}));
    }
    useEffect(() => {
        if (error) {
            toast.error(error.message);
        }
    }, [error]);

    useEffect(()=>{
        if(formStatus===200){
        toast.success("studenti me id "+values.studentId+" u regjistrua me suksess");
        setValues({name: '', lastName: '',studentId:'',birthDate: '', status: {}, department: deparmentInitialValue });
        dispatch({type:FORM_STATUS,payload:0});
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[formStatus]);
    return (
        <div className="container-student-register">
            <div className="title">
                <h2>
                    Register Student Form
                </h2>
            </div>
            <form className="form-register" onSubmit={onSubmitForm}>
                <div className="row">
                    <div className="col">
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="First name"
                            value={values.name}
                            onChange={e=>handleChange(e,'name')}
                            required
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            name="lastName"
                            className="form-control"
                            placeholder="Last name"
                            value={values.lastName}
                            onChange={e=>handleChange(e,'lastName')}
                            required
                        />
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col">
                        <label>Birth Date</label>
                        <input
                            type="date"
                            className="form-control"
                            placeholder="Birth Date"
                            value={values.birthDate}
                            onChange={e=>handleChange(e,'birthDate')}
                            required
                        />
                    </div>
                    <div className="col">
                        <label >Index (ID)</label>
                        <input
                            type="text"
                            name="id"
                            className="form-control"
                            placeholder="Ex : 180078k"
                            value={values.studentId}
                            onChange={e=>handleChange(e,'studentId')}
                            required
                        />
                    </div>
                </div>
                <br />

                <div className="row" style={{ paddingLeft: 20, paddingRight: 20, alignItems: 'center' }}>
                    <Dropdown onSelect={onSelectDepartment} style={{ display: 'flex', flex: 1 }}>
                        <Dropdown.Toggle variant="info" id="dropdown-basic" style={{ width: '100%', justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
                            {values.department.name}
                        </Dropdown.Toggle>

                        <Dropdown.Menu style={{ width: '100%' }}>
                            {_renderDepartments()}
                        </Dropdown.Menu>
                    </Dropdown>

                </div>

                <br />
                <br />

                <div className="col" style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                    <label>Statusi :</label>
                    <div className="row" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        {_renderStatuses()}
                    </div>
                </div>
                
                <br />
                <br />

                <button
                    disabled={loading}
                    type="submit"
                    class="btn btn-success btn-block"
                >
                    Register
                </button>
            </form>
        </div>
    )
}

export default RegisterStudent;