// source: 
// https://goodcalculators.com/water-intake-calculator/
// https://www.goodhousekeeping.com/health/diet-nutrition/a46956/how-much-water-should-i-drink/
function ozWaterPerDay(params){
    /**
     * @param weight 
     * @param activity
     * @param age
     * returns water needed per day in oz
     */
    const weight = params.weight;
    const age = params.age;
    const activity = params.activity;
    let ageFactor;
    if (age<30) {
        ageFactor = 40;
    } else if (30 <= age < 55){
        ageFactor = 35;
    } else if (age >= 55) {
        ageFactor = 30;
    }
    
    return (weight/(2.2) * ageFactor)/28.3 + (activity/60)*10;
}
function cupsWaterPerDay(params){
    /**
     * @param ozWaterPerDay
     * @param cupSize
     */
    return params.ozWaterPerDay/params.cupSize;
}
function cupsWaterRemaining(params){
    /**
     * @param ozWaterPerDay
     * @param ozWaterConsumed
     * @param cupSize
     */
    return (ozWaterPerDay-ozWaterConsumed)/cupSize
}
module.exports=ozWaterPerDay;