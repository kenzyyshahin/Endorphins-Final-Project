import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { useState, useMemo } from "react";
import StatCard from "../components/StatCard";
import { mockCategories } from "../data/mockData";

const CHART_COLORS = ["#1f7a68", "#e58c5b", "#5c8fbd", "#d5ad47", "#7d8494"];

const months = [
  { value: "2026-05", label: "May 2026" },
  { value: "2026-06", label: "June 2026" },
  { value: "2026-07", label: "July 2026" },
  { value: "2026-08", label: "August 2026" },
  { value: "2026-09", label: "September 2026" },
];

const tooltipFormatter = (value) => `${Number(value).toLocaleString()} EGP`;

export default function Reports({ expenses, branches }) {
  const [selectedMonth, setSelectedMonth] = useState("2026-09");
  const [selectedBranch, setSelectedBranch] = useState("all");

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      if (!expense.date) return false;

      const expenseMonth = expense.date.slice(0, 7);
      const matchesMonth = expenseMonth === selectedMonth;

      const matchesBranch =
        selectedBranch === "all" ||
        Number(expense.branchId) === Number(selectedBranch);

      return matchesMonth && matchesBranch;
    });
  }, [expenses, selectedMonth, selectedBranch]);

  const selectedTotal = useMemo(() => {
    return filteredExpenses.reduce(
      (sum, expense) => sum + Number(expense.price) * Number(expense.quantity),
      0,
    );
  }, [filteredExpenses]);

  const categoryTotals = useMemo(() => {
    return mockCategories.map((category) => {
      const total = filteredExpenses
        .filter((expense) => expense.category === category)
        .reduce(
          (sum, expense) =>
            sum + Number(expense.price) * Number(expense.quantity),
          0,
        );

      return { category, total };
    });
  }, [filteredExpenses]);

  const highestCategory = useMemo(() => {
    if (categoryTotals.length === 0) {
      return {
        category: "None",
        total: 0,
      };
    }

    return categoryTotals.reduce(
      (highest, current) => (current.total > highest.total ? current : highest),
      categoryTotals[0],
    );
  }, [categoryTotals]);

  const branchTotals = useMemo(() => {
    return branches.map((branch) => {
      const total = filteredExpenses
        .filter((expense) => Number(expense.branchId) === Number(branch.id))
        .reduce(
          (sum, expense) =>
            sum + Number(expense.price) * Number(expense.quantity),
          0,
        );

      return {
        name: branch.name,
        branchId: branch.id,
        total,
      };
    });
  }, [filteredExpenses, branches]);

  const monthlyTotals = useMemo(() => {
    return months.map((month) => {
      const total = expenses
        .filter((expense) => {
          if (!expense.date) return false;
          return expense.date.slice(0, 7) === month.value;
        })
        .reduce(
          (sum, expense) =>
            sum + Number(expense.price) * Number(expense.quantity),
          0,
        );

      return {
        month: month.label.split(" ")[0],
        total,
      };
    });
  }, [expenses]);

  const formatCurrency = (value) => `${Number(value).toLocaleString()} EGP`;

  const pieData = categoryTotals.filter((item) => item.total > 0);

  return (
    <div className="reports-page">
      <div className="reports-header">
        <div>
          <h1>Reports</h1>
          <p>Analyze your expenses with detailed reports.</p>
        </div>

        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {months.map((month) => (
            <option value={month.value} key={month.value}>
              {month.label}
            </option>
          ))}
        </select>

        <select
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
        >
          <option value="all">All Branches</option>

          {branches.map((branch) => (
            <option value={branch.id} key={branch.id}>
              {branch.name}
            </option>
          ))}
        </select>
      </div>

      <div className="reports-stats">
        <StatCard
          title="Total Spending"
          value={formatCurrency(selectedTotal)}
          icon="💰"
        />

        <StatCard title="Categories" value={mockCategories.length} icon="📊" />

        <StatCard
          title="Top Category"
          value={highestCategory.category}
          icon="🏆"
        />
      </div>

      <div className="report-grid">
        <div className="report-card">
          <h2>Category Reports</h2>
          <p>Total Spending for each category</p>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryTotals}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="category"
                  tick={{ fontSize: 12, fill: "#64748B" }}
                />
                <YAxis tick={{ fontSize: 12, fill: "#64748B" }} />
                <Tooltip
                  formatter={tooltipFormatter}
                  contentStyle={{
                    borderRadius: "10px",
                    border: "1px solid #E2E8F0",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                />
                <Bar dataKey="total" name="Spending" radius={[6, 6, 0, 0]}>
                  {" "}
                  {categoryTotals.map((entry, index) => (
                    <Cell
                      key={`category-${index}`}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}{" "}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="report-card">
          <h2>Spending Distribution</h2>
          <p>Percentage of spending by category</p>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="total"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={95}
                  paddingAngle={2}
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`pie-${entry.category}`}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={tooltipFormatter} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="report-card monthly-trend">
        <h2>Monthly Trend</h2>
        <p>Total spending per month</p>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTotals}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748B" }} />
              <YAxis tick={{ fontSize: 12, fill: "#64748B" }} />
              <Tooltip
                formatter={tooltipFormatter}
                contentStyle={{
                  borderRadius: "10px",
                  border: "1px solid #E2E8F0",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
              />
              <Line
                type="monotone"
                dataKey="total"
                name="Spending"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={{ r: 5, fill: "#3B82F6" }}
                activeDot={{ r: 7, fill: "#2563EB" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
