import axios from "axios";

export async function fetchingCategory() {
    try {
        const response = await axios.get('http://localhost:3000/api/category/all')
        const listCategory = response.data;
        return listCategory;
    } catch (error) {
        return []
    }
}