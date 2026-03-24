export const calculateTrip = (
    distance: number,
    mileage: number,
    fuelPrice : number,
    revenue : number,
    driverCost : number
   ) =>{
    const fuelCost = (distance/mileage)*fuelPrice;
    const profit = revenue - (fuelCost+driverCost);


    return {fuelCost, profit};
}

