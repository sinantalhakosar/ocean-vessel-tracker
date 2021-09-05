import type { ReactElement } from 'react';
import { SearchFieldsForm } from '../components/SearchFieldsForm';

export interface HomepageProps {
    // props
}

export const Homepage = ({ }: HomepageProps): ReactElement => {  
    return (
        <SearchFieldsForm/>
    );
  };