const objMethods = [
    {
        module: 'billing',
        object: {
            bill: {
                delete: ['deleteRowBill']
            },
            payMethod: {
                delete: 'deletePayMethod',
                update: {
                    status: 'setStatusPayMethod',
                    bank: 'editTo',
                    methodother: 'editTo',
                    methodbank: 'editTo'
                }
            }
        }
    },
    {
        module: 'direction',
        object: {
            control: {
                update: ['editMuniOrStreet']
            },
        }
    },
    {
        module: 'local',
        object: {
            control: {
                delete: {
                    route: 'deleteRoute',
                    local: 'deleteLocal'
                },
                update: {
                    local: 'editTo',
                    route: 'editTo'
                }
            }
        }
    },
    {
        module: 'person',
        object: {
            control: {
                update: {
                    person: 'editTo'
                },
                delete: {
                    person: 'editTo'
                }
            }
        }
    },
    {
        module: 'sales',
        object: {
            assignment: {
                update: {
                    state: 'updateStateAssignment'
                },
                delete: {
                    state: 'deleteAssignmentOrState',
                    assignment: 'deleteAssignmentOrState'
                }
            },
            products: {
                update: {
                    presentation: 'updateTo',
                    product: 'updateTo',
                    monto: 'updateTo'
                },
                delete: {
                    presentation: 'deleteTo',
                    product: 'deleteTo',
                    productsale: 'deleteProductSale'
                }
            }
        }
    },
    {
        module: 'seller',
        object: {
            control: {
                update: {
                    seller: 'desactivateSeller'
                }
            }
        }
    },
]

export default objMethods;