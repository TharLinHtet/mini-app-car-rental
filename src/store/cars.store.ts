import { useEffect, useState } from 'react';
import useGlobalState from "@/hooks/useGlobalState";
import carData from '@/config/car-data'; // Fallback car data

type carValueType = {
    id: number;
    name: string;
    price_per_day: number;
    image_url: string;
    rating: number;
    fuel_type: string;
    seats: number;
    transmission: string;
    fuel_usage: string;
    pricing_options: { amount: number; duration: string }[];
};

interface CarState {
    cars: carValueType[];
    setCars: (count: carValueType[]) => void;
    resetCars: (resetValue?: carValueType[]) => void;
    loading: boolean;
}

const fetchCarData = async (): Promise<carValueType[]> => {
    return new Promise(resolve => {
        setTimeout(() => resolve(carData), 10);
    });
};

const useCarStore = (): CarState => {
    const carStoreConfig = { name: "cars", defaultValue: carData, isPersist: true };
    const { value: cars, updateValue: setCars, resetPersistent: resetCars } = useGlobalState<carValueType[]>(carStoreConfig);

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const loadCars = async () => {
            if (!cars) {
                try {
                    const fetchedCars = await fetchCarData();
                    setCars(fetchedCars);
                } catch (error) {
                    console.error('Failed to fetch car data:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
        loadCars();
    }, [cars]);

    return { cars, setCars, resetCars, loading };
};

export default useCarStore;
