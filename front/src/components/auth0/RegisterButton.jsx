import { Button } from 'antd';
import axios from 'axios';

function RegisterButton({ email, selectedRol, selectedItem }) {

    const handleOnClick = () => {
        try {
            axios.post('http://localhost:3000/user', {
                email: email,
                latitude: 0,
                longitude: 0,
                role: selectedRol.label,
                route: selectedItem.label
            })
        }
        catch(error) {
            console.error(`Error encontrado: ${error.message}`);
        }
    };

    return ( 
        <Button type="primary" onClick={handleOnClick}>Registrar</Button>
    );
}

export default RegisterButton;
