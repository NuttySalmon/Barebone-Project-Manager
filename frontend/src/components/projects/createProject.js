import React, { Component } from 'react'

class createProject extends Component{
  
  state = {
    pname:'', 
    sdate: '', 
    edate: '', 
    progress: ''
  }


  handleSubmit = ()=> {
  }

  handleChange = () => {

  }



  render() {
    return (
      <div className='container'>
        <form className='white' onSubmit={this.handleSubmit}>
          <h4 className='grey-text text-darken-3'>Create Project</h4>
          <div className='input-field'>
            <label  htmlFor='pname'>Project Name</label>
            <input type='text' id='pname' onChange={this.handleChange} />
          </div>

          <div className='input-field'>
            <label htmlFor='sdate' />
            <input type='date' id='sdate' onChange={this.handleChange} />
          </div>

          <div className='input-field'>
            <label htmlFor='edate'/>
            <input type='date' id='edate' onChange={this.handleChange} />
          </div>

          <div className='input-field'>
            <label htmlFor='progress'>Project Progress</label>
            <input type='number' id='progress' onChange={this.handleChange} />
          </div>

          <div className='input-field'>
            <button className='btn pink lighten-2 z-depth-0'>Create</button> 
          </div>
        </form> 
      </div>
    )
  }
}

export default createProject
