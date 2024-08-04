import React, { useState } from 'react';
import { evaluate } from 'mathjs';
import Button from './Button';
import './Calculator.css';

const buttons = [
  '7', '8', '9', '/',
  '4', '5', '6', '*',
  '1', '2', '3', '-',
  '0', '.', '=', '+',
  '(', ')', 'C', 'sqrt'
];

const Calculator: React.FC = () => {
  const [input, setInput] = useState<string>('');

  const handleButtonClick = (value: string) => {
    if (value === 'C') {
      setInput('');
    } else if (value === '=') {
      try {
        // Calculate the result
        const result = evaluate(input.replace(/sqrt/g, 'sqrt(').replace(/\)/g, ')')) as string;
        setInput(result);
      } catch (error) {
        setInput('Error');
      }
    } else if (value === 'sqrt') {
      setInput(input + 'sqrt(');
    } else {
      setInput(input + value);
    }
  };

  return (
    <div className="calculator">
      <div className="display">
        {input || '0'}
      </div>
      <div className="buttons">
        {buttons.map((button) => (
          <Button key={button} value={button} onClick={handleButtonClick} />
        ))}
      </div>
    </div>
  );
};

export default Calculator;
