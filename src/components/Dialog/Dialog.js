import React from 'react'
import { Modal, Button } from '@material-ui/core'
import { BondsTable } from '../BondsTable/BondsTable'

export const Dialog = (props) => {
    return (
        <Modal open width="800">
            <div>
                <Button onClick={props.close}>Close</Button>

                <BondsTable bonds={props.selectedBonds} columns={[
                    { id: 'name', numeric: false, disablePadding: true, label: 'Название' },
                    { id: 'value', numeric: true, disablePadding: true, label: 'Номинал' },
                    { id: 'price', numeric: true, disablePadding: false, label: 'Тек.Цена' },
                    { id: 'isin', numeric: false, disablePadding: false,
                        template: <Button>remove</Button>,
                        onClick: props.removePortfolio
                    }
                ]} />
                
                <BondsTable bonds={props.availableBonds} columns={[
                    { id: 'name', numeric: false, disablePadding: true, label: 'Название' },
                    { id: 'value', numeric: true, disablePadding: true, label: 'Номинал' },
                    { id: 'price', numeric: true, disablePadding: false, label: 'Тек.Цена' },
                    { id: 'isin', numeric: false, disablePadding: false, 
                        template: <Button>add</Button>, 
                        onClick: props.addPortfolio
                    }
                ]} />
            </div>
        </Modal>
    )
}
