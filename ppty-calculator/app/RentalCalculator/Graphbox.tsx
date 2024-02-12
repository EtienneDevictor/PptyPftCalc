'use client'

import React from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
    Tooltip,
    ResponsiveContainer,
  } from 'recharts';

interface GraphboxProps  {
    acquisition_date: string;
    price: number;
    repairs: number;
    down_payment_percent: number;
    // Loan Variables 
    annual_interest_rate: number;
    loan_term: number;
    // Appreciation Variables 
    property_appreciation: number;
    selling_cost: number;
    sale_date: string;
    // Rent Variables 
    monthly_rent_percent: number;
    vacancy_percentage: number;
    brokerage_fee: number;
    annual_increase_rent: number;
    property_tax_precentage_of_MTM_value: number;
    maintenance_percentage: number;
    // Tax Variables 
    tax_amort_in_years: number;
    land_percentage: number;
    gains_tax: number;
}

export const Graphbox: React.FC<GraphboxProps> = ({ acquisition_date, price, repairs, down_payment_percent, annual_interest_rate, 
                                                    loan_term, property_appreciation, selling_cost, sale_date, monthly_rent_percent, 
                                                    vacancy_percentage, brokerage_fee, annual_increase_rent, gains_tax, land_percentage,
                                                    property_tax_precentage_of_MTM_value, maintenance_percentage, tax_amort_in_years, 
                                                    }) => {

    const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 1000,
        pv: 4300,
        amt: 2100,
    },
];

  return (
    <div className="flex flex-col w-2/3 px-10 py-10 items-center">
       
        <div className="flex flex-row justify-between w-3/5 pb-10 ">
            <details className="dropdown">
                <summary className="m-1 btn">open or close</summary>
                <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                    <li><a>Item 1</a></li>
                    <li><a>Item 2</a></li>
                </ul>
            </details>
            <details className="dropdown">
                <summary className="m-1 btn">open or close</summary>
                <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                    <li><a>Item 1</a></li>
                    <li><a>Item 2</a></li>
                </ul>
            </details>
        </div> 
        <ResponsiveContainer width="80%" height="50%">
            <LineChart width={500} height={500} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
        <div id="table_display"></div>
    </div>
  )
}
