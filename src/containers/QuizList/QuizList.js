import React, { Component } from 'react'
import './QuizList.scss'
import { NavLink } from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader'
import { connect } from 'react-redux'
import { fetchQuizes } from '../../store/actions/quizActions'

class QuizList extends Component {

    // state = {
    //     quizes: [],
    //     loading: true
    // }

    renderQuizes() {
        return this.props.quizes.map( quiz => {
            return (
                <li key={quiz.id}>
                    <NavLink to={'/quiz/' + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }

    componentDidMount(){
        this.props.fetchQuizes()
        // try {
        //     const response = await axios.get('/quizes.json')

        //     const quizes = []

        //     Object.keys(response.data).forEach((key, index) => {
        //         quizes.push({
        //             id: key,
        //             name: `Prueba №${index + 1}`
        //         })
        //     })

        //     this.setState({
        //         quizes, loading: false
        //     })
        // } catch(e){
        //     console.log(e)
        // }
    }

    render() {
        return (
            <div className="QuizList">
                <div>
                    <h1>La lista de las pruebas</h1>

                    {
                        this.props.loading && this.props.quizes.length !== 0
                            ? <Loader />
                            : <ul>
                                {this.renderQuizes()}
                              </ul>
                    }
                </div>
                                
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        quizes: state.quiz.quizes, // it may be quizes: state.quiz.quizes
        loading: state.quiz.loading
    }
    
}

function mapDispatchToProps(dispatch){
    return {
        fetchQuizes: () => dispatch(fetchQuizes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)