import { CarType } from "../types";

const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'dd04f2866bmsh696e9bc954f3358p1b1451jsn400e310dafcb',
        'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com',
    },
};

// Normalde bu fonksiyonumuz bir CarType dizisi return ediyor. Ama bu dizi api den bir gecikme sonrasında geldiğinden dolayı return satırına sadece CarType[] yazamıyoruz. Bu return edilen değeri Promise ismindeki interface'e generic tip olarak göndermeliyiz.

type FilterType = {
    make?: string;
    model?: string;
    limit?: string;
    fuel_type?: string;
    year?: string;
};

export const fetchCars = async (paramsObj: FilterType): Promise<CarType[]> => {
    // parametreler gelmediği durumda geçerli olacak varsayılan değerlerini belirle
    const {
        limit = "5",
        make = "bmw",
        model = "",
        fuel_type = "",
        year = "",
    } = paramsObj;

    console.log(make);

    const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${make}&model=${model}&fuel_type=${fuel_type}&year=${year}&limit=${limit}`;

    const res = await fetch(url, options);

    return await res.json();
};