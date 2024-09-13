import { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';


function RouteButton() {
    const [selectedItem, setSelectedItem] = useState(null);

    const items = [
        {
            label: 'Puerta de Hierro',
            key: '1',
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
            {selectedItem ? `${selectedItem.label}` : 'Selecciona una ruta'}
            <DownOutlined />
        </Button>
    </Dropdown>
    )
}

export default RouteButton;