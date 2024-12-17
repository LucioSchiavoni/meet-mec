import clienteAxios from "../config/axios";



export const getMeet = async () => {
    try {
        const response = await clienteAxios.get('/meet');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


export const createMeet = async (meet: any) => {
    try {
        const response = await clienteAxios.post('/post/meet', meet);
        return response.data;       
    } catch (error) {
        console.log(error);
    }
}