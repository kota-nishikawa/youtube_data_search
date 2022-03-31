import React from 'react';
import _ from 'lodash';

export default class Header extends React.Component {

    state = {
        keyword: "",
    };

    handleChangeInput = (e) => {
        this.setState({keyword: e.target.value});
        this._debounce(e.target.value)
    }

    _debounce = _.debounce(value => {
        this.props.onSerchYoutube(value);
    },200);

    render() {
        return (
            <div style={{marginTop: '20px', textAlign:'center'}}>
                <input
                  onChange={this.handleChangeInput}
                  value={this.state.keyword}
                />
            </div>
        )
    }
}