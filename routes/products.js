var express = require('express');
var router = express.Router();

var data = {
    "success": "true",
    "products": [
        {
            "id": "001",
            "productName": "Cyclone",
            "productUrl": "https://2wheels.com/velo-26/female-velo/Pride-Pink",
            "productImageUrl": "https://veliki.com.ua/files/2018/02_08/16_32/u_files_store_0_1277790.jpg",
            "productPrice": "300",
            "productDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "productGender": "female",
            "productType": "mounting",
            "productWheelSize": "26"
        },
        {
            "id": "002",
            "productName": "Pride Rebel",
            "productUrl": "https://2wheels.com/velo-29/male-velo/Pride-Rebel",
            "productImageUrl": "https://veliki.com.ua/files/2018/02_08/16_27/u_files_store_0_1269991.jpg",
            "productPrice": "500",
            "productDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "productGender": "male",
            "productType": "mounting",
            "productWheelSize": "28"
        },
        {
            "id": "003",
            "productName": "Comanche",
            "productUrl": "https://2wheels.com/velo-29/male-velo/Pride-Rebel",
            "productImageUrl": "https://veliki.com.ua/files/2018/02_08/16_30/u_files_store_0_1275311.jpg",
            "productPrice": "450",
            "productDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "productGender": "male",
            "productType": "city",
            "productWheelSize": "26"
        },
        {
            "id": "004",
            "productName": "Optimo",
            "productUrl": "https://2wheels.com/velo-29/male-velo/Pride-Rebel",
            "productImageUrl": "https://veliki.com.ua/files/2018/02_08/16_33/u_files_store_0_1278510.jpg",
            "productPrice": "500",
            "productDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "productGender": "female",
            "productType": "city",
            "productWheelSize": "27"
        }
    ]
}

/* GET products. */
router.get('/', function(req, res, next) {

    let filterParams = req.query;

    var responseFilter = () => {

        let response = [];
        let filterTarget;

        for (let [key, value] of Object.entries(filterParams)) {

            filterTarget = response.length > 0 ? response : data.products;
            let accum = [];

            if (typeof value == 'string') {

                response = filterTarget.filter(el => {
                    return value == el[key]
                });

            } else {

                for (let i = 0; i < value.length; i++) {

                    let preResp = filterTarget.filter(el => {
                        return value[i] == el[key]
                    });
                    accum = [...accum, ...preResp]
                }

                response = [...[], ...accum];
            }

        }

        return response
    }

    var result = null;

    console.log(filterParams);

    if (Object.entries(filterParams).length != 0) {
        result = {
            "success": "true",
            "products": responseFilter(),
        }
    } else {
        console.log('No params');
        result = data;
    }

    res.json(result);

});

module.exports = router;