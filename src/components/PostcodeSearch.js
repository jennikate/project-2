import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
// import Constituency from './Constituency'


class PostcodeSearch extends React.Component {
  constructor() {
    super()
    this.state = {
      postcode: '',
      result: {
        parliamentaryConstituency: ''
      },
      errors: '',
      constituencyId: 'epsom'
    }
  }

  // componentDidMount() {
  //   this.setState({ constituencyId: this.state.parliamentaryConstituency.toLowerCase().split(' ').join('-') })
  // }

  handleUpdate(e) {
    this.setState({ postcode: e.target.value.toLowerCase().split(' ').join('') })
    this.setState({ errors: '' })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.get(`http://api.postcodes.io/postcodes/${this.state.postcode}`)
      .then(resp => this.setState({ parliamentaryConstituency: resp.data.result.parliamentary_constituency }))
      .catch(err => this.setState({ errors: err.response.data.error }))
  }

  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <div className='field is-horizontal'>
          <div className='field-label is-normal'>
            <label className='label' htmlFor='postcode'>Postcode</label>
          </div>
          <div className='field-body'>
            <div className='field'>
              <p className='control'>
                <input className='input' name='postcode' type='text' id='postcode' onChange={(e) => this.handleUpdate(e)} />
                {this.state.errors && <small className='help is-danger'>
                  {this.state.errors}
                </small>}
              </p>
            </div>
          </div>

          <Link to={'/constituency'} className='button'>
            Go
          </Link>

        </div>
      </form>
    )
  }
}


export default PostcodeSearch



// .then(this.setState({ constituencyId: this.state.parliamentaryConstituency.toLowerCase().split(' ').join('-') }))