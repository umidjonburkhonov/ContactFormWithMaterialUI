import axios from "axios";

const API_URL = "http://localhost:4000/contacts";

export const contactsService = {
    async getAllContacts() {
        const res = await axios.get(API_URL);
        return res.data;
    },
    async getContactById(id) {
        const res = await axios.get(`${API_URL}/${id}`);
        return res.data;
    },
    async createContact(contact) {
        const res = await axios.post(API_URL, contact);
        return res.data;
    },
    async updateContact(id, contact) {
        const res = await axios.put(`${API_URL}/${id}`, contact);
        return res.data;
    },
    async removeContact(id) {
        await axios.delete(`${API_URL}/${id}`);
        return id;
    }
};
