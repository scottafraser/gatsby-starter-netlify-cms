import React, { Component } from 'react'


export default class AgeGate extends Component {
    constructor(props) {
        super(props);
        this.state = {showDecline: false};
      }

    denyOfAge = () => {
        this.setState({showDecline: true}) 
    }
    
    render() {
       let showDecline = this.state.showDecline
        return (
            <div id="ageGate">
            { showDecline == true ? 
            (<div>
                <h1>Come back later</h1>
            </div>)
            :
            (<div>
                <h1>Are you over 21 years of age?</h1>
                <button className="btn" onClick={() => this.props.setAge()}>Yes</button>
                <button className="btn" onClick={() => this.denyOfAge()}>No</button>
            </div> )
            }
            </div>
        )
    }
}

