import { useState } from 'react';
import styled from 'styled-components';

const StyledBox = styled.div`
    display: flex;
    padding: 2px;
`;

const NewUser = () => {
    const [ username, setUsername ] = useState('');
    const onChange = (e) => {
        setUsername(e.target.value);
        
    }

    return (
        <StyledBox>
            <input name='username' placeholder='Enter Username' type='text' value={username} onChange={onChange}/>
            <button></button>
        </StyledBox>
    )
}
