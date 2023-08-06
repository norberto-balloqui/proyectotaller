import { Input } from '@chakra-ui/react';

const InputForm = ({ type, name, placeholder, value, handlechange }) => {
  return (
    <Input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={handlechange}
    />
  );
};

export default InputForm;
