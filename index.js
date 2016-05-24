/**
 * Created by tsv on 24.05.16.
 */
module.exports = {

    validateLimit: function (limit) {

        if(limit && limit>0)
            return limit;
        else
            return 10;

    },
    validatePage: function (page) {

        if(page && page>0)
            return page;
        else
            return 1;
    },

    /**
     *   parametrs.entity;
         parametrs.params;
         parametrs.paginationObject;
         parametrs.res;
         parametrs.callback;
     * @param parametrs
     */
    get: function (parametrs) {

        var limit;
        var page;

        var entity = parametrs.entity;
        var params = parametrs.params;
        var paginationObject = parametrs.paginationObject;
        var res = parametrs.res;
        var callback = parametrs.callback;

        page = this.validatePage(paginationObject.page);

        entity.findAndCountAll(params).then(function(items) {

            params.limit = this.validateLimit(paginationObject.per_page);
            params.offset = page  * limit - limit;

            entity.findAll(params).then(function(collection) {

                var result = {
                    success: true,
                    data: items,
                    pagination: {
                        total_records: item,
                        total_pages: Math.ceil(items / limit),
                        current_page: page,
                        per_page: limit
                    }
                };

                if(callback) {
                    callback(result);
                } else {
                    res.send(result);
                }
            });
        });


    }
};