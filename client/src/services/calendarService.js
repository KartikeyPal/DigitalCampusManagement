import api from "../api/axios";

const getCalendar = async (year) => {
    const response = await api.get(`/campus/calendar/${year}`);
    return response.data;
};

const addEvent = async (year, eventData) => {
    const response = await api.post(`/campus/calendar/${year}/events`, eventData);
    return response.data;
};

const calendarService = {
    getCalendar,
    addEvent,
    createCalendar: async (calendarData) => {
        const response = await api.post("/campus/calendar", calendarData);
        return response.data;
    }
};

export default calendarService;
