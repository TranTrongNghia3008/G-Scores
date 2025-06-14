import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { MdSubject } from "react-icons/md";
import { fetchScoreReport, fetchAnalyzeScoreReport } from "./services/scoreService";
import Card from "./ui/Card";
import { FiLoader } from "react-icons/fi";

const FIELD_LABELS = {
  toan: 'Toán',
  ngu_van: 'Ngữ văn',
  ngoai_ngu: 'Ngoại ngữ',
  vat_li: 'Vật lí',
  hoa_hoc: 'Hóa học',
  sinh_hoc: 'Sinh học',
  lich_su: 'Lịch sử',
  dia_li: 'Địa lí',
  gdcd: 'Giáo dục công dân',
};

const LEVEL_COLORS = {
  ">=8": "#4ade80",
  "6-8": "#60a5fa",
  "4-6": "#facc15",
  "<4": "#f87171",
};

const ScoreReportChart = () => {
  const [chartData, setChartData] = useState([]);
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchScoreReport();

        const transformed = Object.entries(res).map(([subject, levels]) => ({
          subject: FIELD_LABELS[subject] || subject,
          ...levels,
        }));

        setChartData(transformed);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
        setAnalyzing(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const analyzeData = async () => {
      if (chartData.length === 0) return;

      setAnalyzing(true);
      try {
        const html = await fetchAnalyzeScoreReport(chartData);
        setAnalysis(html.html);
      } catch (error) {
        console.error("Error analyzing data:", error);
        setAnalysis("Failed to generate analysis.");
      } finally {
        setAnalyzing(false);
      }
    };

    analyzeData();
  }, [chartData]);

  return (
    <Card title="Score Distribution by Subject" icon={<MdSubject />}>
      {loading ? (
        <div className="flex justify-center items-center h-80 text-gray-600">
          <FiLoader className="animate-spin text-2xl mr-2" />
          <span>Loading report...</span>
        </div>
      ) : (
        chartData.length > 0 ? (
          <>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <XAxis dataKey="subject" />
                <YAxis tickFormatter={(v) => `${(v / 1000)}k`} />
                <Tooltip formatter={(v) => v.toLocaleString()} />
                <Legend />
                {Object.keys(LEVEL_COLORS).map((level) => (
                  <Bar key={level} dataKey={level} stackId="a" fill={LEVEL_COLORS[level]} />
                ))}
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2">AI Analysis</h3>
              {analyzing ? (
                <div className="flex items-center text-gray-600">
                  <FiLoader className="animate-spin text-xl mr-2" />
                  <span>Generating analysis...</span>
                </div>
              ) : (
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: analysis }}
                />
              )}
            </div>
          </>
        ) : (
          <div className="text-gray-600">No data available for score report.</div>
        )
      )}
    </Card>
  );
};

export default ScoreReportChart;
