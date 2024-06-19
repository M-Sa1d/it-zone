import React from 'react'
import axios from 'axios'
import Spinner from '../../components/Spinner'

import { useEffect, useState } from 'react'
import DrawerApp from '../../components/Drawer'
import { Form, Input, Select, Spin, message, DatePicker } from 'antd'

export default function Group() {
  const [isload, setIsLoad] = useState(false)
  const [groups, setGroups] = useState([])
  const [teacher, setTeacher] = useState([])
  const [dep, setDep] = useState(false)
  const [load, setLoad] = useState(true)
  const [open, setOpen] = useState(false)
  const [editData, setEditData] = useState(null)

  useEffect(() => {
    axios.get("https://65d5ecaff6967ba8e3bcf8f2.mockapi.io/group", {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        setTimeout(() => {
          setGroups(res.data)
          setLoad(false)
        },);
      })
      .catch(error => console.log(error))
  }, [dep])

  useEffect(() => {
    if (!open)
      setEditData(null)
  }, [open])

  useEffect(() => {
    axios.get("https://65d5ecaff6967ba8e3bcf8f2.mockapi.io/group", {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        setTeacher(res.data)
      })
      .catch(error => console.log(error))
  }, [])

  const onFinish = (e) => {

    setIsLoad(true)
    if (!editData) {
      axios.post("https://65d5ecaff6967ba8e3bcf8f2.mockapi.io/group", e, {
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(() => {
          setDep(!dep);
          setLoad(true)
          setOpen(false)
          message.success("Group added!")
          setIsLoad(false)
        })
      return
    }
    axios.put(`https://65d5ecaff6967ba8e3bcf8f2.mockapi.io/group/${editData.id}`, e, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(() => {
        setDep(!dep);
        setLoad(true)
        setOpen(false)
        setIsLoad(false)
        message.success("Group updated!")
      })
      .catch(error => {
        message.error("Error updating group")
      })
  };

  const removeGroup = (id) => {
    axios.delete(`https://65d5ecaff6967ba8e3bcf8f2.mockapi.io/group/${id}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(() => {
        setDep(!dep);
        setLoad(true)
        message.success("Group deleted!")
      })
      .catch(error => {
        message.error(error.message)
        console.log(error)
      })

  }

  const onChange = (date, dateString) => {
    console.log(date, dateString)
  };

  return (
    <>
      <div>
        <div className='page-header'>
          <div className='page-header-title'>Our Groups</div>
          <button className='add-btn' onClick={() => setOpen(true)} >Add</button>
        </div>
        {
          load ? <Spinner /> : <table className='table'>

            <thead>
              <tr aria-colspan={5}>
                <th>Groupe</th>
                <th>Course</th>
                <th>Teacher</th>
                <th>Duration</th>
                <th>-/-</th>
              </tr>
            </thead>
            {
              groups.map(item => (

                <tbody key={item.id}>
                  <tr>
                    <td>{item.name}</td>
                    <td>
                      <img src={item.img} alt="" />
                    </td>
                    <td>{item.teacher.name}</td>
                    <td>{item.teacher.course.duration}</td>
                    <td>
                      <div className="trash-border">
                        <i className="bi bi-trash3" onClick={() => removeGroup(item.id)}></i>
                      </div>
                      <div className="pen" onClick={() => {
                        setEditData(item);
                        setOpen(true)
                      }}>
                        <i className="bi bi-pen"></i>
                      </div>
                    </td>
                  </tr>
                </tbody>
              ))
            }
          </table>
        }



        <DrawerApp title={"Groups"} open={open} setOpen={setOpen}>

          <Form onFinish={onFinish}>

            <Form.Item
              name="student_surname"
              initialValue={editData ? editData.student_surname : ""}
              rules={[
                {
                  required: true,
                  message: 'Please input groups name!',
                },
              ]}
            >
              <Input placeholder="Enter group's name" />
            </Form.Item>

            <Form.Item
              initialValue={editData ? editData.course : ""}
              name="teacher"
              rules={[
                {
                  required: true,
                  message: 'Please choose teacher',
                },
              ]}
            >
              <Select
                options={teacher.map((item) => {
                  return { value: item.full_name, label: item.full_name }
                })}
              />
            </Form.Item >

            <Form.Item
              initialValue={editData ? editData.student_name : ""}
              name="student_name"
              rules={[
                {
                  required: true,
                  message: 'Please input your name!',
                },
              ]}
            >
              <Input placeholder='Enter course by choosing teacher' />
            </Form.Item>

            <Form.Item>

              <DatePicker onChange={onChange} needConfirm style={{ width: "100%"}} />

            </Form.Item>


            <br />
            <button type='submit' className='add-btn' style={{ width: "100%" }} >{isload ? <Spin size='small' /> : "Add"}</button>
          </Form>
        </DrawerApp>


      </div>
    </>
  )
}
