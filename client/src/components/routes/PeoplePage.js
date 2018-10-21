import React, { Component } from 'react'
import PeopleTableList from '../people/peopleList'

export default class PeoplePage extends Component {
  render() {
    return (
      <div style={{color: 'white'}}>
        <PeopleTableList />
      </div>
    )
  }
}
