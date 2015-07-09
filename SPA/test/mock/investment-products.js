'use strict';

angular.module('mockedProductsInvest', [])
    .value('investmentsJSON', {
        "products" :
            [
                {
                    "category": "CEDE",
                    "productName": "CEDE 60 DIAS",
                    "product_id": "500-CEDE"
                },
                {
                    "category": "CEDE",
                    "productName": "CEDE 90 DIAS",
                    "product_id": "501-CEDE"
                },
                {
                    "category": "CEDE",
                    "productName": "CEDE 120 DIAS",
                    "product_id": "502-CEDE"
                },
                {
                    "category": "CEDE",
                    "productName": "CEDE_010",
                    "product_id": "103-CEDE"
                },
                {
                    "category": "PRLV",
                    "productName": "PRLV 7 DIAS",
                    "product_id": "400-PRLV"
                },
                {
                    "category": "PRLV",
                    "productName": "PRLV 14 DIAS",
                    "product_id": "401-PRLV"
                },
                {
                    "category": "PRLV",
                    "productName": "PRLV 21 DIAS",
                    "product_id": "402-PRLV"
                },
                {
                    "category": "PRLV",
                    "productName": "Fondo de Inversi?n Tipo PRLV",
                    "product_id": "401-PRLV"
                },
                {
                    "category": "PRLV",
                    "productName": "PRLV_009",
                    "product_id": "103-PRLV"
                }
            ],
        "investment_cede_allowed": true,
        "investment_prlv_allowed": true,
        "investment_vista_allowed": true
    }
);
