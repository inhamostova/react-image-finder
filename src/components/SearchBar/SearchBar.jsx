import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Label, SearchForm, Header } from './SearchBar.styled';

export const SearchBar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleChange = evt => {
    setValue(evt.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (!value.trim()) {
      alert('Please enter your query');
      return;
    }
    onSubmit(value);
    setValue('');
  };

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
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

// export class OldSearchBar extends Component {
//   static propTypes = {
//     onSubmit: PropTypes.func.isRequired,
//   };

//   state = {
//     value: '',
//   };

//   handleChange = evt => {
//     this.setState({ value: evt.target.value });
//   };

//   handleSubmit = evt => {
//     evt.preventDefault();
//     if (!this.state.value.trim()) {
//       alert('Please enter your query');
//       return;
//     }
//     this.props.onSubmit(this.state.value);
//     this.setState({ value: '' });
//   };

//   render() {
//     const { value } = this.state;
//     const { handleChange, handleSubmit } = this;
//     return (
//       <Header>
//         <SearchForm onSubmit={handleSubmit}>
//           <Button type="submit">
//             <Label>Search</Label>
//           </Button>

//           <Input
//             type="text"
//             placeholder="Search images and photos"
//             value={value}
//             onChange={handleChange}
//           />
//         </SearchForm>
//       </Header>
//     );
//   }
// }
