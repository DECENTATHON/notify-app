"use strict";
exports.__esModule = true;
var axios_1 = require("@/shared/lib/axios");
var api = {
    predictRulesPaths: "/predict_distilled_paths",
    uploadCsv: "/upload",
    downloadFile: function (filename) { return "/download/" + filename; }
};
var TotalService = /** @class */ (function () {
    function TotalService() {
    }
    TotalService.prototype.predictRulesPaths = function (data) {
        return axios_1.fetcher.post(api.predictRulesPaths, data);
    };
    TotalService.prototype.uploadCsv = function (file) {
        var formData = new FormData();
        formData.append("file", file);
        return axios_1.fetcher.post(api.uploadCsv, formData, {
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
        });
    };
    TotalService.prototype.downloadFile = function (filename) {
        return axios_1.fetcher.get(api.downloadFile(filename), {
            responseType: "blob"
        });
    };
    return TotalService;
}());
exports["default"] = new TotalService();
