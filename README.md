# tsv-seq-pagination
Pagination module for sequelize

# Install
npm install tsv-seq-pagination --save

# Using

var pagination = require('tsv-seq-pagination');

var LikedEntity = {
    include: [
        {model: Manager, as: 'Manager'},
        {model: Brands, include: [
            {model: Files, as: 'logo'}
        ]}
    ]
};

pagination.get({
    entity: Reviews,
    params: LikedEntity,
    paginationObject:{
        page:req.query.page,
        per_page:req.query.per_page
    },
    res: res
});