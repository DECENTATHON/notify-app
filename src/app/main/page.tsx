"use client"
import React, { useState, useMemo, useEffect} from "react";
import { TotalService } from "@/entities/Total/Total.module";
import Image from "next/image";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

import { Card } from "antd";
import {
  Modal,
  Button,
  Upload,
  message,
  Spin,
  Divider,
  Progress,
  notification,
} from "antd";
import {
  CreditCardOutlined,
  WalletOutlined,
  WarningOutlined,
  BankOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import AvatarIcon from "@/shared/assets/images/photo.svg";
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
);

const getProductName = (key: string): string => {
  const map: Record<string, string> = {
    premium: "Премиальная карта",
    credit_card: "Кредитная карта",
    travel_card: "Карта для путешествий",
    fx_exchange: "Обмен валют",
    cash_loan: "Наличный кредит",
    deposit_multicurrency: "Депозит мультивалютный",
    deposit_fixed: "Депозит сберегательный",
    deposit_accumulative: "Депозит накопительный",
    investments_broker: "Инвестиции (брокерский счёт)",
    gold_bars: "Покупка слитков золота",
  };
  return map[key] || key;
};

const EXCLUDE_KEYS = [
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

interface Top3PushItem {
  product: string;
  push_notification: string;
}

export default function DashboardPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [transactionsFile, setTransactionsFile] = useState<File | null>(null);
  const [transfersFile, setTransfersFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const queryClient = useQueryClient();
  const [transactionsPath, setTransactionsPath] = useState("");
const [transfersPath, setTransfersPath] = useState("");

useEffect(() => {
  const transactions = localStorage.getItem("transactions_path") || "";
  const transfers = localStorage.getItem("transfers_path") || "";
  setTransactionsPath(transactions);
  setTransfersPath(transfers);
}, []);

  // useEffect(() => {
  //   const transactions = localStorage.getItem("transactions_path") || "";
  //   const transfers = localStorage.getItem("transfers_path") || "";
  //   setTransactionsPath(transactions);
  //   setTransfersPath(transfers);
  // }, []);

  // const [transactionsPath, setTransactionsPath] = useState(
  //   localStorage.getItem("transactions_path") || ""
  // );
  // const [transfersPath, setTransfersPath] = useState(
  //   localStorage.getItem("transfers_path") || ""
  // );

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["predictRulesPaths", transactionsPath, transfersPath],
    queryFn: () =>
      TotalService.predictRulesPaths({
        transactions_path: transactionsPath,
        transfers_path: transfersPath,
        clients_path: "data/raw/clients.csv",
      }),
    enabled: Boolean(transactionsPath && transfersPath),
  });

  const handleUpload = async () => {
    if (!transactionsPath || !transfersPath) {
      message.error("Сначала загрузите оба файла.");
      return;
    }
    try {
      await refetch();
      message.success("Данные успешно загружены и анализ выполнен.");
      setModalOpen(false);
    } catch (error) {
      message.error("Ошибка при получении анализа.");
    }
  };

  const beforeUpload = (file: File) => {
    const isCsv = file.type === "text/csv" || file.name.endsWith(".csv");
    if (!isCsv) {
      message.error("Можно загружать только CSV файлы.");
    }
    return isCsv || Upload.LIST_IGNORE;
  };

  const prediction = data?.data?.[0];
  const allProducts = useMemo(() => {
    if (!prediction) return [] as { key: string; pct: number }[];
    return Object.entries(prediction)
      .filter(([key]) => !EXCLUDE_KEYS.includes(key))
      .map(([key, value]) => ({
        key,
        pct: Number(((value as number) * 100).toFixed(2)),
      }))
      .sort((a, b) => b.pct - a.pct);
  }, [prediction]);

  const spendingPieData = useMemo(() => {
    if (!prediction) return null;

    const labels = [
      { key: "sum_online", label: "Онлайн" },
      { key: "sum_travel", label: "Путешествия" },
      { key: "sum_rest", label: "Рестораны" },
      { key: "sum_groceries", label: "Продукты" },
      { key: "sum_fuel", label: "Топливо" },
      { key: "sum_jewelry", label: "Украшения" },
      { key: "sum_cosmetics", label: "Косметика" },
    ];

    const data = labels
      .map(({ key, label }) => ({
        label,
        value: prediction[key],
      }))
      .filter((item) => item.value != null && item.value > 0);

    return {
      labels: data.map((d) => d.label),
      datasets: [
        {
          label: "Расходы",
          data: data.map((d) => d.value),
          backgroundColor: [
            "#1890ff",
            "#ffc53d",
            "#ff4d4f",
            "#73d13d",
            "#9254de",
            "#13c2c2",
            "#f759ab",
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [prediction]);

  const pieData = useMemo(
    () => ({
      labels: prediction?.top3?.map((key: string) => getProductName(key)) || [],
      datasets: [
        {
          label: "Интерес (%)",
          data:
            prediction?.top3?.map((key: string) =>
              Number((prediction[key] * 100).toFixed(2))
            ) || [],
          backgroundColor: ["#1890ff", "#ffc53d", "#52c41a"],
          borderWidth: 1,
        },
      ],
    }),
    [prediction]
  );

  {
    transfersFile && (
      <div style={{ marginTop: 8, color: "#52c41a" }}>
        Загружен: <strong>{transfersFile.name}</strong>
        {transfersPath && (
          <>
            <br />
            <code>{transfersPath}</code>
          </>
        )}
      </div>
    );
  }

  return (
    <Spin
      spinning={isLoading}
      size="large"
      tip="Загрузка..."
      style={{
        position: "absolute",
        zIndex: 100,
        backdropFilter: "blur(4px)",
        backgroundColor: "rgba(255,255,255,0.6)",
      }}
    >
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setModalOpen(true)}
            size="large"
            icon={<UploadOutlined />}
          >
            Загрузить файлы CSV
          </Button>
        </div>
      </div>

      {!transactionsPath || !transfersPath ? (
        <div className="flex flex-col items-center justify-center h-full p-10 text-lg font-semibold text-red-600">
          Пожалуйста, загрузите CSV файлы для анализа.
        </div>
      ) : (
        <div className="mx-auto max-w-full">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[360px_1fr]">
            <div className="flex flex-col gap-6">
              <Card
                title="Профиль"
                className="bg-blue-50 shadow-md rounded-xl p-6 mb-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={AvatarIcon}
                    alt="Аватар"
                    width={72}
                    height={72}
                    className="rounded-full object-cover"
                  />
                  <div className="space-y-1">
                    <div className="text-xl font-semibold leading-tight">
                      {prediction?.name ?? "—"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {prediction?.city ?? "—"}
                    </div>
                    <div className="text-sm flex items-center gap-2 flex-wrap">
                      <span>Возраст: {prediction?.age ?? "—"}</span>
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                        {prediction?.status ?? "—"}
                      </span>
                    </div>
                  </div>
                </div>

                <Divider />
                <div className="mt-4">
                  <div className="flex flex-col space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">
                        Средний мес. остаток (KZT)
                      </span>
                      <span className="font-medium">
                        {prediction?.avg_monthly_balance_KZT != null
                          ? prediction.avg_monthly_balance_KZT.toLocaleString()
                          : "—"}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-500">
                        Зачисления зарплаты (KZT)
                      </span>
                      <span className="font-medium">
                        {prediction?.salary_in != null
                          ? prediction.salary_in.toLocaleString()
                          : "—"}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-500">
                        Сумма месячных нетто за 3 мес. (KZT)
                      </span>
                      <span className="font-medium">
                        {prediction?.net_sum_3m != null
                          ? Math.round(prediction.net_sum_3m).toLocaleString()
                          : "—"}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card title="Движение денег за 3 мес.">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <Kpi
                    icon={<WalletOutlined />}
                    label="Входящие (KZT)"
                    value={prediction?.inflow_sum}
                  />
                  <Kpi
                    icon={<CreditCardOutlined />}
                    label="Исходящие (KZT)"
                    value={prediction?.outflow_sum}
                  />
                  <Kpi
                    icon={<WarningOutlined />}
                    label="Транзакций (KZT)"
                    value={prediction?.tx_count}
                    format="int"
                  />
                  <Kpi
                    icon={<BankOutlined />}
                    label="Общий расход (KZT)"
                    value={prediction?.tx_amount_sum}
                  />
                </div>
              </Card>
            </div>

            <div className="flex flex-col gap-6">
              <Card title="Прогноз интереса к продуктам">
                <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-3 ">
                  {prediction?.top3?.map((key: string, index: number) => {
                    const pct = Number(
                      ((prediction[key] as number) * 100).toFixed(2)
                    );
                    const topColors = ["#52c41a", "#ffc53d", "#1890ff"];
                    const color = topColors[index] || "#ccc";

                    const push = prediction?.top3_push?.[index];

                    return (
                      <div
                        key={key}
                        className="rounded border p-3 flex flex-col"
                        style={{ borderLeft: `6px solid ${color}` }}
                      >
                        <div className="text-sm text-gray-500">
                          Топ рекомендация #{index + 1}
                        </div>
                        <div className="mt-1 text-base font-semibold leading-tight">
                          {getProductName(key)}
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <Progress
                            percent={pct}
                            size="small"
                            strokeColor={color}
                          />
                          <span className="text-sm font-medium">{pct}%</span>
                        </div>
                        {push && (
                          <div
                            className="mt-4 p-4 rounded-lg"
                            style={{
                              backgroundColor: `${color}10`,
                              // borderLeft: `4px solid ${color}`,
                            }}
                          >
                            <div
                              className="text-sm font-medium mb-1 flex items-center gap-2"
                              style={{ color }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                />
                              </svg>
                              Персональное уведомление
                            </div>
                            <div className="text-sm text-gray-800 leading-relaxed">
                              {push.push_notification}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                  <Card
                    title="Распределение интереса (топ-3)"
                    className="md:flex-0.5"
                  >
                    <div className="w-[95%] h-[320px] md:h-[360px] mx-auto">
                      <Pie
                        data={pieData}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                        }}
                      />
                    </div>
                  </Card>

                  <div className="rounded border p-3 md:flex-1 max-h-[300px] overflow-y-auto mt-[100px] min-w-[300px]">
                    <div className="mb-3 text-sm font-medium">Все продукты</div>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      {allProducts.map((p, idx) => {
                        const getColor = (pct: number) => {
                          if (pct >= 75) return "bg-green-500";
                          if (pct >= 50) return "bg-yellow-500";
                          if (pct >= 25) return "bg-orange-400";
                          return "bg-gray-300";
                        };

                        return (
                          <div
                            key={p.key}
                            className="flex items-center justify-between rounded bg-white shadow-sm hover:shadow-md transition p-2"
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-2.5 h-2.5 rounded-full ${getColor(p.pct)}`}
                                title={`${p.pct}%`}
                              />
                              <span className="text-sm">
                                {getProductName(p.key)}
                              </span>
                            </div>
                            <span className="text-sm font-semibold">
                              {p.pct}%
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 w-full">
            <div className="flex flex-wrap w-full gap-6">
              <Card
                title="Расходы по категориям"
                className="w-full md:w-1/3 flex flex-col"
              >
                <div className="flex-grow">
                  <SpendRow
                    label="Онлайн"
                    value={prediction?.sum_online}
                    color="#1890ff"
                  />
                  <SpendRow
                    label="Путешествия"
                    value={prediction?.sum_travel}
                    color="#ffc53d"
                  />
                  <SpendRow
                    label="Рестораны"
                    value={prediction?.sum_rest}
                    color="#ff4d4f"
                  />
                  <SpendRow
                    label="Продукты"
                    value={prediction?.sum_groceries}
                    color="#73d13d"
                  />
                  <SpendRow
                    label="Топливо"
                    value={prediction?.sum_fuel}
                    color="#9254de"
                  />
                  <SpendRow
                    label="Украшения"
                    value={prediction?.sum_jewelry}
                    color="#13c2c2"
                  />
                  <SpendRow
                    label="Косметика"
                    value={prediction?.sum_cosmetics}
                    color="#f759ab"
                  />
                </div>
              </Card>

              {spendingPieData && (
                <div className="flex-grow flex items-center justify-center">
                  <div className="w-[95%] h-[320px] md:h-[360px]">
                    <Pie
                      data={spendingPieData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Modal
        title="Загрузить CSV файлы"
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={handleUpload}
        okText="Получить анализ"
        okButtonProps={{ disabled: false }}
        cancelText="Отмена"
      >
        <div className="mb-4">
          <div className="mb-1 font-medium">
            Файл транзакций (transactions CSV):
          </div>
          <Upload
            accept=".csv"
            beforeUpload={beforeUpload}
            maxCount={1}
            customRequest={async ({ file, onSuccess, onError }) => {
              try {
                const res = await TotalService.uploadCsv(file as File);
                if (res.data.status !== "success")
                  throw new Error("Ошибка загрузки transactions");
                console.log(
                  "Сохраняем transactions_path в localStorage:",
                  res.relative_path
                );
                localStorage.setItem(
                  "transactions_path",
                  res.data.relative_path
                );
                setTransactionsPath(res.data.relative_path);

                setTransactionsFile(file as File);
                message.success("Transactions файл загружен");
                onSuccess?.("ok");
              } catch (err) {
                message.error("Не удалось загрузить transactions файл");
                console.error(err);
                onError?.(err as Error);
              }
            }}
            fileList={
              transactionsFile
                ? [{ uid: "1", name: transactionsFile.name, status: "done" }]
                : []
            }
            onRemove={() => {
              setTransactionsFile(null);
              setTransactionsPath("");
              localStorage.removeItem("transactions_path");
            }}
            showUploadList={{ showRemoveIcon: true, showDownloadIcon: false }}
          >
            <Button>Select CSV файл</Button>
          </Upload>
          {transfersFile && (
            <div style={{ marginTop: 8, color: "#52c41a" }}>
              Загружен: <strong>{transfersFile.name}</strong>
              {transfersPath && (
                <>
                  <br />
                  <code>{transfersPath}</code>
                </>
              )}
            </div>
          )}
        </div>

        <div>
          <div className="mb-1 font-medium">
            Файл переводов (transfers CSV):
          </div>
          <Upload
            accept=".csv"
            beforeUpload={beforeUpload}
            maxCount={1}
            customRequest={async ({ file, onSuccess, onError }) => {
              try {
                const res = await TotalService.uploadCsv(file as File);
                if (res.data.status !== "success")
                  throw new Error("Ошибка загрузки transfers");
                localStorage.setItem("transfers_path", res.data.relative_path);
                setTransfersPath(res.data.relative_path);
                setTransfersFile(file as File);
                message.success("Transfers файл загружен");
                onSuccess?.("ok");
              } catch (err) {
                message.error("Не удалось загрузить transfers файл");
                console.error(err);
                onError?.(err as Error);
              }
            }}
            fileList={
              transfersFile
                ? [{ uid: "2", name: transfersFile.name, status: "done" }]
                : []
            }
            onRemove={() => {
              setTransfersFile(null);
              setTransfersPath("");
              localStorage.removeItem("transfers_path");
            }}
            showUploadList={{ showRemoveIcon: true, showDownloadIcon: false }}
          >
            <Button>Select CSV файл</Button>
          </Upload>
          {transfersFile && (
            <div style={{ marginTop: 8, color: "#52c41a" }}>
              Загружен: <strong>{transfersFile.name}</strong>
              {transfersPath && (
                <>
                  <br />
                  <code>{transfersPath}</code>
                </>
              )}
            </div>
          )}
        </div>
      </Modal>
    </Spin>
  );
}

const kpiColors = {
  inflow: "#52c41a",
  outflow: "#ff4d4f",
  txCount: "#faad14",
  txAmountSum: "#1890ff",
};

function Kpi({
  icon,
  label,
  value,
  format = "money",
}: {
  icon: React.ReactNode;
  label: string;
  value?: number;
  format?: "money" | "int";
}) {
  let color = "#1890ff";
  if (label.includes("Входящие")) color = kpiColors.inflow;
  else if (label.includes("Исходящие")) color = kpiColors.outflow;
  else if (label.includes("Транзакций")) color = kpiColors.txCount;
  else if (label.includes("Общий расход")) color = kpiColors.txAmountSum;

  const display =
    value != null
      ? format === "int"
        ? value.toLocaleString()
        : value.toLocaleString(undefined, { minimumFractionDigits: 2 })
      : "—";

  const isLongLabel = label.length > 20;

  return (
    <div className="flex items-center gap-3 rounded border p-2 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div
        className={`flex items-center justify-center rounded-md text-white transition-all duration-200`}
        style={{
          backgroundColor: color,
          height: isLongLabel ? 24 : 32,
          width: isLongLabel ? 24 : 32,
          minWidth: isLongLabel ? 24 : 32,
          minHeight: isLongLabel ? 24 : 32,
          fontSize: isLongLabel ? "0.875rem" : "1rem",
        }}
      >
        {icon}
      </div>
      <div className="leading-tight">
        <div className="text-xs text-gray-500">{label}</div>
        <div className="text-sm font-semibold">{display}</div>
      </div>
    </div>
  );
}

function SpendRow({
  label,
  value,
  color,
}: {
  label: string;
  value?: number;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between rounded bg-gray-50 px-3 py-2">
      <div className="flex items-center gap-2">
        <div
          className={`w-2.5 h-2.5 rounded-full`}
          style={{ backgroundColor: color }}
        />
        <span className="text-sm">{label}</span>
      </div>
      <span className="text-sm font-medium">
        {value != null
          ? value.toLocaleString(undefined, { minimumFractionDigits: 2 })
          : "—"}
      </span>
    </div>
  );
}
