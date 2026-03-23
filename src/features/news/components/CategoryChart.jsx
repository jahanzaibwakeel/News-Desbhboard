import { PieChart, Pie, Cell, Tooltip } from "recharts";

function CategoryChart({ articles }) {
  const counts = {};

  articles.forEach((a) => {
    const cat = a.source?.name || "Other";
    counts[cat] = (counts[cat] || 0) + 1;
  });

  const data = Object.keys(counts).map((key) => ({
    name: key,
    value: counts[key],
  }));

  return (
    <PieChart width={250} height={250}>
      <Pie data={data} dataKey="value" outerRadius={80} fill="#8884d8">
        {data.map((_, index) => (
          <Cell key={index} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
}

export default CategoryChart;