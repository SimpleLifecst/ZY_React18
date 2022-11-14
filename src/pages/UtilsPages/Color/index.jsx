import React from 'react';
import { SketchPicker, PhotoshopPicker } from 'react-color';

export default class Color extends React.Component {
  state = {
    background: '#fff',
  };

  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
  };

  render() {
    return (
      <div style={{"backgroundColor": this.state.background, "height": "100%"}}>
        <SketchPicker
          color={this.state.background}
          onChangeComplete={this.handleChangeComplete}
        />
      </div>
    );
  }
}