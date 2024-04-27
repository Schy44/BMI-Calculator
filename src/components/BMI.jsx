import React, { useState } from 'react';
import underweightImg from '../images/underweight.png';
import healthyImg from '../images/healthy.png';
import overweightImg from '../images/overweight.png';


function BMI() {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');
  const [unitSystem, setUnitSystem] = useState('imperial');
  let imgSrc;

  const calcBmi = (event) => {
    event.preventDefault();

    if (weight === 0 || height === 0) {
      alert('Please enter a valid weight and height');
    } else {
      let bmiValue;
      if (unitSystem === 'imperial') {
        bmiValue = (weight / (height * height)) * 703;
      } else {
        bmiValue = weight / (height * height);
      }
      setBmi(bmiValue.toFixed(1));

      if (bmiValue < 18.5) {
        setMessage('You are underweight');
      } else if (bmiValue < 25) {
        setMessage('You are a healthy weight');
      } else if (bmiValue < 30) {
        setMessage('You are overweight');
      } else {
        setMessage('You are obese');
      }
    }
  };

  const resetForm = () => {
    setWeight(0);
    setHeight(0);
    setBmi('');
    setMessage('');
  };

  const toggleUnitSystem = () => {
    setUnitSystem(unitSystem === 'imperial' ? 'metric' : 'imperial');
    resetForm();
  };

  if (bmi !== '') {
    if (bmi < 18.5) {
      imgSrc = underweightImg;
    } else if (bmi < 25) {
      imgSrc = healthyImg;
    } else if (bmi < 30) {
      imgSrc = overweightImg;
    } else {
      // Add handling for BMI >= 30
    }
  }


  return (
    <div className="app">
      <div className="container">
        <h2 className="center">BMI Calculator</h2>
        <form onSubmit={calcBmi}>
          <div>
            <label>{unitSystem === 'imperial' ? 'Weight (lbs)' : 'Weight (kg)'}</label>
            <input value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
          <div>
            <label>{unitSystem === 'imperial' ? 'Height (in)' : 'Height (m)'}</label>
            <input value={height} onChange={(e) => setHeight(e.target.value)} />
          </div>
          <div>
            <button className="btn" type="submit">
              Calculate
            </button>
            <button className="btn btn-outline" onClick={resetForm} type="button">
              Reset
            </button>
            <button className="btn btn-outline" onClick={toggleUnitSystem} type="button">
              {unitSystem === 'imperial' ? 'Switch to Metric' : 'Switch to Imperial'}
            </button>
          </div>
        </form>

        <div className="center">
          <h3>Your BMI is: {bmi}</h3>
          <p>{message}</p>
        </div>

        {imgSrc && (
          <div className="img-container">
            <img src={imgSrc} alt="BMI Image" />
          </div>
        )}
      </div>
    </div>
  );
}

export default BMI;
