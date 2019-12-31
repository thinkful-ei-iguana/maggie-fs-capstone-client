import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Required } from '../Utils/Utils';
import AuthApiService from '../../services/auth-api-service';


export default class BandRegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => { }
  }

  state = { error: null }

  handleSubmit = e => {
    e.preventDefault();
    console.log('handle submit band registration form');
    const { band_name, city, state, country, description } = e.target;

    this.setState({ error: null });

    AuthApiService.postUser({
      band_name: band_name.value,
      city: city.value,
      state: state.value,
      country: country.value,
      description: description.value
    })
      .then(band => {
        console.log('band is', band);
        band_name.value = '';
        city.value = '';
        state.value = '';
        country.value = '';
        description.value = '';
        this.props.onRegistrationSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  }

  render() {
    const { error } = this.state
    return (
      <form
        className='BandRegistrationForm'
        onSubmit={this.handleSubmit}
      >
        <div role='alert'>
          {error && <p className='red'>{'Something went wrong. Please try again.'}</p>}
        </div>
        <div className='first_name'>
          <label htmlFor='BandegistrationForm_band_name'>
            Band name <Required />
          </label>
          <Input
            name='band_name'
            type='text'
            required
            id='BandRegistrationForm_band_name'>
          </Input>
        </div>
        <div className='city'>
          <label htmlFor='BandRegistrationForm_city'>
            City
          </label>
          <Input
            name='city'
            type='text'
            required
            id='BandRegistrationForm_city'>
          </Input>
        </div>
        <div className='state'>
          <label htmlFor='BandRegistrationForm_state'>
            State <Required />
          </label>
          <Input
            name='email'
            type='text'
            required
            id='BandRegistrationForm_email'>
          </Input>
        </div>
        <div className='country'>
          <label htmlFor='BandRegistrationForm_country'>
            Country <Required />
          </label>
          <Input
            name='country'
            type='text'
            required
            id='BandRegistrationForm_country'>
          </Input>
        </div>
        <div className='description'>
          <label htmlFor='BandRegistrationForm_description'>
            Description <Required />
          </label>
          <Input
            name='description'
            type='text'
            required
            id='BandRegistrationForm_description'>
          </Input>
        </div>
        <Button type='submit'>
          Register
        </Button>
        <Link to={'/dashboard'}>
          Back
        </Link>
      </form>
    )
  }
}