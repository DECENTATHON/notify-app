"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var axios_1 = require("@/shared/lib/axios");
var api = {
    audioStatistics: "/v1/audio/statistics"
};
var TotalService = /** @class */ (function () {
    function TotalService() {
    }
    TotalService.prototype.getAudioStatistics = function (_a) {
        var start_date = _a.start_date, end_date = _a.end_date;
        var token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        return axios_1.fetcher.post(api.audioStatistics, { start_date: start_date, end_date: end_date }, {
            headers: __assign({}, (token && { Authorization: "Bearer " + token }))
        });
    };
    return TotalService;
}());
exports["default"] = new TotalService();
