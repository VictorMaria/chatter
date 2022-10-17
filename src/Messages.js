import styled from "styled-components";

export const StyledMessages = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  align-items: center;
`;

export const Message = styled.div`
  display: flex;
  flex-direction: ${(p) => (p.isOwnMessage ? "row-reverse" : "row")};
  justify-content: ${(p) => (p.isOwnMessage ? "flex-end" : "flex-start")};
  background-color: #cecdf0;
  padding: 0px 9px;

  .avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(p) => (p.isOwnMessage ? "#ec407a" : "#30b5ee")};
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: ${(p) => (p.isOwnMessage ? "15px" : "30px")};
    text-transform: uppercase;
  }
`;



export const LeftMessageBubble = styled.div`
  margin: 40px;
  display: inline-block;
  position: relative;
  width: 200px;
  height: auto;
  background-color: #30b5ee;
  border-radius: 5px;

  p {
    text-align: left;
    padding-left: 10px;
  }

  .triangle.border.left-top:before {
    content: " ";
    position: absolute;
    width: 0;
    height: 0;
    left: -40px;
    right: auto;
    top: -8px;
    bottom: auto;
    border: 32px solid;
    border-color: #30b5ee transparent transparent transparent;
  }
  .triangle.left-top:after {
    content: " ";
    position: absolute;
    width: 0;
    height: 0;
    left: -20px;
    right: auto;
    top: 0px;
    bottom: auto;
    border: 22px solid;
    border-color: #30b5ee transparent transparent transparent;
  }
`;

export const RightMessageBubble = styled.div`
  margin: 40px;
  display: inline-block;
  position: relative;
  width: 200px;
  height: auto;
  background-color: #ec407a;
  border-radius: 5px;

  p {
    text-align: left;
    padding-left: 10px;
  }


  .triangle.border.right-top:after {
    content: " ";
    position: absolute;
    width: 0;
    height: 0;
    left: auto;
    right: -40px;
    top: -8px;
    bottom: auto;
    border: 32px solid;
    border-color: #ec407a transparent transparent transparent;
  }
  .triangle.right-top:before {
    content: " ";
    position: absolute;
    width: 0;
    height: 0;
    left: auto;
    right: -20px;
    top: 0px;
    bottom: auto;
    border: 22px solid;
    border-color: #ec407a transparent transparent transparent;
  }
`;
