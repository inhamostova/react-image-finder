import { Component } from 'react';
import { Button, Input, Label, SearchForm, Header } from './SearchBar.styled';

export class SearchBar extends Component {
  state = {
    value: '',
  };

  handleChange = evt => {
    this.setState({ value: evt.target.value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.onSubmit(this.state.value);
    this.setState({ value: '' });
  };

  render() {
    const { value } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <Header>
        <SearchForm onSubmit={handleSubmit}>
          <Button type="submit">
            <Label>Search</Label>
          </Button>

          <Input
            type="text"
            placeholder="Search images and photos"
            value={value}
            onChange={handleChange}
          />
        </SearchForm>
      </Header>
    );
  }
}
