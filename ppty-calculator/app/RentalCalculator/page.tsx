'use client'

import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Graphbox } from "./Graphbox";

const RentalCalculator: React.FC = () => {
  const [openStates, setOpenStates] = useState({
    property: true,
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

  const current_date = new Date()
  const future_date = new Date()
  future_date.setFullYear(current_date.getFullYear() + 30)
  const [homeData, setHomeData] = useState({
    // Property Variables 
    acquisition_date: current_date.toISOString().split('T')[0],
    price: 0,
    repairs: 0,
    down_payment_percent: 20,
    // Loan Variables 
    annual_interest_rate: 3.1,
    loan_term: 180,
    // Appreciation Variables 
    property_appreciation: 1,
    selling_cost: 6,
    sale_date: future_date.toISOString().split('T')[0],
    // Rent Variables 
    monthly_rent_percent: 0.715,
    vacancy_percentage: 4.762,
    brokerage_fee: 4.762,
    annual_increase_rent: 2,
    property_tax_precentage_of_MTM_value: 1, // mtm = market to market 
    maintenance_percentage: 10,
    // Tax Variables 
    tax_bracket: 35,
    tax_amort_in_years: 27.5,
    land_percentage: 20,
    gains_tax: 25
  });

  const changeHomeData = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const input: string = event.currentTarget.id;
    const newState = { ...homeData };

    const percentageCheck = (value: string, old: number): number => {
        var percentage = parseInt(event.target.value)
        // console.log(percentage)
        if ( percentage ) {
            if (percentage < 0 || percentage > 100 ) {
                return old
            }
            percentage = Math.min(100, Math.max(0, percentage))
        } 
        return percentage
    }

    const dollarCheck = (value: string): number => {
        let dollar = parseInt(value);
        return dollar >= 0 ? dollar : NaN;
    }

    switch (input) {
        // Property
      case 'acquisition_date':
        newState.acquisition_date = event.target.value;
        break;
      case 'price':
        newState.price = dollarCheck(event.target.value)
        break;
      case 'repairs': 
        newState.repairs = dollarCheck(event.target.value)
        break;
      case 'percent_down':
        newState.down_payment_percent = percentageCheck(event.target.value, newState.down_payment_percent)
        break;
        // Loan
    case 'annual_interest_rate':
        newState.annual_interest_rate = percentageCheck(event.target.value, newState.down_payment_percent)
        break;
    case 'loan_term':
        newState.loan_term =  parseInt(event.target.value)
        break;
        // Appreciation
    case 'property_appreciation':
        newState.property_appreciation = percentageCheck(event.target.value, newState.property_appreciation)
        break;
    case 'selling_cost':
        newState.selling_cost = percentageCheck(event.target.value, newState.selling_cost);
        break;
    case 'sale_date':
        newState.sale_date = event.target.value;
        break;
        // Rent
    case 'monthly_rent_percentage':
        newState.monthly_rent_percent = percentageCheck(event.target.value, newState.monthly_rent_percent)
        break;
    case 'vacancy_percentage':
        newState.vacancy_percentage = percentageCheck(event.target.value, newState.vacancy_percentage)
        break;
    case 'brokerage_fee':
        newState.brokerage_fee = percentageCheck(event.target.value, newState.brokerage_fee)
        break;
    case 'annual_increase_rent':
        newState.annual_increase_rent = percentageCheck(event.target.value, newState.annual_increase_rent)
        break;
    case 'property_tax': 
        newState.property_tax_precentage_of_MTM_value = percentageCheck(event.target.value, newState.property_tax_precentage_of_MTM_value)
        break;
    case 'maintenance_percentage':
        newState.maintenance_percentage = percentageCheck(event.target.value, newState.maintenance_percentage)
        break;
        // Tax
    case 'tax_bracket':
        newState.tax_bracket = percentageCheck(event.target.value, newState.tax_bracket);
        break;
    case  'tax_amort':
        newState.tax_amort_in_years = dollarCheck(event.target.value)
        break;
    case 'land_percentage':
        newState.land_percentage = percentageCheck(event.target.value, newState.land_percentage)
        break;
    case 'gains_tax':
        newState.gains_tax = percentageCheck(event.target.value, newState.gains_tax)
        break;
    }
    setHomeData(newState);
  };

  return (
    <main className="flex min-h-screen flex-row justify-between">
      <div id="UserInputForm" className="px-8 flex flex-col overflwo-y-scroll max-h-screen w-1/3">
        <div className="collapsable-form w-full">
          <div className="flex flex-row justify-between text-3xl font-semibold w-9/10 pt-8" onClick={changeOpenState} id='property'>
            <h1>Property</h1>
            <h1 className="pl-4 translate-y-1">{openStates.property ? <FaChevronUp /> : <FaChevronDown />}</h1>
          </div>
          {openStates.property ?
            <div className="flex flex-col pl-4 text-xl">
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-base">Acquisition Date</span>
                    </div>
                    <input type="date" id='aquisition_date' placeholder="date" value={homeData.acquisition_date.toString()} onChange={changeHomeData} className="input input-bordered w-full max-w-xs"/>
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-base">Home Price ($)</span>
                    </div>
                    <input type="number" id="price" value={homeData.price ? homeData.price : ""} onChange={changeHomeData} className="input input-bordered w-full max-w-xs"/>
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-base">Repair Cost ($)</span>
                    </div>
                    <input type="number" id="repairs" value={homeData.repairs ? homeData.repairs : ""} onChange={changeHomeData} className="input input-bordered w-full max-w-xs"/>
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-base">Percent Down (%)</span>
                    </div>
                    <input type="number" id="percent_down" value={homeData.down_payment_percent ? homeData.down_payment_percent : 0 } onChange={changeHomeData} className="input input-bordered w-full max-w-xs"/>
                </label>
            </div> : null }
            <div className="flex flex-row justify-between text-3xl font-semibold w-9/10 pt-8" onClick={changeOpenState} id='loan'>
            <h1>Loan</h1>
            <h1 className="pl-4 translate-y-1">{openStates.loan ? <FaChevronUp /> : <FaChevronDown />}</h1>
          </div>
          {openStates.loan ?
            <div className="flex flex-col pl-4 text-xl">
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-base">Annual Interest Rate (%)</span>
                    </div>
                    <input type="number" id="annual_interest_rate" value={homeData.annual_interest_rate ? homeData.annual_interest_rate : 0 } onChange={changeHomeData} className="input input-bordered w-full max-w-xs"/>
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-base">Loan Term (months)</span>
                    </div>
                    <input type="number" id="loan_term" value={homeData.loan_term ? homeData.loan_term : ""} onChange={changeHomeData} className="input input-bordered w-full max-w-xs"/>
                </label>
            </div> : null }
            <div className="flex flex-row justify-between text-3xl font-semibold w-9/10 pt-8" onClick={changeOpenState} id='appreciation'>
            <h1>Appreciation</h1>
            <h1 className="pl-4 translate-y-1">{openStates.appreciation ? <FaChevronUp /> : <FaChevronDown />}</h1>
          </div>
          {openStates.appreciation ?
            <div className="flex flex-col pl-4 text-xl">
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-base"> Annual Property Appreciation (%)</span>
                    </div>
                    <input type="number" id="property_appreciation" value={homeData.property_appreciation ? homeData.property_appreciation : 0 } onChange={changeHomeData} className="input input-bordered w-full max-w-xs"/>
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-base"> Selling Cost (%)</span>
                    </div>
                    <input type="number" id="selling_cost" value={homeData.selling_cost ? homeData.selling_cost : 0 } onChange={changeHomeData} className="input input-bordered w-full max-w-xs"/>
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-base">Selling Date</span>
                    </div>
                    <input type="date" id='sale_date' placeholder="date" value={homeData.sale_date.toString()} onChange={changeHomeData} className="input input-bordered w-full max-w-xs"/>
                </label>
            </div> : null }
            <div className="flex flex-row justify-between text-3xl font-semibold w-9/10 pt-8" onClick={changeOpenState} id='rent'>
            <h1>Rent</h1>
            <h1 className="pl-4 translate-y-1">{openStates.rent ? <FaChevronUp /> : <FaChevronDown />}</h1>
          </div>
          {openStates.rent ?
            <div className="flex flex-col pl-4 text-xl">
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-base"> Annual Property Appreciation (%)</span>
                    </div>
                    <input type="number" id="monthly_rent_percentage" value={homeData.property_appreciation ? homeData.property_appreciation : 0 } onChange={changeHomeData} className="input input-bordered w-full max-w-xs"/>
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-base"> Vacancy Percentage (%)</span>
                    </div>
                    <input type="number" id="vacancy_percentage" value={homeData.vacancy_percentage ? homeData.vacancy_percentage : 0 } onChange={changeHomeData} className="input input-bordered w-full max-w-xs"/>
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-base"> Brokerage Fee (%)</span>
                    </div>
                    <input type="number" id="brokerage_fee" value={homeData.brokerage_fee ? homeData.brokerage_fee : 0 } onChange={changeHomeData} className="input input-bordered w-full max-w-xs"/>
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-base"> Annual Increase in Rent (%)</span>
                    </div>
                    <input type="number" id="annual_increase_rent" value={homeData.annual_increase_rent ? homeData.annual_increase_rent : 0 } onChange={changeHomeData} className="input input-bordered w-full max-w-xs"/>
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-base"> Property Tax (%)</span>
                    </div>
                    <input type="number" id="property_tax" value={homeData.property_tax_precentage_of_MTM_value ? homeData.property_tax_precentage_of_MTM_value : 0 } onChange={changeHomeData} className="input input-bordered w-full max-w-xs"/>
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-base"> Maintenance as Percentage of Rent (%)</span>
                    </div>
                    <input type="number" id="maintenance_percentage" value={homeData.maintenance_percentage ? homeData.maintenance_percentage : 0 } onChange={changeHomeData} className="input input-bordered w-full max-w-xs"/>
                </label>
            </div> : null }
            <div className="flex flex-row justify-between text-3xl font-semibold w-9/10 pt-8" onClick={changeOpenState} id='tax'>
            <h1>Tax</h1>
            <h1 className="pl-4 translate-y-1">{openStates.tax ? <FaChevronUp /> : <FaChevronDown />}</h1>
          </div>
          {openStates.tax ?
            <div className="flex flex-col pl-4 text-xl">
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-base"> Tax Braket (%)</span>
                    </div>
                    <input type="number" id="tax_bracket" value={homeData.tax_bracket ? homeData.tax_bracket : 0 } onChange={changeHomeData} className="input input-bordered w-full max-w-xs"/>
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-base">Tax Amortization (years)</span>
                    </div>
                    <input type="number" id="tax_amort" value={homeData.tax_amort_in_years ? homeData.tax_amort_in_years : ""} onChange={changeHomeData} className="input input-bordered w-full max-w-xs"/>
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-base">Land Percentage (%)</span>
                    </div>
                    <input type="number" id="land_percentage" value={homeData.land_percentage ? homeData.land_percentage : 0 } onChange={changeHomeData} className="input input-bordered w-full max-w-xs"/>
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-base">Capital Gain Tax (%)</span>
                    </div>
                    <input type="number" id="gains_tax" value={homeData.gains_tax ? homeData.gains_tax : 0 } onChange={changeHomeData} className="input input-bordered w-full max-w-xs"/>
                </label>
            </div> : null }
        </div>
        
      </div>
        <Graphbox {...homeData}/>
    </main>
  );
};

export default RentalCalculator;
