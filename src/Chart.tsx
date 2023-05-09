import React from "react";
import { Pie } from "@ant-design/plots";
import type { Data } from "./store";

interface ChartData {
  type: string;
  value: number;
}



const group = (data: Data[]) => {
    const groupList = (data || []).reduce((array: {[key: string]: any}, user) => {
        let key: string = user.address.city;
    if (!array[key]) {
      array[key] = [];
    }
    array[key].push(user);

    return array;
  }, []);

  return Object.entries(groupList);
};


export const Chart: React.FC<{ data: Data[] }> = ({ data }) => {
  const list = group(data);
  const chartData: ChartData[] = [];
  const total = data.length || 0;

  if (total === 0) return null;

  list.forEach((item) => {
    chartData.push({
      type: `${item[0]}(${item[1].length})`,
      value: Math.round((100 * item[1].length) / total),
    });
  });

  const config = {
    appendPadding: 10,
    data: chartData,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: function content(_ref: any) {
        return `${_ref.value}%`;
      },
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [{ type: "element-active" }],
  };
  return <Pie {...config} />;
};

export default Chart;
