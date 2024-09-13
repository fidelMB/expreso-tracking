import { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';


function RolButton() {
    const [selectedItem, setSelectedItem] = useState(null);

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
        const selectedItem = items.find((item) => item.key === key);
        setSelectedItem(selectedItem);
    };

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    return (
    <Dropdown menu={menuProps}>
        <Button>
            {selectedItem ? `${selectedItem.label}` : 'Selecciona un rol'}
            <DownOutlined />
        </Button>
    </Dropdown>
    )
}

export default RolButton;