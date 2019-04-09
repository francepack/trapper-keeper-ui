import React, { Component } from 'react'
import { Route, withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import NoteContainer from '../../components/NoteContainer/NoteContainer'
import NewNote from '../NewNote/NewNote'
import { storeSavedNotes } from '../../actions'
import { getNotes } from '../../helpers/apiCalls'
import EditNote from '../EditNote/EditNote'
import './_App.scss'

export class App extends Component {
  
  componentDidMount = async () => {
    const allNotes = await getNotes()
    // if(error) {
    //   this.props.setError(error.message)
    // }
    this.props.storeSavedNotes(allNotes)
  }

  findNote = ({ match }) => {
    const foundNote = this.props.notes.find(note => note.id === match.params.id)
    if (!foundNote) {
      return '404 no found note'
    }
    return <EditNote {...foundNote} />
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className='logo'>
            <i className="fas fa-file"></i>
            <Link to='/'>
              <h1>Trapper Keeper</h1>
            </Link>
          </div>
          <Link to='/new-note'>
            <button className='new-note'>New Note</button>
          </Link>
        </header>
        <Route exact path='/' component= { () => <NoteContainer notes={this.props.notes} /> } />
        <Route path='/new-note' component={ () => <EditNote />} />
        <Route path='/notes/:id' render={this.findNote} />
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  notes: state.notes
})

export const mapDispatchToProps = (dispatch) => ({
  storeSavedNotes: (notes) => dispatch(storeSavedNotes(notes))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))