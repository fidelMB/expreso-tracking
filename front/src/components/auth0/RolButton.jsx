import { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';


function RolButton({ selectedRol, setSelectedRol }) {
    const items = [
        {
            label: 'Estudiante',
            key: '1',
        },
        {
            label: 'Operador',
            key: '2',
        },
    ];

    const handleMenuClick = ({ key }) => {
        const selectedRol = items.find((item) => item.key === key);
        setSelectedRol(selectedRol);
    };

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    return (
    <Dropdown menu={menuProps}>
        <Button>
            {selectedRol ? `${selectedRol.label}` : 'Selecciona un rol'}
            <DownOutlined />
        </Button>
    </Dropdown>
    )
}

export default RolButton;