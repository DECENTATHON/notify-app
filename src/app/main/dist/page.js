"use client";
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var Total_module_1 = require("@/entities/Total/Total.module");
var image_1 = require("next/image");
var react_query_1 = require("@tanstack/react-query");
var chart_js_1 = require("chart.js");
var react_chartjs_2_1 = require("react-chartjs-2");
var antd_1 = require("antd");
var antd_2 = require("antd");
var icons_1 = require("@ant-design/icons");
var photo_svg_1 = require("@/shared/assets/images/photo.svg");
chart_js_1.Chart.register(chart_js_1.BarElement, chart_js_1.CategoryScale, chart_js_1.LinearScale, chart_js_1.Tooltip, chart_js_1.Legend, chart_js_1.ArcElement);
var getProductName = function (key) {
    var map = {
        premium: "Премиальная карта",
        credit_card: "Кредитная карта",
        travel_card: "Карта для путешествий",
        fx_exchange: "Обмен валют",
        cash_loan: "Наличный кредит",
        deposit_multicurrency: "Депозит мультивалютный",
        deposit_fixed: "Депозит сберегательный",
        deposit_accumulative: "Депозит накопительный",
        investments_broker: "Инвестиции (брокерский счёт)",
        gold_bars: "Покупка слитков золота"
    };
    return map[key] || key;
};
var EXCLUDE_KEYS = [
    "client_code",
    "top3",
    "tx_count",
    "tx_amount_sum",
    "sum_online",
    "sum_travel",
    "sum_rest",
    "sum_groceries",
    "sum_fuel",
    "sum_jewelry",
    "sum_cosmetics",
    "share_online",
    "share_travel",
    "share_rest",
    "share_jewelry",
    "share_cosmetics",
    "top3_sum",
    "tx_sum_2025-06",
    "tx_sum_2025-07",
    "tx_sum_2025-08",
    "inflow_sum",
    "outflow_sum",
    "atm_withdrawal_out",
    "p2p_out",
    "card_out",
    "utilities_out",
    "salary_in",
    "loan_payment_out_out",
    "fx_buy_sum",
    "fx_sell_sum",
    "net_sum_3m",
    "net_std_3m",
    "months_pos_net",
    "name",
    "status",
    "age",
    "city",
    "avg_monthly_balance_KZT",
];
function DashboardPage() {
    var _this = this;
    var _a, _b, _c, _d, _e, _f;
    var _g = react_1.useState(false), modalOpen = _g[0], setModalOpen = _g[1];
    var _h = react_1.useState(null), transactionsFile = _h[0], setTransactionsFile = _h[1];
    var _j = react_1.useState(null), transfersFile = _j[0], setTransfersFile = _j[1];
    var _k = react_1.useState(false), uploading = _k[0], setUploading = _k[1];
    var queryClient = react_query_1.useQueryClient();
    var _l = react_1.useState(""), transactionsPath = _l[0], setTransactionsPath = _l[1];
    var _m = react_1.useState(""), transfersPath = _m[0], setTransfersPath = _m[1];
    react_1.useEffect(function () {
        var transactions = localStorage.getItem("transactions_path") || "";
        var transfers = localStorage.getItem("transfers_path") || "";
        setTransactionsPath(transactions);
        setTransfersPath(transfers);
    }, []);
    var _o = react_query_1.useQuery({
        queryKey: ["predictRulesPaths", transactionsPath, transfersPath],
        queryFn: function () {
            return Total_module_1.TotalService.predictRulesPaths({
                transactions_path: transactionsPath,
                transfers_path: transfersPath,
                clients_path: "data/raw/clients.csv"
            });
        },
        enabled: Boolean(transactionsPath && transfersPath)
    }), data = _o.data, isLoading = _o.isLoading, refetch = _o.refetch;
    var handleUpload = function () { return __awaiter(_this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!transactionsPath || !transfersPath) {
                        antd_2.message.error("Сначала загрузите оба файла.");
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, refetch()];
                case 2:
                    _a.sent();
                    antd_2.message.success("Данные успешно загружены и анализ выполнен.");
                    setModalOpen(false);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    antd_2.message.error("Ошибка при получении анализа.");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var beforeUpload = function (file) {
        var isCsv = file.type === "text/csv" || file.name.endsWith(".csv");
        if (!isCsv) {
            antd_2.message.error("Можно загружать только CSV файлы.");
        }
        return isCsv || antd_2.Upload.LIST_IGNORE;
    };
    var prediction = (_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a[0];
    var allProducts = react_1.useMemo(function () {
        if (!prediction)
            return [];
        return Object.entries(prediction)
            .filter(function (_a) {
            var key = _a[0];
            return !EXCLUDE_KEYS.includes(key);
        })
            .map(function (_a) {
            var key = _a[0], value = _a[1];
            return ({
                key: key,
                pct: Number((value * 100).toFixed(2))
            });
        })
            .sort(function (a, b) { return b.pct - a.pct; });
    }, [prediction]);
    var spendingPieData = react_1.useMemo(function () {
        if (!prediction)
            return null;
        var labels = [
            { key: "sum_online", label: "Онлайн" },
            { key: "sum_travel", label: "Путешествия" },
            { key: "sum_rest", label: "Рестораны" },
            { key: "sum_groceries", label: "Продукты" },
            { key: "sum_fuel", label: "Топливо" },
            { key: "sum_jewelry", label: "Украшения" },
            { key: "sum_cosmetics", label: "Косметика" },
        ];
        var data = labels
            .map(function (_a) {
            var key = _a.key, label = _a.label;
            return ({
                label: label,
                value: prediction[key]
            });
        })
            .filter(function (item) { return item.value != null && item.value > 0; });
        return {
            labels: data.map(function (d) { return d.label; }),
            datasets: [
                {
                    label: "Расходы",
                    data: data.map(function (d) { return d.value; }),
                    backgroundColor: [
                        "#1890ff",
                        "#ffc53d",
                        "#ff4d4f",
                        "#73d13d",
                        "#9254de",
                        "#13c2c2",
                        "#f759ab",
                    ],
                    borderWidth: 1
                },
            ]
        };
    }, [prediction]);
    var pieData = react_1.useMemo(function () {
        var _a, _b;
        return ({
            labels: ((_a = prediction === null || prediction === void 0 ? void 0 : prediction.top3) === null || _a === void 0 ? void 0 : _a.map(function (key) { return getProductName(key); })) || [],
            datasets: [
                {
                    label: "Интерес (%)",
                    data: ((_b = prediction === null || prediction === void 0 ? void 0 : prediction.top3) === null || _b === void 0 ? void 0 : _b.map(function (key) {
                        return Number((prediction[key] * 100).toFixed(2));
                    })) || [],
                    backgroundColor: ["#1890ff", "#ffc53d", "#52c41a"],
                    borderWidth: 1
                },
            ]
        });
    }, [prediction]);
    {
        transfersFile && (react_1["default"].createElement("div", { style: { marginTop: 8, color: "#52c41a" } },
            "\u0417\u0430\u0433\u0440\u0443\u0436\u0435\u043D: ",
            react_1["default"].createElement("strong", null, transfersFile.name),
            transfersPath && (react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement("br", null),
                react_1["default"].createElement("code", null, transfersPath)))));
    }
    return (react_1["default"].createElement(antd_2.Spin, { spinning: isLoading, size: "large", tip: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430...", style: {
            position: "absolute",
            zIndex: 100,
            backdropFilter: "blur(4px)",
            backgroundColor: "rgba(255,255,255,0.6)"
        } },
        react_1["default"].createElement("div", { className: "mb-6 flex items-center justify-between" },
            react_1["default"].createElement("div", { className: "flex items-center gap-2" },
                react_1["default"].createElement(antd_2.Button, { onClick: function () { return setModalOpen(true); }, size: "large", icon: react_1["default"].createElement(icons_1.UploadOutlined, null) }, "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0444\u0430\u0439\u043B\u044B CSV"))),
        !transactionsPath || !transfersPath ? (react_1["default"].createElement("div", { className: "flex flex-col items-center justify-center h-full p-10 text-lg font-semibold text-red-600" }, "\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 CSV \u0444\u0430\u0439\u043B\u044B \u0434\u043B\u044F \u0430\u043D\u0430\u043B\u0438\u0437\u0430.")) : (react_1["default"].createElement("div", { className: "mx-auto max-w-full" },
            react_1["default"].createElement("div", { className: "grid grid-cols-1 gap-6 lg:grid-cols-[360px_1fr]" },
                react_1["default"].createElement("div", { className: "flex flex-col gap-6" },
                    react_1["default"].createElement(antd_1.Card, { title: "\u041F\u0440\u043E\u0444\u0438\u043B\u044C", className: "bg-blue-50 shadow-md rounded-xl p-6 mb-6" },
                        react_1["default"].createElement("div", { className: "flex items-center gap-4 mb-4" },
                            react_1["default"].createElement(image_1["default"], { src: photo_svg_1["default"], alt: "\u0410\u0432\u0430\u0442\u0430\u0440", width: 72, height: 72, className: "rounded-full object-cover" }),
                            react_1["default"].createElement("div", { className: "space-y-1" },
                                react_1["default"].createElement("div", { className: "text-xl font-semibold leading-tight" }, (_b = prediction === null || prediction === void 0 ? void 0 : prediction.name) !== null && _b !== void 0 ? _b : "—"),
                                react_1["default"].createElement("div", { className: "text-sm text-gray-500" }, (_c = prediction === null || prediction === void 0 ? void 0 : prediction.city) !== null && _c !== void 0 ? _c : "—"),
                                react_1["default"].createElement("div", { className: "text-sm flex items-center gap-2 flex-wrap" },
                                    react_1["default"].createElement("span", null,
                                        "\u0412\u043E\u0437\u0440\u0430\u0441\u0442: ", (_d = prediction === null || prediction === void 0 ? void 0 : prediction.age) !== null && _d !== void 0 ? _d : "—"),
                                    react_1["default"].createElement("span", { className: "inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded" }, (_e = prediction === null || prediction === void 0 ? void 0 : prediction.status) !== null && _e !== void 0 ? _e : "—")))),
                        react_1["default"].createElement(antd_2.Divider, null),
                        react_1["default"].createElement("div", { className: "mt-4" },
                            react_1["default"].createElement("div", { className: "flex flex-col space-y-2 text-sm" },
                                react_1["default"].createElement("div", { className: "flex justify-between" },
                                    react_1["default"].createElement("span", { className: "text-gray-500" }, "\u0421\u0440\u0435\u0434\u043D\u0438\u0439 \u043C\u0435\u0441. \u043E\u0441\u0442\u0430\u0442\u043E\u043A (KZT)"),
                                    react_1["default"].createElement("span", { className: "font-medium" }, (prediction === null || prediction === void 0 ? void 0 : prediction.avg_monthly_balance_KZT) != null
                                        ? prediction.avg_monthly_balance_KZT.toLocaleString()
                                        : "—")),
                                react_1["default"].createElement("div", { className: "flex justify-between" },
                                    react_1["default"].createElement("span", { className: "text-gray-500" }, "\u0417\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u044F \u0437\u0430\u0440\u043F\u043B\u0430\u0442\u044B (KZT)"),
                                    react_1["default"].createElement("span", { className: "font-medium" }, (prediction === null || prediction === void 0 ? void 0 : prediction.salary_in) != null
                                        ? prediction.salary_in.toLocaleString()
                                        : "—")),
                                react_1["default"].createElement("div", { className: "flex justify-between" },
                                    react_1["default"].createElement("span", { className: "text-gray-500" }, "\u0421\u0443\u043C\u043C\u0430 \u043C\u0435\u0441\u044F\u0447\u043D\u044B\u0445 \u043D\u0435\u0442\u0442\u043E \u0437\u0430 3 \u043C\u0435\u0441. (KZT)"),
                                    react_1["default"].createElement("span", { className: "font-medium" }, (prediction === null || prediction === void 0 ? void 0 : prediction.net_sum_3m) != null
                                        ? Math.round(prediction.net_sum_3m).toLocaleString()
                                        : "—"))))),
                    react_1["default"].createElement(antd_1.Card, { title: "\u0414\u0432\u0438\u0436\u0435\u043D\u0438\u0435 \u0434\u0435\u043D\u0435\u0433 \u0437\u0430 3 \u043C\u0435\u0441." },
                        react_1["default"].createElement("div", { className: "grid grid-cols-2 gap-2 text-sm" },
                            react_1["default"].createElement(Kpi, { icon: react_1["default"].createElement(icons_1.WalletOutlined, null), label: "\u0412\u0445\u043E\u0434\u044F\u0449\u0438\u0435 (KZT)", value: prediction === null || prediction === void 0 ? void 0 : prediction.inflow_sum }),
                            react_1["default"].createElement(Kpi, { icon: react_1["default"].createElement(icons_1.CreditCardOutlined, null), label: "\u0418\u0441\u0445\u043E\u0434\u044F\u0449\u0438\u0435 (KZT)", value: prediction === null || prediction === void 0 ? void 0 : prediction.outflow_sum }),
                            react_1["default"].createElement(Kpi, { icon: react_1["default"].createElement(icons_1.WarningOutlined, null), label: "\u0422\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0438\u0439 (KZT)", value: prediction === null || prediction === void 0 ? void 0 : prediction.tx_count, format: "int" }),
                            react_1["default"].createElement(Kpi, { icon: react_1["default"].createElement(icons_1.BankOutlined, null), label: "\u041E\u0431\u0449\u0438\u0439 \u0440\u0430\u0441\u0445\u043E\u0434 (KZT)", value: prediction === null || prediction === void 0 ? void 0 : prediction.tx_amount_sum })))),
                react_1["default"].createElement("div", { className: "flex flex-col gap-6" },
                    react_1["default"].createElement(antd_1.Card, { title: "\u041F\u0440\u043E\u0433\u043D\u043E\u0437 \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u0430 \u043A \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430\u043C" },
                        react_1["default"].createElement("div", { className: "mb-4 grid grid-cols-1 gap-3 md:grid-cols-3 " }, (_f = prediction === null || prediction === void 0 ? void 0 : prediction.top3) === null || _f === void 0 ? void 0 : _f.map(function (key, index) {
                            var _a;
                            var pct = Number((prediction[key] * 100).toFixed(2));
                            var topColors = ["#52c41a", "#ffc53d", "#1890ff"];
                            var color = topColors[index] || "#ccc";
                            var push = (_a = prediction === null || prediction === void 0 ? void 0 : prediction.top3_push) === null || _a === void 0 ? void 0 : _a[index];
                            return (react_1["default"].createElement("div", { key: key, className: "rounded border p-3 flex flex-col", style: { borderLeft: "6px solid " + color } },
                                react_1["default"].createElement("div", { className: "text-sm text-gray-500" },
                                    "\u0422\u043E\u043F \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u044F #",
                                    index + 1),
                                react_1["default"].createElement("div", { className: "mt-1 text-base font-semibold leading-tight" }, getProductName(key)),
                                react_1["default"].createElement("div", { className: "mt-2 flex items-center gap-2" },
                                    react_1["default"].createElement(antd_2.Progress, { percent: pct, size: "small", strokeColor: color }),
                                    react_1["default"].createElement("span", { className: "text-sm font-medium" },
                                        pct,
                                        "%")),
                                push && (react_1["default"].createElement("div", { className: "mt-4 p-4 rounded-lg", style: {
                                        backgroundColor: color + "10"
                                    } },
                                    react_1["default"].createElement("div", { className: "text-sm font-medium mb-1 flex items-center gap-2", style: { color: color } },
                                        react_1["default"].createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
                                            react_1["default"].createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" })),
                                        "\u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u043E\u0435 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0435"),
                                    react_1["default"].createElement("div", { className: "text-sm text-gray-800 leading-relaxed" }, push.push_notification)))));
                        })),
                        react_1["default"].createElement("div", { className: "flex flex-col md:flex-row gap-6" },
                            react_1["default"].createElement(antd_1.Card, { title: "\u0420\u0430\u0441\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0438\u0435 \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u0430 (\u0442\u043E\u043F-3)", className: "md:flex-0.5" },
                                react_1["default"].createElement("div", { className: "w-[95%] h-[320px] md:h-[360px] mx-auto" },
                                    react_1["default"].createElement(react_chartjs_2_1.Pie, { data: pieData, options: {
                                            responsive: true,
                                            maintainAspectRatio: false
                                        } }))),
                            react_1["default"].createElement("div", { className: "rounded border p-3 md:flex-1 max-h-[300px] overflow-y-auto mt-[100px] min-w-[300px]" },
                                react_1["default"].createElement("div", { className: "mb-3 text-sm font-medium" }, "\u0412\u0441\u0435 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u044B"),
                                react_1["default"].createElement("div", { className: "grid grid-cols-1 gap-3 md:grid-cols-2" }, allProducts
                                    .filter(function (p) { return p.key !== "top3_push"; })
                                    .map(function (p, idx) {
                                    var pct = Number(p.pct);
                                    var validPct = isNaN(pct) ? 0 : pct;
                                    var getColor = function (pct) {
                                        if (pct >= 75)
                                            return "bg-green-500";
                                        if (pct >= 50)
                                            return "bg-yellow-500";
                                        if (pct >= 25)
                                            return "bg-orange-400";
                                        return "bg-gray-300";
                                    };
                                    return (react_1["default"].createElement("div", { key: p.key, className: "flex items-center justify-between rounded bg-white shadow-sm hover:shadow-md transition p-2" },
                                        react_1["default"].createElement("div", { className: "flex items-center gap-2" },
                                            react_1["default"].createElement("div", { className: "w-2.5 h-2.5 rounded-full " + getColor(validPct), title: validPct + "%" }),
                                            react_1["default"].createElement("span", { className: "text-sm" }, getProductName(p.key))),
                                        react_1["default"].createElement("span", { className: "text-sm font-semibold" },
                                            validPct,
                                            "%")));
                                }))))))),
            react_1["default"].createElement("div", { className: "flex flex-wrap gap-6 w-full" },
                react_1["default"].createElement("div", { className: "flex flex-wrap w-full gap-6" },
                    react_1["default"].createElement(antd_1.Card, { title: "\u0420\u0430\u0441\u0445\u043E\u0434\u044B \u043F\u043E \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F\u043C", className: "w-full md:w-1/3 flex flex-col" },
                        react_1["default"].createElement("div", { className: "flex-grow" },
                            react_1["default"].createElement(SpendRow, { label: "\u041E\u043D\u043B\u0430\u0439\u043D", value: prediction === null || prediction === void 0 ? void 0 : prediction.sum_online, color: "#1890ff" }),
                            react_1["default"].createElement(SpendRow, { label: "\u041F\u0443\u0442\u0435\u0448\u0435\u0441\u0442\u0432\u0438\u044F", value: prediction === null || prediction === void 0 ? void 0 : prediction.sum_travel, color: "#ffc53d" }),
                            react_1["default"].createElement(SpendRow, { label: "\u0420\u0435\u0441\u0442\u043E\u0440\u0430\u043D\u044B", value: prediction === null || prediction === void 0 ? void 0 : prediction.sum_rest, color: "#ff4d4f" }),
                            react_1["default"].createElement(SpendRow, { label: "\u041F\u0440\u043E\u0434\u0443\u043A\u0442\u044B", value: prediction === null || prediction === void 0 ? void 0 : prediction.sum_groceries, color: "#73d13d" }),
                            react_1["default"].createElement(SpendRow, { label: "\u0422\u043E\u043F\u043B\u0438\u0432\u043E", value: prediction === null || prediction === void 0 ? void 0 : prediction.sum_fuel, color: "#9254de" }),
                            react_1["default"].createElement(SpendRow, { label: "\u0423\u043A\u0440\u0430\u0448\u0435\u043D\u0438\u044F", value: prediction === null || prediction === void 0 ? void 0 : prediction.sum_jewelry, color: "#13c2c2" }),
                            react_1["default"].createElement(SpendRow, { label: "\u041A\u043E\u0441\u043C\u0435\u0442\u0438\u043A\u0430", value: prediction === null || prediction === void 0 ? void 0 : prediction.sum_cosmetics, color: "#f759ab" }))),
                    spendingPieData && (react_1["default"].createElement("div", { className: "flex-grow flex items-center justify-center" },
                        react_1["default"].createElement("div", { className: "w-[90%] h-[320px] md:h-[360px]" },
                            react_1["default"].createElement(react_chartjs_2_1.Pie, { data: spendingPieData, options: {
                                    responsive: true,
                                    maintainAspectRatio: false
                                } })))))))),
        react_1["default"].createElement(antd_2.Modal, { title: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C CSV \u0444\u0430\u0439\u043B\u044B", open: modalOpen, onCancel: function () { return setModalOpen(false); }, onOk: handleUpload, okText: "\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0430\u043D\u0430\u043B\u0438\u0437", okButtonProps: { disabled: false }, cancelText: "\u041E\u0442\u043C\u0435\u043D\u0430" },
            react_1["default"].createElement("div", { className: "mb-4" },
                react_1["default"].createElement("div", { className: "mb-1 font-medium" }, "\u0424\u0430\u0439\u043B \u0442\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0438\u0439 (transactions CSV):"),
                react_1["default"].createElement(antd_2.Upload, { accept: ".csv", beforeUpload: beforeUpload, maxCount: 1, customRequest: function (_a) {
                        var file = _a.file, onSuccess = _a.onSuccess, onError = _a.onError;
                        return __awaiter(_this, void 0, void 0, function () {
                            var res, err_1;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _b.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, Total_module_1.TotalService.uploadCsv(file)];
                                    case 1:
                                        res = _b.sent();
                                        if (res.data.status !== "success")
                                            throw new Error("Ошибка загрузки transactions");
                                        console.log("Сохраняем transactions_path в localStorage:", res.relative_path);
                                        localStorage.setItem("transactions_path", res.data.relative_path);
                                        setTransactionsPath(res.data.relative_path);
                                        setTransactionsFile(file);
                                        antd_2.message.success("Transactions файл загружен");
                                        onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess("ok");
                                        return [3 /*break*/, 3];
                                    case 2:
                                        err_1 = _b.sent();
                                        antd_2.message.error("Не удалось загрузить transactions файл");
                                        console.error(err_1);
                                        onError === null || onError === void 0 ? void 0 : onError(err_1);
                                        return [3 /*break*/, 3];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        });
                    }, fileList: transactionsFile
                        ? [{ uid: "1", name: transactionsFile.name, status: "done" }]
                        : [], onRemove: function () {
                        setTransactionsFile(null);
                        setTransactionsPath("");
                        localStorage.removeItem("transactions_path");
                    }, showUploadList: { showRemoveIcon: true, showDownloadIcon: false } },
                    react_1["default"].createElement(antd_2.Button, null, "Select CSV \u0444\u0430\u0439\u043B")),
                transfersFile && (react_1["default"].createElement("div", { style: { marginTop: 8, color: "#52c41a" } },
                    "\u0417\u0430\u0433\u0440\u0443\u0436\u0435\u043D: ",
                    react_1["default"].createElement("strong", null, transfersFile.name),
                    transfersPath && (react_1["default"].createElement(react_1["default"].Fragment, null,
                        react_1["default"].createElement("br", null),
                        react_1["default"].createElement("code", null, transfersPath)))))),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("div", { className: "mb-1 font-medium" }, "\u0424\u0430\u0439\u043B \u043F\u0435\u0440\u0435\u0432\u043E\u0434\u043E\u0432 (transfers CSV):"),
                react_1["default"].createElement(antd_2.Upload, { accept: ".csv", beforeUpload: beforeUpload, maxCount: 1, customRequest: function (_a) {
                        var file = _a.file, onSuccess = _a.onSuccess, onError = _a.onError;
                        return __awaiter(_this, void 0, void 0, function () {
                            var res, err_2;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _b.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, Total_module_1.TotalService.uploadCsv(file)];
                                    case 1:
                                        res = _b.sent();
                                        if (res.data.status !== "success")
                                            throw new Error("Ошибка загрузки transfers");
                                        localStorage.setItem("transfers_path", res.data.relative_path);
                                        setTransfersPath(res.data.relative_path);
                                        setTransfersFile(file);
                                        antd_2.message.success("Transfers файл загружен");
                                        onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess("ok");
                                        return [3 /*break*/, 3];
                                    case 2:
                                        err_2 = _b.sent();
                                        antd_2.message.error("Не удалось загрузить transfers файл");
                                        console.error(err_2);
                                        onError === null || onError === void 0 ? void 0 : onError(err_2);
                                        return [3 /*break*/, 3];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        });
                    }, fileList: transfersFile
                        ? [{ uid: "2", name: transfersFile.name, status: "done" }]
                        : [], onRemove: function () {
                        setTransfersFile(null);
                        setTransfersPath("");
                        localStorage.removeItem("transfers_path");
                    }, showUploadList: { showRemoveIcon: true, showDownloadIcon: false } },
                    react_1["default"].createElement(antd_2.Button, null, "Select CSV \u0444\u0430\u0439\u043B")),
                transfersFile && (react_1["default"].createElement("div", { style: { marginTop: 8, color: "#52c41a" } },
                    "\u0417\u0430\u0433\u0440\u0443\u0436\u0435\u043D: ",
                    react_1["default"].createElement("strong", null, transfersFile.name),
                    transfersPath && (react_1["default"].createElement(react_1["default"].Fragment, null,
                        react_1["default"].createElement("br", null),
                        react_1["default"].createElement("code", null, transfersPath)))))))));
}
exports["default"] = DashboardPage;
var kpiColors = {
    inflow: "#52c41a",
    outflow: "#ff4d4f",
    txCount: "#faad14",
    txAmountSum: "#1890ff"
};
function Kpi(_a) {
    var icon = _a.icon, label = _a.label, value = _a.value, _b = _a.format, format = _b === void 0 ? "money" : _b;
    var color = "#1890ff";
    if (label.includes("Входящие"))
        color = kpiColors.inflow;
    else if (label.includes("Исходящие"))
        color = kpiColors.outflow;
    else if (label.includes("Транзакций"))
        color = kpiColors.txCount;
    else if (label.includes("Общий расход"))
        color = kpiColors.txAmountSum;
    var display = value != null
        ? format === "int"
            ? value.toLocaleString()
            : value.toLocaleString(undefined, { minimumFractionDigits: 2 })
        : "—";
    var isLongLabel = label.length > 20;
    return (react_1["default"].createElement("div", { className: "flex items-center gap-3 rounded border p-2 shadow-sm hover:shadow-md transition-shadow duration-200" },
        react_1["default"].createElement("div", { className: "flex items-center justify-center rounded-md text-white transition-all duration-200", style: {
                backgroundColor: color,
                height: isLongLabel ? 24 : 32,
                width: isLongLabel ? 24 : 32,
                minWidth: isLongLabel ? 24 : 32,
                minHeight: isLongLabel ? 24 : 32,
                fontSize: isLongLabel ? "0.875rem" : "1rem"
            } }, icon),
        react_1["default"].createElement("div", { className: "leading-tight" },
            react_1["default"].createElement("div", { className: "text-xs text-gray-500" }, label),
            react_1["default"].createElement("div", { className: "text-sm font-semibold" }, display))));
}
function SpendRow(_a) {
    var label = _a.label, value = _a.value, color = _a.color;
    return (react_1["default"].createElement("div", { className: "flex items-center justify-between rounded bg-gray-50 px-3 py-2" },
        react_1["default"].createElement("div", { className: "flex items-center gap-2" },
            react_1["default"].createElement("div", { className: "w-2.5 h-2.5 rounded-full", style: { backgroundColor: color } }),
            react_1["default"].createElement("span", { className: "text-sm" }, label)),
        react_1["default"].createElement("span", { className: "text-sm font-medium" }, value != null
            ? value.toLocaleString(undefined, { minimumFractionDigits: 2 })
            : "—")));
}
