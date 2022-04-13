import React from "react";
import {
    Navbar,
} from 'react-bootstrap'
import { connect } from 'react-redux'

class NavigationBar extends React.Component {
    render() {
        console.log(this.props.listActivity)
        return (
            <Navbar style={style.container} bg="dark" expand="lg">
                <h3>TO DO LIST APP</h3>
                <h3>You Have {this.props.listActivity.length} To Do Item(s)</h3>
            </Navbar>
        )
    }
}

const style = {
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        color: 'white'
    }
}

// Mengambil (state) data dari redux
const mapStateToProps = (state) => {
    return {
        listActivity: state.todo.activities
    }
}

export default connect(mapStateToProps)(NavigationBar)