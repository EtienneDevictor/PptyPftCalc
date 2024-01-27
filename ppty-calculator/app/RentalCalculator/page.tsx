'use client'

import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const RentalCalculator: React.FC = () => {
  const [openStates, setOpenStates] = useState({
    property: false,
    loan: false,
    appreciation: false,
    rent: false,
    tax: false,
  });

  const changeOpenState = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    const input_set: string = event.currentTarget.id;
    const newStates = { ...openStates };

    switch (input_set) {
      case 'property':
        newStates.property = !newStates.property;
        break;
      case 'loan':
        newStates.loan = !newStates.loan;
        break;
      case 'appreciation':
        newStates.appreciation = !newStates.appreciation;
        break;
      case 'rent':
        newStates.rent = !newStates.rent;
        break;
      case 'tax':
        newStates.tax = !newStates.tax;
        break;
    }

    setOpenStates(newStates);
  };

  const [homeData, setHomeData] = useState({
    acquisition_date: new Date().toISOString().split('T')[0],
    price: 0,
    repairs: 0,
    down_payment_percent: 20,
  });

  const changeHomeData = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const input: string = event.currentTarget.id;
    const newState = { ...homeData };

    switch (input) {
      case 'acquisition_date':
        newState.acquisition_date = event.target.value;
        break;
      case 'price':
        newState.price = parseInt(event.target.value);
        break;
      case 'repairs': 
        newState.repairs = parseInt(event.target.value);
        break;
      case 'percent_down':
        newState.down_payment_percent = parseInt(event.target.value);
        break;
    }

    setHomeData(newState);
  };

  return (
    <main className="flex min-h-screen flex-row">
      <div id="UserInputForm" className="w-2/5 pl-8 flex flex-col align-top">
        <div className="collapsable-form">
          <div className="flex flex-row" onClick={changeOpenState} id='property'>
            <h1>Property</h1>
            <h1>{openStates.property ? <FaChevronUp /> : <FaChevronDown />}</h1>
          </div>
          {openStates.property && 
            <div className="flex flex-col pl-4" id="property-inputs">
                <label>
                    Acquisition Date:
                    <input type="date" value={homeData.acquisition_date.toString()} onChange={changeHomeData} id="acquisition_date" />
                </label>
                <label>
                    Price of Home:
                    <input type="number" value={homeData.price} onChange={changeHomeData} id="price" />
                </label>
                <label>
                    Repairs Cost:
                    <input type="number" value={homeData.repairs} onChange={changeHomeData} id="repairs" />
                </label>
                <label>
                    Percent Down:
                    <input type="number" value={homeData.down_payment_percent} onChange={changeHomeData} id="percent_down" />
                </label>
            </div>}
        </div>
      </div>
      <div id="DataDisplay" className="w-3/5"></div>
    </main>
  );
};

export default RentalCalculator;
