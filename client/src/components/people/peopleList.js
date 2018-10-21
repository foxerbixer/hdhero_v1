
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List } from 'react-virtualized'
import { peopleSelector, getAllPeople } from '../../redux/ducks/people'
import PersonCard from './PersonCard'
import Spinner from '../common/Spinner'


class PeopleList extends Component {

  componentDidMount(){
    this.props.getAllPeople && this.props.getAllPeople()
  }

  rowRenderer = ({index, key, style }) => <PersonCard person={this.props.people[index]} key={key} style={style} />

  render() {
    const { isLoading } = this.props

    let content

    isLoading
      ? content = <Spinner />
      : content = (
        <List
        width={600}
        height={500}
        rowHeight={100}
        rowRenderer={this.rowRenderer}
        rowCount={this.props.people.length}
        style={{outline:'none'}}
        /> 
      )


    return (    
      <div>
        { content }
      </div>   
    )
  }
}

const mapStateToProps = state => ({
  people: peopleSelector(state),
  isLoading: state.people.isLoading
})



export default connect(mapStateToProps, { getAllPeople })(PeopleList)

















// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { Column, Table } from 'react-virtualized'
// import { peopleSelector, getAllPeople } from '../../redux/ducks/people'
// import Card from '@material-ui/core/Card';

// class PeopleList extends Component {

//   componentDidMount(){
//     this.props.getAllPeople && this.props.getAllPeople()
//   }

//   rowGetter = ({index}) => this.props.people[index]

//   render() {
//     return (
//       <Card>
//       <Table
//         width={600}
//         height={500}
//         rowHeight={150}
//         headerHeight={100}
//         rowGetter={this.rowGetter}
//         rowCount={this.props.people.length}
//         overscanRowCount={2}
//         style={{overFlow: 'hidden'}}
//       >
//       <Column
//         label="First Name"
//         dataKey="firstname"
//         width={200}
//       />
//       <Column
//         label="Last Name"
//         dataKey="lastname"
//         width={200}
//       />
//       <Column
//         label="Email"
//         dataKey="email"
//         width={200}
//       />
        
//       </Table>
//       </Card>
//     )
//   }
// }

// const mapStateToProps = state => ({
//   people: peopleSelector(state)
// })



// export default connect(mapStateToProps, { getAllPeople })(PeopleList)
