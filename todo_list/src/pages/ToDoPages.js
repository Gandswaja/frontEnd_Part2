import React from 'react';
import Axios from 'axios';
import {
    FormControl,
    Button
} from 'react-bootstrap'
import { connect } from 'react-redux'

// import component
// import ToDoItem from './component/ToDoItem'
import ToDoItem from '../component/ToDoItem';

// import actions
import { getData } from '../redux/actions'

class ToDoPages extends React.Component {
    fetchData = () => {
        Axios.get('http://localhost:2000/activities')
            .then(respon => {
                // kirim data ke todoReducer dengan action getData
                console.log(respon.data)
                this.props.getData(respon.data)
            })

    }

    componentDidMount() {
        this.fetchData()

    }


    // componentDidMount() {
    //     alert('component did mount')
    // }

    // componentDidUpdate() {
    //     alert('component did update')
    // }

    onAdd = () => {
        // Mempersiapkan data todo baru dan id nya
        let newTodo = this.refs.todo.value
        let objek = {
            name: newTodo,
            isComplete: false
        }
        Axios.post('http://localhost:2000/activities', objek)
            .then(res => {
                console.log(res.data)
                // this.setState({ activities: res.data })
                this.fetchData()
            })
        // Untuk mengkosongkan kembali form kontrol
        this.refs.todo.value = ""
    }

    // let id = this.state.activities[this.state.activities.length - 1].id + 1

    // // Menyiapkan array untuk state yang baru 
    // let tempArr = [...this.state.activities]

    // // Menambahkan data baru ke dalam array tempArr
    // tempArr.push({ id, name: newTodo })
    // //console.log(tempArr)

    // // Untuk mengganti state activities menjadi tempArr di mana tempArr adalah array yang sudah dimasukan data baru
    // this.setState({ activities: tempArr })

    onDelete = (id) => {
        Axios.delete(`http://localhost:2000/activities/${id}`)
            .then(res => {
                console.log(res.data)
                this.fetchData()
            })
        // let tempArr = this.state.activities.filter(item => {
        //     return item.id !== id
        // })
        // this.setState({ activities: tempArr })
    }

    isComplete = (id) => {
        Axios.patch(`http://localhost:2000/activities/${id}`, { isComplete: true })
            .then(res => {
                console.log(res.data)
                this.fetchData()
            })
    }
    showData = () => {
        console.log(this.props.listActivity)
        return (
            this.props.listActivity.map(pitik => {
                return <ToDoItem
                    data={pitik}
                    key={pitik.id}
                    delete={
                        () => this.onDelete(pitik.id)
                    }
                    completed={
                        () => this.isComplete(pitik.id)
                    }
                />
            })
        )
    }


    render() {
        // alert('Component Render')
        console.log(this.props.listActivity)
        return (
            <div style={styles.container}>
                <h1> TO DO LIST </h1> {this.showData()} <div style={styles.input}>
                    <FormControl placeholder="Input new todo"
                        ref="todo" />
                    <Button variant="primary" onClick={this.onAdd} className="ml-2" > Add
                    </Button> </div>
            </div>)
    }
}
const styles = {
    container: {
        padding: '10px'
    },
    input: {
        width: '25vw',
        display: 'flex',
        backgroundColor: 'salmon'
    }
}

const mapStateToProps = (state) => {
    return {
        listActivity: state.todo.activities
    }
}

export default connect(mapStateToProps, { getData })(ToDoPages)