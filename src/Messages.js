import styled from 'styled-components';

export const StyledMessages = styled.div`
    display: flex;
    flex-direction: column;
    width: 30%;
`;

export const Message = styled.div`
    display: flex;
    flex-direction: ${(p) => p.isOwnMessage ? 'row-reverse' : 'row'};
    justify-content: ${(p) => p.isOwnMessage ? 'flex-end' : 'flex-start'};
`;


