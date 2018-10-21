
import React from 'react';
import Pagination from './common/Pagination'
 
class Pagger extends React.Component {
    constructor() {
        super();
 
        // an example array of 150 items to be paged
        var exampleItems = [...Array(300).keys()].map(i => ({ id: (i+1), name: 'Item ' + (i+1) }));
 
        this.state = {
            exampleItems: exampleItems,
            pageOfItems: []
        };
 
    }
 
    onChangePage = (pageOfItems) => {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems })
    }
 
    render() {
        return (
            <div>
                <div className="container">
                    <div className="text-center">
                        {this.state.pageOfItems.map(item =>
                            <div key={item.id}>{item.name}</div>
                        )}
                        <Pagination items={this.state.exampleItems} onChangePage={this.onChangePage} />
                    </div>
                </div>
                <hr />
            </div>
        );
    }
}
 
export default Pagger;