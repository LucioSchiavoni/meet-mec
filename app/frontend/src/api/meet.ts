import clienteAxios from "../config/axios";



export const getMeet = async () => {
    try {
        const response = await clienteAxios.get('/get');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


export const createMeet = async (data: any) => {
    try {
        const response = await clienteAxios.post('/post/meet', data);
        return response.data;       
    } catch (error) {
        console.log(error);
    }
}