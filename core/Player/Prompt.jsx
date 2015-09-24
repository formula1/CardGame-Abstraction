
var HTMLUtils = require('HTMLUtils');
var React = require('react');

var Prompt = React.createClass({
  getInitialState: function(){
    return null;
  },
  formSubmitted: function(e){
    e.preventDefault();
    this.props.callback(this.processForm(new FormData(this.refs.form)));
  },
  render: function(){
    return <div>
      <h1 className="title">{HTMLUtils.htmlEntities(this.props.title)}</h1>
      <p className="title">{HTMLUtils.safeHTML(this.props.description)}</p>
      <form ref="form" onSubmit={this.formSubmitted}>{
        this.children
        .concat(<button type="submit">Submit</button>)
      }</form>
    </div>;
  }
});

Prompt.easyForm = function(title,description,form,callback){
  return <Prompt title={title} description={description} callback={callback}>form</Prompt>;
};

module.exports = Prompt;
