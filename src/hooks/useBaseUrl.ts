
import { useContext } from 'react';
import { BaseUrlContext } from '../context/BaseUrlContext.tsx';

const useBaseUrl = () => {
  const { baseUrl } = useContext(BaseUrlContext);
  return baseUrl;
};

export default useBaseUrl;
