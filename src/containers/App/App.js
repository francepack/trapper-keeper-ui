import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import NoteContainer from '../../components/NoteContainer/NoteContainer';
import NewNote from '../NewNote/NewNote';
import { storeSavedNotes } from '../../actions';
import { getNotes } from '../../helpers/apiCalls';
import EditNote from '../EditNote/EditNote'
import './_App.scss';

export class App extends Component {
  
  componentDidMount = async () => {
    if (!this.props.notes.length) {
      const allNotes = await getNotes();
      this.props.storeSavedNotes(allNotes)
    }
  }

  findNote = ({ match }) => {
    const foundNote = this.props.notes.find(note => note.id === match.params.id)
    return <EditNote {...foundNote} />
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className='logo'>
            <i class="fas fa-file"></i>
            <h1>Trapper Keeper</h1>
          </div>
          <button className='new-note'>New Note</button>
        </header>
        <Route exact path='/' component= { () => <NoteContainer notes={this.props.notes} /> } />
        <Route path='/new-note' component={ NewNote } />
        <Route path='/notes/:id' render={this.findNote} />
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  notes: state.notes
})

export const mapDispatchToProps = (dispatch) => ({
  storeSavedNotes: (notes) => dispatch(storeSavedNotes(notes))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
