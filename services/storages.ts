export default function getToken(){
    if (typeof window !== 'undefined'){
        const token = localStorage.getItem('token');
        return token;
    }
}
