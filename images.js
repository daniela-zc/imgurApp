import React from "react";
import axios from "axios";

export default React.createClass({
  getInitialState: function() {
    return {images: []};
  },
  loadImagurResource: function(){
    // Get images    
    var result = this.state.images;
    axios.get('https://api.imgur.com/3/gallery/hot/viral/0.json')
    .then(function (response) {     
      result = response.data;

      // Images in random order 
      var imageCollection = result.data.sort(function() { return 0.5 - Math.random() });       
      this.setState({images: imageCollection});
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    });
  },
  componentDidMount: function() {
    // load images collection
    this.loadImagurResource();  
  },
  render: function() {
    var customHeaderDisplay =(
      <div className="jumbotron customHeaderDisplayClass">
        <h1>Imgur App </h1> 
        <p>Project to obtain Yellow-belt in Full Stack Dojo</p> 
      </div>);

    var imagesDisplay = this.state.images.map(function(imageData) {
      var title = imageData.title;
      var image = imageData.link;
      return (
        <tr key={imageData.id}>
          <td>
            <img src={image} className="img-thumbnail"  width='150' height='75'/>
          </td>
          <td>
            <label>{title}</label>
          </td> 
        </tr>
        );
    });
    return (
      <div className="Imgur-app-wrap">
      <div className="Imgur-header-wrap">
      {customHeaderDisplay}
      </div>
      <div className="imgur-images-wrap">
      <table className="table table-hover">
      <tbody>
      {imagesDisplay}
      </tbody>  
      </table>   
      </div>
      </div>
      );
  }
});
