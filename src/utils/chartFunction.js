import { mapToSeparateArray } from "./dataFunctions";
export const groupDataByDate = (chartData, selectedOption, uniqueYears) => {
  const array = mapToSeparateArray(chartData);
  const newArray = array.map((item) => ({
    year: item.donemYil,
    [selectedOption.dataType]: item[selectedOption.dataType.toString()],
  }));
  const totalByYear = [];

  uniqueYears.forEach((year) => {
    let totalAktif = 0;
    newArray.forEach((item) => {
      if (item.year === year) {
        totalAktif += item[selectedOption.dataType.toString()];
      }
    });

    totalByYear.push({ year, [selectedOption.dataType]: totalAktif });
  });

  return totalByYear;
};
