import React, { useState } from 'react';
import {
  Box,
  Input,
  Select,
  VStack,
  List,
  ListItem,
  Text,
  Button,
} from '@chakra-ui/react';

export const SearchableSelect = ({ options, placeholder, onChange }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [isOpen, setIsOpen] = useState(false);
  
    const handleSearchChange = (event) => {
      const value = event.target.value.toLowerCase();
      setSearchTerm(value);
      const filtered = options.filter(option =>
        option.label.toLowerCase().includes(value)
      );
      setFilteredOptions(filtered);
    };
  
    const handleSelect = (value) => {
      onChange(value);
      setIsOpen(false);
    };
  
    return (
      <Box position="relative">
        <Input
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleSearchChange}
          onClick={() => setIsOpen(!isOpen)}
        />
        {isOpen && (
          <Box
            position="absolute"
            zIndex="1"
            width="100%"
            bg="white"
            border="1px"
            borderColor="gray.200"
            borderRadius="md"
            mt={1}
          >
            <List>
              {filteredOptions.length > 0 ? (
                filteredOptions.map(option => (
                  <ListItem
                    key={option.value}
                    padding={2}
                    cursor="pointer"
                    _hover={{ bg: 'gray.100' }}
                    onClick={() => handleSelect(option.value)}
                  >
                    {option.label}
                  </ListItem>
                ))
              ) : (
                <ListItem padding={2}>
                  <Text>No options found</Text>
                </ListItem>
              )}
            </List>
          </Box>
        )}
      </Box>
    );
  };