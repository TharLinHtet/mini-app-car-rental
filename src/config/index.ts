export const config = {
    app: {
        title: 'RentXCar'
    },
    route: {
        home: '/home',
        details: '/details'
    },
    api: {
        url: import.meta.env.VITE_API_URL || "http://localhost:9000/api/",
    }
}