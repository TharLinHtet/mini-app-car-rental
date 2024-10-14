import useCarStore from "@/store/cars.store";

const useCars = () => {
    const { cars, loading } = useCarStore();

    const searchCars = (searchTerm: string) => {
        const lowercasedTerm = searchTerm.toLowerCase().replace(/\s+/g, '');
        if (loading) return [];

        return cars.filter(car => {
            const nameWithoutSpaces = car.name.toLowerCase().replace(/\s+/g, '');
            const matchesSearchTerm = nameWithoutSpaces.includes(lowercasedTerm);
            const matchesPrice = car.price_per_day.toString().includes(lowercasedTerm);
            const matchesRating = car.rating.toString().includes(lowercasedTerm);

            return matchesSearchTerm || matchesPrice || matchesRating;
        });
    };

    return { cars, searchCars, loading };
};

export default useCars;
