import React, { Component } from 'react'; 

class SignIn extends Component {

  state = {
    email: '',
    password: ''
  }
  
  render() {
    return (
      <div className='container '>
        <form className='white' onSubmit={this.handleSubmit}>
          <h4 className='grey-text text-darken-3'>Sign In</h4>
          
          <div className="input-field">
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' onChange= {this.handleChange} />
          </div>

          <div className="input-field">
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' onChange={this.handleChange} />
          </div>

          <div className='input-field'>
            <button className='btn pink light-2 z-depth-0'>Log In</button>
          </div> 
        </form>
      </div>
    )
  }
}

export default SignIn; 