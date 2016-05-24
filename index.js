/**
 * Created by tsv on 24.05.16.
 */
module.exports = {

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


        var validateLimit = function (limit) {
            if(limit && limit>0)
                return limit;
            else
                return 10;
        };
        var validatePage = function (page) {

            if(page && page>0)
                return page;
            else
                return 1;
        };

        page = validatePage(paginationObject.page) * 1;
        limit = validateLimit(paginationObject.per_page) * 1;

        entity.findAndCountAll(params).then(function(items) {

            params.limit = limit;
            params.offset = page  * limit - limit;

            entity.findAndCountAll(params).then(function(collection) {

                var result = {
                    success: true,
                    data: collection.rows,
                    pagination: {
                        total_records: items.count,
                        total_pages: Math.ceil(items.count / limit),
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