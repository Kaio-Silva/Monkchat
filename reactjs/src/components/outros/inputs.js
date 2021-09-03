import styled from 'styled-components'


const ChatButton = styled.button`
    font-weight: 700;

    color: #fff;
    background: #50B4BF;

    border: none;
    border-radius: 20px;

    padding: .5em 1.65em;
    margin: .3em;

    cursor: pointer;

    &:hover {
        background-color: #299ca8;
    }
`

const ChatInput = styled.input`
    border: none;
    background: #FFFFFF;
    border-radius: 5px;

    outline: none;
    padding: .4em .5em;

    cursor: text;
`

const ChatTextArea = styled.textarea`
    border: none;
    background: #FFFFFF;
    border-radius: 5px;

    outline: none;
    padding: .4em .5em;

    resize: none;

    cursor: text;

    height: 12em;
    margin: .5em 0em;
`

export { ChatButton, ChatInput, ChatTextArea }