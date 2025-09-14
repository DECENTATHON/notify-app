"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { TotalService } from "@/entities/Total/Total.module";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Spin } from "antd";

export default function DashboardPage() {
  const router = useRouter();

  const { data: schoolStats, isLoading } = useQuery({
    queryKey: ["schoolStatistics"],
    queryFn: () => TotalService.getSchoolStatistics(),
  });

  const schoolsRaw = schoolStats?.data?.schools || [];
  const totalCases = schoolStats?.data?.total_cases ?? 0;
  const totalSchools = schoolStats?.data?.total_schools ?? 0;

  const schools = schoolsRaw.map((school: any) => ({
    ...school,
    percentage: totalCases ? ((school.bullying_count / totalCases) * 100).toFixed(1) : 0,
  }));

  const handleBarClick = (data: any) => {
    if (data?.school_id) {
      router.push(`/main/${data.school_id}`);
    }
  };

  const CustomTick = (props: any) => {
    const { x, y, payload } = props;
    const handleClick = () => {
      const school = schools.find((s: any) => s.school_name === payload.value);
      if (school) {
        router.push(`/main/${school.school_id}`);
      }
    };

    return (
      <text
        x={x}
        y={y + 10}
        textAnchor="middle"
        fill="#1890ff"
        style={{ cursor: "pointer", userSelect: "none" }}
        onClick={handleClick}
      >
        {payload.value}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length > 0) {
      const data = payload[0].payload;
      return (
        <div className="p-2 bg-white border border-gray-200 rounded shadow text-sm">
          <p><b>{data.school_name}</b></p>
          <p>Случаев: {data.bullying_count}</p>
          <p>Доля: {data.percentage}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Статистика школ</h2>

      {(totalCases !== 0 || totalSchools !== 0) && (
        <div className="mb-6 p-4 bg-gray-50 rounded border">
          <p><b>Всего случаев:</b> {totalCases}</p>
          <p><b>Всего школ:</b> {totalSchools}</p>
        </div>
      )}

      {isLoading ? (
        <Spin />
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={schools}>
            <XAxis dataKey="school_name" tick={<CustomTick />} />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="bullying_count"
              fill="#1890ff"
              onClick={(data) => handleBarClick(data)}
            >
              {schools.map((entry: any, index: any) => (
                <Cell key={`cell-${index}`} cursor="pointer" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}