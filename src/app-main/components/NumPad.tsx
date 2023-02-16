import styled from "styled-components";
type CallbackFunction = (a: string) => void;
type NumPadProps = {
  pressCallback: CallbackFunction;
}
export const NumPad = (propsRecieved: NumPadProps) => {
  const {pressCallback} = propsRecieved;
  const clickMethod = (num: string) => () => {
    pressCallback(num);
  }
  return (<NumTable>
    <tbody>
    <tr>
      <NumCell onClick={clickMethod('7')}>7</NumCell>
      <NumCell onClick={clickMethod('8')}>8</NumCell>
      <NumCell onClick={clickMethod('9')}>9</NumCell>
    </tr>
    <tr>
      <NumCell onClick={clickMethod('4')}>4</NumCell>
      <NumCell onClick={clickMethod('5')}>5</NumCell>
      <NumCell onClick={clickMethod('6')}>6</NumCell>
    </tr>
    <tr>
      <NumCell onClick={clickMethod('1')}>1</NumCell>
      <NumCell onClick={clickMethod('2')}>2</NumCell>
      <NumCell onClick={clickMethod('3')}>3</NumCell>
    </tr>
    <tr>
      <NumCell onClick={clickMethod('-')}>&lt;</NumCell>
      <NumCell onClick={clickMethod('0')}>0</NumCell>
      <NumCell onClick={clickMethod('')}>GO</NumCell>
    </tr>
    </tbody>
  </NumTable>)
};

const NumTable = styled.table`
  margin:10px;
  
`
const NumCell = styled.td`
  width: 50px;
  padding: 20px;
  background-color: lightblue;
  color: black;
  border: solid 3px;
  border-radius: 5px;
  margin: 10px;
  font-size: large;
`;
