# tsv-seq-pagination
Pagination module for sequelize

# Install
```
npm install tsv-seq-pagination --save
```
# Using

## In your controller

```
var pagination = require('tsv-seq-pagination');

var LinkedEntity = {
    include: [
        {model: Manager, as: 'Manager'},
        {model: Brands, include: [
            {model: Files, as: 'logo'}
        ]}
    ]
};

pagination.get({
    entity: Reviews,
    params: LinkedEntity,
    paginationObject:{
        page:req.query.page,
        per_page:req.query.per_page
    },
    res: res
});
```

## GET parameters
url request: http://somdomain/restapi/route?page=1&per_page=20